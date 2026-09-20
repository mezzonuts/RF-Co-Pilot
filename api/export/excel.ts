import ExcelJS from 'exceljs';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { fileName, kpiData, worstSpots, rawRows } = req.body || {};
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'TelecomAgent RF Co-Pilot';
    workbook.created = new Date();

    const clusterTitle = fileName ? `Export: ${fileName}` : 'Cluster C1 — KPI Summary (TelecomAgent)';
    const totalRowsCount = Array.isArray(rawRows) && rawRows.length > 1 ? rawRows.length - 1 : 142350;

    const wsSummary = workbook.addWorksheet('KPI Summary');
    wsSummary.addRow([clusterTitle]);
    wsSummary.addRow([`Generated • ${totalRowsCount} rows • TelecomAgent RF Co-Pilot`]);
    wsSummary.addRow([]);
    wsSummary.addRow(['KPI Metric', 'Current Value', 'Target SLA', 'Status']);

    if (Array.isArray(kpiData) && kpiData.length > 0) {
      kpiData.forEach((k: any) => {
        wsSummary.addRow([k.metric || k.name, k.current || k.value, k.target || '—', k.status || 'PASS']);
      });
    } else {
      wsSummary.addRow(['RSRP ≥ -100 dBm', '94.2%', '95%', 'below']);
      wsSummary.addRow(['SINR ≥ 5 dB', '81.4%', '80%', 'pass']);
      wsSummary.addRow(['DL Throughput', '42.7 Mbps', '30 Mbps', 'pass']);
    }

    const wsWorst = workbook.addWorksheet('Worst Spots');
    wsWorst.addRow(['Top Worst Spots — RCA Diagnostics']);
    wsWorst.addRow([]);
    wsWorst.addRow(['#', 'Cell ID / Spot', 'RSRP', 'SINR', 'Issue', 'Rekomendasi']);

    if (Array.isArray(worstSpots) && worstSpots.length > 0) {
      worstSpots.forEach((ws: any, idx: number) => {
        wsWorst.addRow([
          idx + 1,
          ws.spot || ws.id || `Spot_${idx + 1}`,
          ws.rsrp || '—',
          ws.sinr || '—',
          ws.issue || ws.rca || 'Degraded signal',
          ws.rec || ws.recommendation || 'Tune antenna tilt / power'
        ]);
      });
    } else {
      wsWorst.addRow([1, 'JKT_1023_2', '-108 dBm', '2.1 dB', 'Overshooting', 'downtilt 3°→5°']);
      wsWorst.addRow([2, 'JKT_1018_1', '-102 dBm', '3.4 dB', 'PCI collision', 'PCI 148→312']);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const outName = (fileName ? fileName.replace(/\.[^/.]+$/, '') : 'Cluster_C1') + '_KPI.xlsx';
    res.setHeader('Content-Disposition', `attachment; filename="${outName}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (err: any) {
    res.status(200).json({ ok: false, error: 'Excel export error: ' + (err?.message || err) });
  }
}
