function analyzeGoogleError(errData: any): {
  code: string | number;
  status: string;
  category: 'KEY_INVALID' | 'KEY_EXPIRED' | 'QUOTA_EXCEEDED' | 'PERMISSION_DENIED' | 'LOCATION_UNSUPPORTED' | 'OTHER';
  title: string;
  detail: string;
  suggestion: string;
} {
  const err = errData?.error || errData || {};
  let rawMsg = String(err?.message || errData?.message || 'Unknown error');
  if (rawMsg.includes('{"error"') || rawMsg.startsWith('{')) {
    try {
      const idx = rawMsg.indexOf('{');
      const parsed = JSON.parse(rawMsg.slice(idx));
      if (parsed?.error?.message) {
        rawMsg = parsed.error.message;
      } else if (parsed?.message) {
        rawMsg = parsed.message;
      }
    } catch {}
  }
  const rawStatus = String(err?.status || '');
  const rawCode = err?.code || 500;
  const reason = err?.details?.[0]?.reason || '';

  const msgLower = rawMsg.toLowerCase();
  const reasonLower = String(reason).toLowerCase();
  const statusLower = rawStatus.toLowerCase();

  if (
    reasonLower.includes('api_key_invalid') ||
    msgLower.includes('api key not valid') ||
    msgLower.includes('api_key_invalid') ||
    msgLower.includes('invalid api key')
  ) {
    return {
      code: rawCode || 400,
      status: 'API_KEY_INVALID',
      category: 'KEY_INVALID',
      title: 'API Key Tidak Valid',
      detail: rawMsg,
      suggestion: 'Kunci API yang dimasukkan salah atau tidak terdaftar. Periksa kembali string API Key dari Google AI Studio.'
    };
  }

  if (msgLower.includes('expired') || reasonLower.includes('expired')) {
    return {
      code: rawCode || 401,
      status: 'API_KEY_EXPIRED',
      category: 'KEY_EXPIRED',
      title: 'API Key Telah Kadaluarsa',
      detail: rawMsg,
      suggestion: 'Masa aktif API Key telah berakhir. Silakan buat API Key baru di Google AI Studio.'
    };
  }

  if (
    rawCode === 429 ||
    statusLower.includes('resource_exhausted') ||
    reasonLower.includes('quota') ||
    msgLower.includes('quota') ||
    msgLower.includes('exhausted') ||
    msgLower.includes('rate limit')
  ) {
    return {
      code: 429,
      status: 'RESOURCE_EXHAUSTED',
      category: 'QUOTA_EXCEEDED',
      title: 'Batas Kuota / Rate Limit',
      detail: 'Kuota model saat ini telah habis atau mencapai batas rate-limit.',
      suggestion: 'Sistem otomatis mencoba model alternatif, atau tunggu sejenak.'
    };
  }

  if (rawCode === 403 || statusLower.includes('permission_denied') || msgLower.includes('permission')) {
    return {
      code: 403,
      status: 'PERMISSION_DENIED',
      category: 'PERMISSION_DENIED',
      title: 'Izin Ditolak (Permission Denied)',
      detail: rawMsg,
      suggestion: 'API Key ini tidak memiliki izin akses ke Generative Language API.'
    };
  }

  return {
    code: rawCode,
    status: rawStatus || 'ERROR',
    category: 'OTHER',
    title: 'Galat Google AI Studio',
    detail: rawMsg,
    suggestion: 'Gagal mengambil daftar model dari Google AI Studio.'
  };
}

async function getBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try { return JSON.parse(req.body); } catch { return {}; }
    }
    if (typeof req.body === 'object') return req.body;
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: any) => { data += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(data)); } catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const body = await getBody(req);
  const apiKey = (
    body?.apiKey ||
    req.query?.apiKey ||
    req.headers?.['x-api-key'] ||
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    ''
  ).toString().trim();

  const defaultModels = [
    { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', description: 'Model cepat & cerdas generasi terbaru untuk analisis RF (Rekomendasi)' },
    { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', description: 'Model Flash generasi 3 untuk respons kilat' },
    { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', description: 'Model efisien ultra-ringan' },
    { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro Preview', description: 'Model penalaran mendalam untuk RCA & 3GPP' }
  ];

  if (!apiKey) {
    return res.status(200).json({
      ok: false,
      models: defaultModels,
      modelNames: defaultModels.map(m => m.id),
      message: 'Belum ada API Key; menampilkan daftar model rekomendasi default.'
    });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
    const data: any = await response.json();

    if (data.error) {
      const errInfo = analyzeGoogleError(data.error);
      return res.status(200).json({
        ok: false,
        error: `${errInfo.title}: ${errInfo.detail}`,
        errorInfo: errInfo,
        models: defaultModels,
        modelNames: defaultModels.map(m => m.id)
      });
    }

    const rawModels: any[] = Array.isArray(data.models) ? data.models : [];
    const filtered = rawModels
      .filter((m: any) => !m.supportedGenerationMethods || m.supportedGenerationMethods.includes('generateContent'))
      .map((m: any) => {
        const id = (m.name || '').replace(/^models\//, '');
        return {
          id,
          name: m.displayName || id,
          description: m.description || '',
          inputTokenLimit: m.inputTokenLimit,
          outputTokenLimit: m.outputTokenLimit,
          version: m.version || '',
        };
      });

    filtered.sort((a, b) => {
      const getScore = (id: string) => {
        if (id === 'gemini-3.8-flash') return 1;
        if (id === 'gemini-3.6-flash') return 2;
        if (id.includes('3.8-flash')) return 3;
        if (id.includes('3.6-flash')) return 4;
        if (id === 'gemini-3.1-flash-lite') return 5;
        if (id.includes('flash-lite')) return 6;
        if (id === 'gemini-3.1-pro-preview') return 7;
        if (id.includes('flash')) return 10;
        if (id.includes('pro')) return 20;
        return 50;
      };
      return getScore(a.id) - getScore(b.id);
    });

    return res.status(200).json({
      ok: true,
      total: filtered.length,
      models: filtered.length > 0 ? filtered : defaultModels,
      modelNames: filtered.length > 0 ? filtered.map(m => m.id) : defaultModels.map(m => m.id),
    });
  } catch (err: any) {
    const errInfo = analyzeGoogleError({ message: err?.message || String(err) });
    return res.status(200).json({
      ok: false,
      error: `Koneksi Google API gagal: ${errInfo.detail}`,
      errorInfo: errInfo,
      models: defaultModels,
      modelNames: defaultModels.map(m => m.id)
    });
  }
}
