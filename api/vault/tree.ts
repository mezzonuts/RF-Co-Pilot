export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const tree = [
    {
      name: '3GPP Standards',
      path: '3gpp',
      type: 'folder',
      children: [
        { name: '38.211-physical-channels.md', path: '3gpp/38.211-physical-channels.md', type: 'file', title: '3GPP TS 38.211 Physical Channels' },
        { name: '38.331-rrc-protocol.md', path: '3gpp/38.331-rrc-protocol.md', type: 'file', title: '3GPP TS 38.331 RRC Protocol' },
        { name: '36.331-lte-rrc.md', path: '3gpp/36.331-lte-rrc.md', type: 'file', title: '3GPP TS 36.331 E-UTRA RRC' }
      ]
    },
    {
      name: 'RF Optimization Skills',
      path: 'skills',
      type: 'folder',
      children: [
        { name: 'SKILL - Analyze Drive Test.md', path: 'skills/SKILL - Analyze Drive Test.md', type: 'file', title: 'Drive Test Log Analysis' },
        { name: 'SKILL - RCA Engine.md', path: 'skills/SKILL - RCA Engine.md', type: 'file', title: 'Root Cause Analysis Engine' },
        { name: 'SKILL - Generate PPTX Report.md', path: 'skills/SKILL - Generate PPTX Report.md', type: 'file', title: 'PPTX Export Generator' }
      ]
    },
    {
      name: 'Vendor Playbooks',
      path: 'vendor',
      type: 'folder',
      children: [
        { name: 'ericsson-radio-system.md', path: 'vendor/ericsson-radio-system.md', type: 'file', title: 'Ericsson Radio System Playbook' },
        { name: 'huawei-singleran.md', path: 'vendor/huawei-singleran.md', type: 'file', title: 'Huawei SingleRAN Optimization' }
      ]
    }
  ];

  return res.status(200).json({ tree });
}
