import { Configuration } from '../typings/config.ts';

async function readConfiguration(): Promise<Configuration> {
  const encodedContent: Uint8Array = await Deno.readFile('./src/config.json');
  const decodedContent: string = new TextDecoder('utf-8').decode(encodedContent);

  return JSON.parse(decodedContent) as Configuration;
}

export const configuration: Configuration = await readConfiguration();