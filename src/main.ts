import { Log } from './libs/log.ts';
import { configuration } from './libs/config.ts';
import {run} from "./libs/run.ts";
run()
Log.error('test');

console.log(configuration)