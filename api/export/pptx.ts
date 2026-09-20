import pptxgen from 'pptxgenjs';

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const body = await getBody(req);
    const { fileName } = body || {};
    const PptClass: any = (pptxgen as any).default || pptxgen;
    const ppt = new PptClass();
    ppt.layout = 'LAYOUT_WIDE';

    const titleStr = fileName ? `Optimization Report: ${fileName}` : 'Cluster C1 — Executive Summary';

    // Slide 1: Title
    const slide1 = ppt.addSlide();
    slide1.background = { color: '0A0E1A' };
    slide1.addText('TelecomAgent RF Co-Pilot', {
      x: 1.0, y: 1.8, w: 11.3, h: 0.8,
      fontSize: 32, bold: true, color: 'FFFFFF', fontFace: 'Arial'
    });
    slide1.addText(titleStr, {
      x: 1.0, y: 2.8, w: 11.3, h: 0.6,
      fontSize: 18, color: '38BDF8', fontFace: 'Arial'
    });

    // Slide 2: KPI & Worst Spot Summary
    const slide2 = ppt.addSlide();
    slide2.background = { color: '0A0E1A' };
    slide2.addText('Executive Summary & Worst Spot RCA', {
      x: 0.8, y: 0.5, w: 11.5, h: 0.5,
      fontSize: 20, bold: true, color: 'FFFFFF'
    });

    const rows = [
      ['#', 'Worst Spot', 'RSRP', 'SINR', 'Issue & RCA', 'Recommendation'],
      ['1', 'JKT_1023_2', '-108 dBm', '2.1 dB', 'Overshooting & overlap', 'downtilt 3° -> 5°'],
      ['2', 'JKT_1018_1', '-102 dBm', '3.4 dB', 'PCI collision', 'PCI 148 -> 312'],
      ['3', 'JKT_1015_1', '-99 dBm', '4.0 dB', 'Missing neighbor relation', 'Add nbr -> 1022_2']
    ];

    slide2.addTable(rows, {
      x: 0.8, y: 1.3, w: 11.5,
      colW: [0.6, 2.0, 1.4, 1.4, 3.2, 2.9],
      fill: { color: '1E293B' },
      color: 'FFFFFF',
      fontSize: 11,
      border: { pt: 1, color: '334155' }
    });

    const outName = (fileName ? fileName.replace(/\.[^/.]+$/, '') : 'Cluster_C1') + '_Optimization_Report.pptx';
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${outName}"`);

    const stream = await ppt.stream();
    if (stream instanceof Buffer) {
      res.send(stream);
    } else {
      const buffer = Buffer.from(await ppt.write({ outputType: 'nodebuffer' }) as any);
      res.send(buffer);
    }
  } catch (err: any) {
    res.status(200).json({ ok: false, error: 'PPTX export error: ' + (err?.message || err) });
  }
}
