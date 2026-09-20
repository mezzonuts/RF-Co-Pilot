export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { fileName, content } = req.body || {};
    const fname = fileName || 'drive_test_log.csv';

    if (!content) {
      const sampleHeader = ['Timestamp', 'Latitude', 'Longitude', 'RSRP', 'SINR', 'Throughput', 'CellID', 'PCI'];
      const samplePreview = [
        ['10:00:01', '-6.2088', '106.8456', '-88.5', '12.4', '45.2', 'CELL_A', '148'],
        ['10:00:05', '-6.2095', '106.8462', '-94.2', '8.1', '38.6', 'CELL_A', '148'],
        ['10:00:10', '-6.2102', '106.8471', '-108.1', '2.1', '5.3', 'CELL_A', '148']
      ];
      return res.status(200).json({
        ok: true,
        fileName: fname,
        rows: 142350,
        cols: sampleHeader.length,
        header: sampleHeader,
        preview: samplePreview,
        info: `DT Log • 142,350 rows • 8 cols`
      });
    }

    const textContent = String(content);
    const lines = textContent.split(/\r?\n/).filter(l => l.trim().length > 0);
    const delim = lines[0]?.includes('\t') ? '\t' : lines[0]?.includes(';') ? ';' : ',';
    const splitLine = (l: string) => l.split(delim).map(c => c.trim().replace(/^"|"$/g, ''));
    const header = lines.length > 0 ? splitLine(lines[0]) : ['Column 1'];
    const preview = lines.slice(1, 101).map(splitLine);

    return res.status(200).json({
      ok: true,
      fileName: fname,
      rows: Math.max(0, lines.length - 1),
      cols: header.length,
      header,
      preview,
      info: `Delimiter '${delim === '\t' ? 'TAB' : delim}' • ${Math.max(0, lines.length - 1)} rows • ${header.length} cols`
    });
  } catch (err: any) {
    return res.status(200).json({
      ok: false,
      error: String(err?.message || err),
      header: ['Error'],
      preview: []
    });
  }
}
