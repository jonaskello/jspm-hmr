/*
 *   Copyright 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
// TODO: switch to core http module
// TODO: extract as seperate node package
import * as httpServer from 'http-server';
import openerCommand from 'opener';
import * as chokidar from 'chokidar-socket-emitter';
import {createServer} from './create-server';

// TODO: Change to ES6 import
const packageVersion = require('../package.json').version;
const nodeEnv = process.env.NODE_ENV;

export interface Options {
  hotReload?: boolean;
  path?: string;
  protocol?: string;
  host?: string;
  port?: number;
  caching?: number;
  cache?: number;
  open?: boolean;
  command?: string;
  fallback?: string;
}

export function start(options: Options): any {
  // init
  const hotReload = true;
  const path = options.path || '.';
  const protocol = 'http';
  const host = 'localhost';
  const port = options.port || 8888;
  const url = protocol + '://' + host + ':' + port;
  const cache = options.caching || -1;
  const open = options.open || false;
  const command = options.command || null;
  const fallback = options.fallback || 'index.html';
  const server = createServer(path, cache, fallback);

  logOptionsInfo(packageVersion, nodeEnv, cache);

  // inject hmr & start server
  if (hotReload) {
    injectChokidarSocketEmitter(server);
  }
  server.listen(port);

  logStartedInfo(path, url);

  // open browser
  if (open) {
    openerCommand(url, {
      command: command
    });
  }

  return server;
}

function injectChokidarSocketEmitter(server) {
  chokidar({
    app: server
  });
}

// log helpers
function logOptionsInfo(version, nodeEnv, cache) {
  const environmentText = (nodeEnv === 'production' ? 'production ' : 'development');
  const cacheText = (cache ? 'enabled ' : 'disabled');

  console.log('\n' +
    '  ###################################' + '\n' +
    '  #  JSPM Hot-Module-Reload v' + packageVersion + '  #' + '\n' +
    '  #----------------+----------------#' + '\n' +
    '  # environment    | ' + environmentText + '    #' + '\n' +
    '  # cache          | ' + cacheText + '       #' + '\n' +
    '  ###################################' + '\n'
  );
}

function logStartedInfo(path, url) {
  console.log(`serving "${path}", listening at ${url}`);
  console.log('\n>>> hit CTRL-C to stop <<<\n');
}
