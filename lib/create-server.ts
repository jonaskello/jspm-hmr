import * as http from 'http';
import * as express from 'express';
import * as fallback from 'express-history-api-fallback';

export function createServer(path: string, cache: number, fallbackFile: string): http.Server {
  const app = express();
  app.use(express.static(path, { maxAge: cache}));
  app.use(fallback(fallbackFile, { root: path }));
  return http.createServer(app);
}
