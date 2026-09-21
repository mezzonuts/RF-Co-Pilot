function analyzeGoogleError(errData: any, statusText?: string): {
  code: string | number;
  status: string;
  category: 'KEY_INVALID' | 'KEY_EXPIRED' | 'QUOTA_EXCEEDED' | 'PERMISSION_DENIED' | 'LOCATION_UNSUPPORTED' | 'MODEL_NOT_FOUND' | 'OTHER';
  title: string;
  detail: string;
  suggestion: string;
} {
  const err = errData?.error || errData || {};
  let rawMsg = String(err?.message || errData?.message || statusText || 'Unknown error');
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
      title: '🔑 API Key Google AI Studio Tidak Valid',
      detail: rawMsg,
      suggestion: 'Kunci API yang dimasukkan salah atau ada karakter yang terpotong. Pastikan Anda menyalin seluruh string API Key dari Google AI Studio (biasanya diawali "AIzaSy...").'
    };
  }

  if (msgLower.includes('expired') || reasonLower.includes('expired')) {
    return {
      code: rawCode || 401,
      status: 'API_KEY_EXPIRED',
      category: 'KEY_EXPIRED',
      title: '⏳ API Key Google AI Studio Telah Kadaluarsa',
      detail: rawMsg,
      suggestion: 'Masa aktif API Key ini telah berakhir. Silakan buat API Key baru di https://aistudio.google.com/app/apikey dan simpan di menu LLM Configuration.'
    };
  }

  if (
    rawCode === 429 ||
    statusLower.includes('resource_exhausted') ||
    reasonLower.includes('quota') ||
    reasonLower.includes('rate_limit') ||
    msgLower.includes('quota') ||
    msgLower.includes('exhausted') ||
    msgLower.includes('rate limit')
  ) {
    return {
      code: 429,
      status: 'RESOURCE_EXHAUSTED',
      category: 'QUOTA_EXCEEDED',
      title: '⚠️ Batas Kuota / Rate Limit Tercapai',
      detail: 'Kuota model saat ini telah habis atau mencapai batas per menit (RPM).',
      suggestion: 'Sistem mencoba beralih ke model free alternatif (Flash/Lite), atau tunggu 1–2 menit.'
    };
  }

  if (
    rawCode === 403 ||
    statusLower.includes('permission_denied') ||
    msgLower.includes('permission') ||
    msgLower.includes('generativelanguage.googleapis.com is not enabled')
  ) {
    return {
      code: 403,
      status: 'PERMISSION_DENIED',
      category: 'PERMISSION_DENIED',
      title: '🚫 Izin Ditolak (Permission Denied)',
      detail: rawMsg,
      suggestion: 'API Key ini tidak memiliki izin akses ke Generative Language API atau project Google Cloud belum mengaktifkan layanan ini.'
    };
  }

  if (msgLower.includes('location') || msgLower.includes('region') || msgLower.includes('country')) {
    return {
      code: 403,
      status: 'USER_LOCATION_NOT_SUPPORTED',
      category: 'LOCATION_UNSUPPORTED',
      title: '🌍 Wilayah / Region Belum Didukung',
      detail: rawMsg,
      suggestion: 'Layanan Google Gemini API belum tersedia untuk lokasi/region IP server ini.'
    };
  }

  if (rawCode === 404 || msgLower.includes('not found') || statusLower.includes('not_found')) {
    return {
      code: 404,
      status: 'MODEL_NOT_FOUND',
      category: 'MODEL_NOT_FOUND',
      title: '🔍 Model Tidak Ditemukan',
      detail: rawMsg,
      suggestion: 'Nama model yang dipilih tidak tersedia untuk API Key Anda. Gunakan fitur "Auto-Detect Models" di panel LLM Configuration untuk melihat model yang aktif.'
    };
  }

  return {
    code: rawCode,
    status: rawStatus || 'GOOGLE_API_ERROR',
    category: 'OTHER',
    title: '⚠️ Galat Google Generative AI',
    detail: rawMsg,
    suggestion: 'Terjadi kendala saat menghubungi Google Generative Language API. Periksa koneksi internet atau coba lagi nanti.'
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
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const startTime = Date.now();

  try {
    const body = await getBody(req);
    const {
      messages = [],
      provider = 'google',
      model = 'gemini-3.8-flash',
      apiKey,
      baseUrl,
      temperature = 0.3,
      max_tokens = 2048,
    } = body;

    const lastUserMsg = Array.isArray(messages)
      ? ([...messages].reverse().find((m: any) => m.role === 'user')?.content || '')
      : '';

    let providerLower = String(provider || 'google').toLowerCase();
    const cleanBaseUrl = String(baseUrl || '').trim();

    if (cleanBaseUrl) {
      if (cleanBaseUrl.includes('20128') || cleanBaseUrl.includes('9router')) providerLower = '9router';
      else if (cleanBaseUrl.includes('openrouter')) providerLower = 'openrouter';
      else if (cleanBaseUrl.includes('generativelanguage')) providerLower = 'google';
      else if (cleanBaseUrl.includes('api.openai')) providerLower = 'openai';
    }

    const isGoogle = providerLower === 'google' || providerLower === 'gemini';
    const effectiveApiKey = (
      apiKey ||
      req.headers?.['x-api-key'] ||
      (isGoogle ? (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY) : process.env[`${providerLower.toUpperCase().replace('-', '_')}_API_KEY`]) ||
      ''
    ).toString().trim();

    let targetModel = (model || (isGoogle ? 'gemini-3.8-flash' : 'gpt-4o-mini')).replace(/^models\//, '');
    if (isGoogle) {
      if (!targetModel || targetModel === 'my-combo' || targetModel === 'gemini-2.5-flash' || targetModel === 'gemini-1.5-flash' || targetModel === 'gemini-2.0-flash') {
        targetModel = 'gemini-3.8-flash';
      } else if (targetModel === 'gemini-2.5-flash-lite') {
        targetModel = 'gemini-3.1-flash-lite';
      } else if (targetModel === 'gemini-2.5-pro' || targetModel === 'gemini-1.5-pro') {
        targetModel = 'gemini-3.1-pro-preview';
      }
    }

    const systemMsg = Array.isArray(messages) ? (messages.find((m: any) => m.role === 'system')?.content || '') : '';
    const defaultSys = 'You are TelecomAgent — senior RF engineer expert in 4G LTE & 5G NR (3GPP Rel-15/16/17, Ericsson, Huawei). Selalu jawab dalam Bahasa Indonesia yang profesional, ramah, dan teknis.';
    const systemInstructionText = (systemMsg ? `${defaultSys}\n\n${systemMsg}` : defaultSys);

    let googleErrorInfo: ReturnType<typeof analyzeGoogleError> | null = null;

    // 1. If Google Gemini with effective API Key
    if (isGoogle && effectiveApiKey) {
      const candidateModels = [
        targetModel,
        'gemini-3.8-flash',
        'gemini-3.6-flash',
        'gemini-3.1-flash-lite',
        'gemini-3.5-flash-lite',
        'gemini-3.1-pro-preview'
      ];
      const uniqueCandidates = Array.from(new Set(candidateModels.filter(Boolean)));

      for (const candModel of uniqueCandidates) {
        const cleanModelName = candModel.replace(/^models\//, '');
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModelName}:generateContent?key=${encodeURIComponent(effectiveApiKey)}`;

        const formattedContents = Array.isArray(messages)
          ? messages
              .filter((m: any) => m.role === 'user' || m.role === 'assistant')
              .slice(-10)
              .map((m: any) => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: String(m.content || '') }]
              }))
          : [];

        if (formattedContents.length === 0) {
          formattedContents.push({ role: 'user', parts: [{ text: String(lastUserMsg || 'Halo') }] });
        }

        const geminiPayload: any = {
          contents: formattedContents,
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          },
          generationConfig: {
            temperature: Number(temperature) || 0.3,
            maxOutputTokens: Number(max_tokens) || 2048,
          }
        };

        try {
          const resp = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiPayload),
          });

          const data: any = await resp.json().catch(() => ({}));

          if (resp.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            const replyText = data.candidates[0].content.parts[0].text;
            const latencyMs = Date.now() - startTime;
            const wasSwitched = cleanModelName !== targetModel.replace(/^models\//, '');
            return res.status(200).json({
              ok: true,
              choices: [{ message: { role: 'assistant', content: replyText } }],
              meta: {
                provider: wasSwitched ? `Google AI Studio (Auto-switch: ${cleanModelName})` : 'Google AI Studio',
                providerId: 'google',
                model: cleanModelName,
                modelVersion: cleanModelName,
                isLive: true,
                autoSwitched: wasSwitched,
                latencyMs,
                status: 'connected',
              }
            });
          } else if (data?.error) {
            googleErrorInfo = analyzeGoogleError(data.error, resp.statusText);
            console.warn(`[api/chat] Gemini error on ${cleanModelName}:`, data.error);
            // If the key is invalid or permission denied, trying other models won't help:
            if (googleErrorInfo.category === 'KEY_INVALID' || googleErrorInfo.category === 'KEY_EXPIRED' || googleErrorInfo.category === 'PERMISSION_DENIED') {
              break;
            }
            // If quota reached, loop will automatically try the next candidate model
          }
        } catch (fetchErr: any) {
          googleErrorInfo = analyzeGoogleError({ message: fetchErr?.message || String(fetchErr) });
          console.warn(`[api/chat] Gemini fetch exception for ${cleanModelName}:`, fetchErr);
        }
      }
    }

    // 2. If OpenAI / OpenRouter / Custom provider with baseUrl
    if (!isGoogle && cleanBaseUrl) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(effectiveApiKey ? { Authorization: `Bearer ${effectiveApiKey}` } : {})
        };

        const chatPayload = {
          model: targetModel,
          stream: false,
          temperature: Number(temperature) || 0.3,
          max_tokens: Number(max_tokens) || 2048,
          messages: [
            { role: 'system', content: systemInstructionText },
            ...(Array.isArray(messages) ? messages.filter((m: any) => m.role === 'user' || m.role === 'assistant').slice(-10) : [])
          ]
        };

        const resp = await fetch(`${cleanBaseUrl.replace(/\/+$/, '')}/chat/completions`, {
          method: 'POST',
          headers,
          body: JSON.stringify(chatPayload),
        });

        const data: any = await resp.json().catch(() => ({}));
        const content = data?.choices?.[0]?.message?.content;

        if (resp.ok && content) {
          const latencyMs = Date.now() - startTime;
          return res.status(200).json({
            ok: true,
            choices: [{ message: { role: 'assistant', content } }],
            meta: {
              provider: providerLower,
              providerId: providerLower,
              model: targetModel,
              modelVersion: targetModel,
              isLive: true,
              latencyMs,
              status: 'connected',
            }
          });
        }
      } catch (err: any) {
        console.warn(`[api/chat] Provider ${providerLower} failed:`, err?.message || err);
      }
    }

    // 3. If Google Gemini API Key was supplied by user, but returned a specific error (Invalid Key, Quota Exceeded, etc.)
    if (isGoogle && effectiveApiKey && googleErrorInfo) {
      const latencyMs = Date.now() - startTime;
      const formattedExplanation = `### ${googleErrorInfo.title}

**Pesan dari Google AI Studio:**
> \`${googleErrorInfo.detail}\`

**Solusi & Rekomendasi:**
- ${googleErrorInfo.suggestion}
- Buka panel **LLM Configuration** di pojok kanan atas untuk memeriksa kembali API Key Anda.`;

      return res.status(200).json({
        ok: false,
        error: `${googleErrorInfo.title}: ${googleErrorInfo.detail}`,
        errorInfo: googleErrorInfo,
        choices: [{
          message: {
            role: 'assistant',
            content: formattedExplanation
          }
        }],
        meta: {
          provider: 'Google AI Studio',
          providerId: 'google',
          model: targetModel,
          isLive: false,
          status: 'error',
          errorCategory: googleErrorInfo.category,
          errorCode: googleErrorInfo.code,
          error: googleErrorInfo.detail,
          latencyMs
        }
      });
    }

    // 4. Smart Domain RF Fallback Engine (Guaranteed 200 response, never crashes)
    const latencyMs = Date.now() - startTime;
    const isGreeting = /^(halo|hai|hello|hi|hey|test|ping|say hello)\b/i.test((lastUserMsg || '').trim());
    const isModelQuery = /model|provider|status/i.test(lastUserMsg || '');

    let fallbackReply = '';
    if (isGreeting || isModelQuery) {
      fallbackReply = `Halo! 👋 Saya TelecomAgent RF Co-Pilot — siap membantu analisis dan optimasi jaringan 4G LTE & 5G NR.

Status Konfigurasi:
- Provider: ${isGoogle ? 'Google AI Studio (Gemini)' : providerLower}
- Model: ${targetModel}
- Status Engine: Standby (Active)

Keunggulan Sistem:
1. Pemahaman Parameter 3GPP (RSRP, RSRQ, SINR, CQI, BLER, PCI Modulo 3).
2. Analisis Drive Test log (Nemo/TEMS/CSV) dan deteksi worst spot coverage/quality.
3. Rekomendasi optimasi RF terarah (antenna tilt, azimuth, neighbor relation, power adjustment).

Silakan upload file log Drive Test atau ketik pertanyaan teknis untuk mulai.`;
    } else {
      fallbackReply = `TelecomAgent RF Co-Pilot siap membantu analisis RF:

Pertanyaan Anda: "${(lastUserMsg || 'Analisis RF').slice(0, 80)}"

Rekomendasi Diagnosa RF:
1. RSRP (Coverage): Target ideal > -95 dBm. Jika < -105 dBm tergolong poor coverage hole.
2. SINR (Kualitas/Interferensi): Target ideal > 5 dB. Jika < 0 dB, periksa PCI collision/confusion (cek Modulo 3) dan overshoot cell tetangga.
3. Antenna Tuning: Periksa mechanical/electrical downtilt untuk menahan interferensi pilot pollution.

Untuk analisis mendalam real-time dengan model live, pastikan Gemini API Key telah dimasukkan di panel konfigurasi LLM.`;
    }

    return res.status(200).json({
      ok: true,
      choices: [{ message: { role: 'assistant', content: fallbackReply } }],
      meta: {
        provider: 'TelecomAgent RF Engine (Domain Standby)',
        providerId: 'fallback',
        model: targetModel,
        modelVersion: 'v0.4.2-standby',
        isLive: false,
        latencyMs,
        status: 'fallback',
        reason: effectiveApiKey ? 'Model fallback aktif' : 'Kunci API belum diatur; menggunakan mesin domain bawaan.',
      }
    });

  } catch (err: any) {
    console.error('[api/chat] Top level handler catch:', err);
    return res.status(200).json({
      ok: true,
      choices: [{
        message: {
          role: 'assistant',
          content: 'Halo! TelecomAgent RF Co-Pilot aktif. Sistem siap menerima pertanyaan RF 4G/5G atau file log Drive Test.'
        }
      }],
      meta: {
        provider: 'TelecomAgent Fallback',
        providerId: 'fallback',
        model: 'telecom-rf-standby',
        isLive: false,
        latencyMs: 10,
        status: 'fallback',
        error: String(err?.message || err)
      }
    });
  }
}
