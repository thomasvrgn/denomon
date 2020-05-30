import { expandGlob } from 'https://deno.land/std@0.74.0/fs/mod.ts';
import { configuration } from './config.ts';
import { File } from '../typings/file.ts';

export async function watch() {
  const files: File[] = [];
  for await (const file of expandGlob(configuration.pattern || '*.*')) files.push(file);
  console.log(files);
}