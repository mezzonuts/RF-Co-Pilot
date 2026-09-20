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
    ''
  ).toString().trim();

  const defaultModels = [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Model cepat & cerdas untuk analisis RF' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Model penalaran mendalam untuk RCA' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Model cepat serbaguna' }
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
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data: any = await response.json();

    if (data.error) {
      return res.status(200).json({
        ok: false,
        error: data.error.message || 'Gagal memverifikasi API Key ke Google AI Studio',
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
        if (id === 'gemini-2.5-flash') return 1;
        if (id.includes('2.5-flash')) return 2;
        if (id.includes('3.8-flash')) return 3;
        if (id === 'gemini-2.5-pro') return 4;
        if (id.includes('2.5-pro')) return 5;
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
    return res.status(200).json({
      ok: false,
      error: 'Koneksi ke Google Generative Language API gagal: ' + (err?.message || err),
      models: defaultModels,
      modelNames: defaultModels.map(m => m.id)
    });
  }
}
