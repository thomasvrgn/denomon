import * as color from 'https://deno.land/std/fmt/colors.ts';

export class Log {
  public static error(...message: string[]): void {
    console.log(color.red(`[denomon] ${message.join(' ')}`));
  }
}