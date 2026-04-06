import fs from 'node:fs';

const files = [
  'vite.config.ts',
  'package-lock.json',
  'src/apps/WeChatApp.tsx',
];

function resolveContent(raw) {
  // Keep "theirs" section (between ======= and >>>>>>>)
  let out = '';
  let i = 0;
  while (i < raw.length) {
    const start = raw.indexOf('<<<<<<<', i);
    if (start === -1) {
      out += raw.slice(i);
      break;
    }
    out += raw.slice(i, start);
    const mid = raw.indexOf('=======', start);
    const end = raw.indexOf('>>>>>>>', start);
    if (mid === -1 || end === -1) {
      // malformed; stop
      out += raw.slice(start);
      break;
    }
    // skip to after mid line
    const midLineEnd = raw.indexOf('\n', mid);
    const endLineEnd = raw.indexOf('\n', end);
    const theirsStart = midLineEnd === -1 ? raw.length : midLineEnd + 1;
    const theirsEnd = end === -1 ? raw.length : end;
    out += raw.slice(theirsStart, theirsEnd);
    i = endLineEnd === -1 ? raw.length : endLineEnd + 1;
  }
  return out;
}

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error(`[skip] missing: ${f}`);
    continue;
  }
  const raw = fs.readFileSync(f, 'utf8');
  if (!raw.includes('<<<<<<<')) {
    console.log(`[ok] no conflicts: ${f}`);
    continue;
  }
  const resolved = resolveContent(raw);
  fs.writeFileSync(f, resolved, 'utf8');
  console.log(`[fix] resolved: ${f}`);
}

