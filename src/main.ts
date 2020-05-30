import { Log } from './libs/log.ts';
import { configuration } from './libs/config.ts';
import { watch } from './libs/watch.ts';

watch()
Log.error('test');

console.log(configuration)