export default async function handler(req: any, res: any) {
  const apiKey = (
    (req.body && req.body.apiKey) ||
    req.query.apiKey ||
    req.headers?.['x-api-key'] ||
    process.env.GEMINI_API_KEY ||
    ''
  ).toString().trim();

  if (!apiKey) {
    return res.status(400).json({
      ok: false,
      error: 'API key required. Masukkan Gemini API Key di menu LLM Configuration atau simpan di environment.'
    });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data: any = await response.json();

    if (data.error) {
      return res.status(response.status || 400).json({
        ok: false,
        error: data.error.message || 'Gagal memverifikasi API Key ke Google AI Studio',
        detail: data.error
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
        if (id.includes('3.1-pro')) return 6;
        if (id.includes('flash-latest')) return 7;
        if (id.includes('flash')) return 10;
        if (id.includes('pro')) return 20;
        return 50;
      };
      return getScore(a.id) - getScore(b.id);
    });

    return res.status(200).json({
      ok: true,
      total: filtered.length,
      models: filtered,
      modelNames: filtered.map(m => m.id),
      raw: data.models
    });
  } catch (e: any) {
    return res.status(500).json({
      ok: false,
      error: 'Failed to connect to Google Generative Language API: ' + (e?.message || String(e))
    });
  }
}
