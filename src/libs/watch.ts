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
  console.log(files);
}