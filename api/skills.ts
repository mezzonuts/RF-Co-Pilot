export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const defaultSkills = [
    {
      id: 'dt',
      name: 'Analyze Drive Test',
      description: 'Analisis Drive Test Log (Nemo/TEMS/CSV), KPI RSRP/SINR, dan deteksi worst spot',
      category: 'telecom',
      enabled: true,
      tags: ['drivetest', 'rsrp', 'sinr', 'kpi'],
      icon: 'ri-signal-cellular-3-line',
      color: '#7c3aed',
    },
    {
      id: 'oss',
      name: 'OSS KPI Weekly',
      description: 'Audit KPI jaringan seluler mingguan, accessibility, retainability, dan traffic',
      category: 'telecom',
      enabled: true,
      tags: ['oss', 'kpi', 'audit'],
      icon: 'ri-line-chart-line',
      color: '#2563eb',
    },
    {
      id: 'rca',
      name: 'RCA Engine',
      description: 'Root Cause Analysis untuk drop call, handover failure, dan pilot pollution',
      category: 'optimization',
      enabled: true,
      tags: ['rca', 'handover', 'interference'],
      icon: 'ri-pulse-line',
      color: '#059669',
    },
    {
      id: 'pptx',
      name: 'Generate PPTX Report',
      description: 'Pembuatan slide presentasi otomatis untuk laporan optimasi dan benchmark',
      category: 'reporting',
      enabled: true,
      tags: ['pptx', 'report', 'presentation'],
      icon: 'ri-file-ppt-2-line',
      color: '#d97706',
    },
    {
      id: 'pandas',
      name: 'Pandas Data Analysis',
      description: 'Python Pandas workflow untuk kalkulasi data mentah tabular telekomunikasi',
      category: 'data-analysis',
      enabled: true,
      tags: ['pandas', 'python', 'dataframe'],
      icon: 'ri-table-line',
      color: '#db2777',
    }
  ];

  return res.status(200).json({
    total: defaultSkills.length,
    enabled: defaultSkills.filter(s => s.enabled).length,
    catalog: defaultSkills
  });
}
