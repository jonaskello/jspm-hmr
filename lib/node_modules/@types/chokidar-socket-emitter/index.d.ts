declare module "chokidar-socket-emitter" {

  namespace chokidarEvEmitter {

    interface Options {
      port?: number;
      path?: string;
      app: any;
      chokidar?: { usePolling: boolean };
    }
  }

  function chokidarEvEmitter(options: chokidarEvEmitter.Options);

  export = chokidarEvEmitter;

}
