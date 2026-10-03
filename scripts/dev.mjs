import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const children = [];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  for (const child of children) child.kill('SIGTERM');
}
function start(command, args) {
  const child = spawn(command, args, { cwd: root, stdio: 'inherit' });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code ?? 1); });
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
start('php', ['-S', '127.0.0.1:8789', '-t', fileURLToPath(new URL('../php/public/', import.meta.url)), fileURLToPath(new URL('./php-api-router.php', import.meta.url))]);
start(process.execPath, [fileURLToPath(new URL('./run-framework.mjs', import.meta.url)), 'dev', '--host', '127.0.0.1', ...process.argv.slice(2)]);
console.log('Frontend React: http://127.0.0.1:5173 — PHP restrito à API de formulários.');
