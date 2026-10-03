import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const child = spawn('php', ['-S', '127.0.0.1:8788', '-t', fileURLToPath(new URL('../locaweb/public/', import.meta.url)), fileURLToPath(new URL('./php-preview-router.php', import.meta.url))], {
  cwd: fileURLToPath(new URL('../', import.meta.url)), stdio: 'inherit',
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 0; });
process.on('SIGINT', () => child.kill('SIGTERM'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
