import { Log } from './log.ts';
import { configuration } from './config.ts';

export function init() {
  Log.warning(configuration.version);
  Log.warning('watching path(s): ', configuration.pattern || '*.*');
  Log.warning('watching extensions: ', configuration.extensions || 'ts');
}