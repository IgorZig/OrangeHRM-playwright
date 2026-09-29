import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
const run =
  process.argv[2] ||
  process.env.PW_RUN_DIR ||
  readdirSync('artifacts')
    .filter((x) => x.startsWith('baseline-'))
    .sort()
    .at(-1);
if (!run) throw new Error('Run npm run test:demo first, or pass the evidence directory.');
const root = resolve(run.startsWith('baseline-') ? join('artifacts', run) : run);
if (!existsSync(join(root, 'allure-results'))) throw new Error(`No Allure results in ${root}`);
const pkg = JSON.parse(readFileSync('node_modules/allure/package.json', 'utf8'));
const bin = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.allure;
const result = spawnSync(
  process.execPath,
  [
    resolve('node_modules/allure', bin),
    'generate',
    join(root, 'allure-results'),
    '-o',
    join(root, 'allure-report'),
  ],
  { stdio: 'inherit' },
);
process.exitCode = result.status ?? 1;
