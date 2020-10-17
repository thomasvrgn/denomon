import { expandGlob } from 'https://deno.land/std@0.74.0/fs/mod.ts';
import { configuration } from './config.ts';
import { File } from '../typings/file.ts';
import { SortedFile } from '../typings/sortedfile.ts';
import { run } from './run.ts';
import { Log } from './log.ts';

export async function watch() {
  const files: File[] = [];
  for await (const file of expandGlob(configuration.pattern || '*.*')) {
    if (!file.isFile) continue;
    if (!configuration.extensions) {
      files.push(file);
      continue;
    }
    const extension: string = file.path
      .split('/')
      .slice(-1)[0]
      .split('.')
      .slice(1)
      .join('.');
    let match: boolean = false;
    for (const configExtension of configuration.extensions) {
      if (extension.match(configExtension)) {
        match = true;
      }
    }
    if (match) files.push(file);
  }

  const pathFiles: Array<string> = files.map((x: File) => x.path);
  const pathDepth: Array<SortedFile> = pathFiles.map((x: string) => ({
    path: x,
    length: x.split('/').length,
  }));
  const firstMatchedFile: SortedFile = pathDepth.sort((a, b) => a.length - b.length)[0];
  await run(firstMatchedFile.path);
  const watcher: AsyncIterableIterator<Deno.FsEvent> = Deno.watchFs(pathFiles);
  const interval: number = 500;
  let lastModification: number = Date.now() - interval;

  for await (const event of watcher) {
    if (lastModification + interval > Date.now()) continue;
    lastModification = Date.now();
    const pathEvent: string = event.paths[0];
    Log.success('restarting due to changes...');
    await run(pathEvent);
  }
}