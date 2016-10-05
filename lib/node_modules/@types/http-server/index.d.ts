
interface Options {
  root: string,
  cache: number,
  robots: boolean,
  headers: { [key: string]: string }
}

export function createServer(options:Options);
