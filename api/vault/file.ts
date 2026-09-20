export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const filePath = String(req.query.path || '');
  const cleanName = filePath.split('/').pop() || 'Document.md';
  const title = cleanName.replace(/\.md$/i, '');

  const sampleBody = `# ${title}\n\nDokumen referensi RF Knowledge Vault untuk optimasi jaringan 4G/5G, parameter radio, dan analisis log Drive Test.`;

  return res.status(200).json({
    path: filePath,
    name: cleanName,
    title,
    frontmatter: { type: 'vault-doc' },
    body: sampleBody
  });
}
