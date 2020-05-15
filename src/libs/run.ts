import { configuration } from './config.ts';
import { Log } from './log.ts';

export async function run() {
  Log.success('starting `deno ', configuration.pattern || '*.*', '`');
  const run = Deno.run({
    cmd: ['deno', 'run', '--allow-read', '--unstable', '--no-check', configuration.pattern || '*.*'],
    stdout: 'piped',
    stderr: 'piped',
  });
  const content: Uint8Array = await run.output();
  const error: Uint8Array  = await run.stderrOutput();
  if (error.length > 0) {
    const errorContent: string = new TextDecoder('utf-8').decode(error);
    const encodedError: Uint8Array = new TextEncoder().encode(errorContent);
    await Deno.stdout.write(encodedError);
    return Log.error('app crashed - waiting for file changes before starting...');
  }
  await Deno.stdout.write(content);
  Log.success('clean exit - waiting for changes before restart');
}