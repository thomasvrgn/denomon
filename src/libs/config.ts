async function readConfiguration(): Promise<any> {
  const encodedContent: Uint8Array = await Deno.readFile('./src/config.json');
  const decodedContent: string = new TextDecoder('utf-8').decode(encodedContent);

  return JSON.parse(decodedContent);
}

export const configuration = await readConfiguration();