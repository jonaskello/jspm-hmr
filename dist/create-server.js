"use strict";
const http = require('http');
const express = require('express');
const fallback = require('express-history-api-fallback');
function createServer(path, cache, fallbackFile) {
    const app = express();
    app.use(express.static(path, { maxAge: cache }));
    app.use(fallback(fallbackFile, { root: path }));
    return http.createServer(app);
}
exports.createServer = createServer;
//# sourceMappingURL=create-server.js.map