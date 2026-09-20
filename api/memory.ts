const memoryStore: any = {
  projects: [],
  userMemory: null
};

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json(memoryStore);
  }

  if (req.method === 'POST') {
    const { action, project, userMemory } = req.body || {};
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
