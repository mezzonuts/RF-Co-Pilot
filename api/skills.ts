export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const defaultSkills = [
    {
      id: 'analyze-dt',
      name: 'Analyze Drive Test',
      description: 'Parse CSV/TXT DT logs, hitung KPI (RSRP/SINR/Throughput), detect 5 worst spots, generate Excel report.',
      category: 'drive-test',
      enabled: true,
      tags: ['drive-test', 'kpi', 'excel', 'autopilot'],
      icon: 'ri-route-line',
      color: 'violet',
    },
    {
      id: 'gen-pptx',
      name: 'Generate PPTX Report',
      description: 'Convert KPI Excel → 5-slide executive deck (cover, summary, coverage map, worst spots, recommendations).',
      category: 'reporting',
      enabled: true,
      tags: ['reporting', 'pptx'],
      icon: 'ri-slideshow-line',
      color: 'orange',
    },
    {
      id: 'oss-kpi',
      name: 'OSS KPI Weekly Report',
      description: 'Aggregate Ericsson/Huawei/Nokia counters, trending per cell, flag degradation >5%.',
      category: 'kpi',
      enabled: true,
      tags: ['oss', 'kpi', 'trending'],
      icon: 'ri-bar-chart-box-line',
      color: 'sky',
    },
    {
      id: 'rca',
      name: 'RCA Engine',
      description: 'Rule-based + RAG diagnostics: overshooting, PCI collision, missing neighbor → actionable fix.',
      category: 'rca',
      enabled: true,
      tags: ['rca', 'postgis'],
      icon: 'ri-bug-line',
      color: 'amber',
    },
    {
      id: 'coverage',
      name: 'Coverage Map',
      description: 'Generate RSRP/SINR heatmap PNG via Folium + GeoJSON — overlay cell azimuth & tilt.',
      category: 'optimization',
      enabled: false,
      tags: ['folium', 'optimization'],
      icon: 'ri-map-2-line',
      color: 'zinc',
    },
    {
      id: 'tilt',
      name: 'Tilt Optimizer',
      description: 'Slope-based electronic tilt suggestion per cell — minimize overshooting, maximize overlap control.',
      category: 'optimization',
      enabled: false,
      tags: ['optimization', 'tilt'],
      icon: 'ri-compass-3-line',
      color: 'zinc',
    }
  ];

  return res.status(200).json({
    ok: true,
    total: defaultSkills.length,
    enabled: defaultSkills.filter(s => s.enabled).length,
    catalog: defaultSkills
  });
}
