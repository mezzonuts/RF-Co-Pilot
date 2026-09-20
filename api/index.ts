export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';

  if (url.includes('/health')) {
    return res.status(200).json({ status: 'ok', serverless: true, time: new Date().toISOString() });
  }

  return res.status(200).json({
    ok: true,
    service: 'TelecomAgent RF Co-Pilot API Gateway',
    status: 'online',
    version: '0.4.2',
    timestamp: new Date().toISOString()
  });
}
