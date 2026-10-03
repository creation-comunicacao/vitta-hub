import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const [script, args] of [['run-framework.mjs', ['build']], ['package-locaweb.mjs', []]]) {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(script, import.meta.url)), ...args], {
    cwd: root, stdio: 'inherit', env: { ...process.env, VITTA_STATIC_EXPORT: 'true' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
