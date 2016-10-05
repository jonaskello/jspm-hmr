/// <reference types="node" />
import * as http from 'http';
export declare function createServer(path: string, cache: number, fallbackFile: string): http.Server;
