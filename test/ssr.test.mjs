import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('production SSR serves pages and assets', { timeout: 30_000 }, async () => {
  const port = 20_000 + Math.floor(Math.random() * 30_000);
  const child = spawn(process.execPath, ['dist/server/server.cjs'], {
    env: { ...process.env, PORT: String(port), NODE_ENV: 'production' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const ready = new Promise((resolve, reject) => {
    child.stdout.on('data', chunk => {
      if (String(chunk).includes('SSR server started')) resolve();
    });
    child.once('error', reject);
    child.once('exit', code => reject(new Error(`SSR exited before ready: ${code}`)));
  });

  try {
    await ready;

    const origin = `http://127.0.0.1:${port}`;

    const main = await fetch(origin, { signal: AbortSignal.timeout(15_000) });
    const mainHtml = await main.text();
    assert.equal(main.status, 200);
    assert.match(mainHtml, /id="root"/);
    assert.match(mainHtml, /id="__REACT_QUERY_STATE__"/);
    assert.match(mainHtml, /rel="stylesheet"/);

    const about = await fetch(`${origin}/about`);
    assert.equal(about.status, 200);
    assert.match(await about.text(), /About/);

    const missing = await fetch(`${origin}/missing`);
    assert.equal(missing.status, 404);
    assert.match(await missing.text(), /NotFound/);

    const manifest = JSON.parse(await readFile('dist/client/manifest.json', 'utf8'));
    const script = await fetch(`${origin}${manifest.assets['app.js'].file}`);
    assert.equal(script.status, 200);
    await script.arrayBuffer();

    const stylesheet = await fetch(`${origin}${manifest.assets['app.css'].file}`);
    assert.equal(stylesheet.status, 200);
  } finally {
    child.kill('SIGTERM');
  }
});
