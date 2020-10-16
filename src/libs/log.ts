import * as color from 'https://deno.land/std/fmt/colors.ts';
import { configuration } from './config.ts';

export class Log {
  public static error(...message: string[]): void {
    console.log(color.red(`[${configuration.name}] ${message.join(' ')}`));
  }

  public static warning(...message: string[]): void {
    console.log(color.yellow(`[${configuration.name}] ${message.join(' ')}`));
  }

  public static success(...message: string[]): void {
    console.log(color.green(`[${configuration.name}] ${message.join(' ')}`));
  }
}