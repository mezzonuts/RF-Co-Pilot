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

const memoryStore: any = {
  projects: [],
  userMemory: null
};

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json(memoryStore);
  }

  if (req.method === 'POST') {
    const body = await getBody(req);
    const { action, project, userMemory } = body || {};
    if (action === 'archive' && project) {
      memoryStore.projects.unshift(project);
      if (userMemory) memoryStore.userMemory = userMemory;
      return res.status(200).json({ ok: true, projects: memoryStore.projects });
    }
    if (action === 'update_user' && userMemory) {
      memoryStore.userMemory = userMemory;
      return res.status(200).json({ ok: true });
    }
    if (action === 'clear') {
      memoryStore.projects = [];
      memoryStore.userMemory = null;
      return res.status(200).json({ ok: true });
    }
    return res.status(200).json({ ok: true, memory: memoryStore });
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
