import { expandGlob } from 'https://deno.land/std@0.74.0/fs/mod.ts';
import { configuration } from './config.ts';
import { File } from '../typings/file.ts';

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
  const watcher: AsyncIterableIterator<Deno.FsEvent> = Deno.watchFs(pathFiles);
  const interval: number = 10;
  let lastModification: number = Date.now() - interval;

  for await (const event of watcher) {
    if (lastModification + interval > Date.now()) continue;
    lastModification = Date.now();
    console.log('started');
  }
}