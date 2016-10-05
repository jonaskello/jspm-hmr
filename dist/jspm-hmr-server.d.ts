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
export declare function start(options: Options): any;
