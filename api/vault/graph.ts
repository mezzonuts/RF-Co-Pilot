export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const nodes = [
    { id: '3gpp/38.211-physical-channels.md', label: '38.211 Physical Channels', type: '3gpp', color: '#38bdf8' },
    { id: '3gpp/38.331-rrc-protocol.md', label: '38.331 RRC Protocol', type: '3gpp', color: '#38bdf8' },
    { id: 'skills/SKILL - Analyze Drive Test.md', label: 'Analyze Drive Test', type: 'skills', color: '#a78bfa' },
    { id: 'skills/SKILL - RCA Engine.md', label: 'RCA Engine', type: 'skills', color: '#a78bfa' },
    { id: 'skills/SKILL - Generate PPTX Report.md', label: 'Generate PPTX Report', type: 'skills', color: '#a78bfa' },
    { id: 'vendor/ericsson-radio-system.md', label: 'Ericsson Radio System', type: 'vendor', color: '#fb923c' },
    { id: 'vendor/huawei-singleran.md', label: 'Huawei SingleRAN', type: 'vendor', color: '#fb923c' },
  ];

  const edges = [
    { source: '3gpp/38.211-physical-channels.md', target: 'skills/SKILL - Analyze Drive Test.md' },
    { source: '3gpp/38.331-rrc-protocol.md', target: 'skills/SKILL - RCA Engine.md' },
    { source: 'skills/SKILL - Analyze Drive Test.md', target: 'skills/SKILL - Generate PPTX Report.md' },
    { source: 'skills/SKILL - RCA Engine.md', target: 'skills/SKILL - Generate PPTX Report.md' },
    { source: 'vendor/ericsson-radio-system.md', target: 'skills/SKILL - RCA Engine.md' },
    { source: 'vendor/huawei-singleran.md', target: 'skills/SKILL - RCA Engine.md' },
  ];

  return res.status(200).json({ nodes, edges });
}
