export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const q = String(req.query.q || '').toLowerCase();
  const limit = parseInt(String(req.query.limit || '10'), 10);

  if (!q) {
    return res.status(200).json([]);
  }

  const allNotes = [
    { path: '3gpp/38.211-physical-channels.md', name: '38.211-physical-channels.md', title: '3GPP TS 38.211 Physical Channels', category: '3gpp' },
    { path: '3gpp/38.331-rrc-protocol.md', name: '38.331-rrc-protocol.md', title: '3GPP TS 38.331 RRC Protocol', category: '3gpp' },
    { path: 'skills/SKILL - Analyze Drive Test.md', name: 'SKILL - Analyze Drive Test.md', title: 'Drive Test Log Analysis', category: 'skills' },
    { path: 'skills/SKILL - RCA Engine.md', name: 'SKILL - RCA Engine.md', title: 'Root Cause Analysis Engine', category: 'skills' },
    { path: 'vendor/ericsson-radio-system.md', name: 'ericsson-radio-system.md', title: 'Ericsson Radio System Playbook', category: 'vendor' },
  ];

  const filtered = allNotes
    .filter(n => n.name.toLowerCase().includes(q) || n.title.toLowerCase().includes(q) || n.path.toLowerCase().includes(q))
    .slice(0, limit);

  return res.status(200).json(filtered);
}
