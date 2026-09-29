import { spawnSync, execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
const runDir = resolve('artifacts', `baseline-${new Date().toISOString().replace(/[:.]/g, '-')}`);
mkdirSync(runDir, { recursive: true });
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const dirty = Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim());
const started = new Date().toISOString();
const args = [
  'node_modules/@playwright/test/cli.js',
  'test',
  '--project=chromium',
  '--workers=1',
  '--retries=0',
  ...process.argv.slice(2),
];
console.log(`Fresh evidence directory: ${runDir}`);
const result = spawnSync(process.execPath, args, {
  stdio: 'inherit',
  env: {
    ...process.env,
    PW_RUN_DIR: runDir,
    RUN_COMMIT: `${commit}${dirty ? ' + working-tree changes' : ''}`,
  },
});
const metadata = {
  started,
  finished: new Date().toISOString(),
  commit,
  dirty,
  browser: 'chromium',
  workers: 1,
  retries: 0,
  command: ['node', ...args].join(' '),
  exitCode: result.status,
};
try {
  metadata.results = JSON.parse(readFileSync(join(runDir, 'results.json'), 'utf8')).stats;
} catch {
  metadata.results = 'No JSON report; inspect runner failure.';
}
writeFileSync(join(runDir, 'execution.json'), JSON.stringify(metadata, null, 2));
console.log(JSON.stringify(metadata, null, 2));
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
