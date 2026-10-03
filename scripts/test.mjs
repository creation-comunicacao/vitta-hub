import {build} from 'esbuild';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const directory=await mkdtemp(join(tmpdir(),'vitta-tests-'));
try{await build({entryPoints:['tests/content.test.ts'],bundle:true,platform:'node',format:'esm',outfile:join(directory,'test.mjs')});const node=spawnSync(process.execPath,['--test',join(directory,'test.mjs')],{stdio:'inherit'});const php=spawnSync('php',['tests/contact.php'],{stdio:'inherit'});if(node.status!==0||php.status!==0)process.exitCode=1;}finally{await rm(directory,{recursive:true,force:true});}
