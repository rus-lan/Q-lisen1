'use strict';

const http = require('http');
const store = require('./taskStore');

const PORT = 4000;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', (chunk) => {
      buf = buf + chunk;
    });
    req.on('end', () => {
      if (!buf) return resolve(null);
      try {
        resolve(JSON.parse(buf));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const parts = url.pathname.split('/').filter(Boolean);

    // GET /tasks
    if (req.method === 'GET' && parts[0] === 'tasks' && parts.length === 1) {
      return send(res, 200, store.getAll());
    }

    // GET /tasks/:id
    if (req.method === 'GET' && parts[0] === 'tasks' && parts.length === 2) {
      const id = Number(parts[1]);
      const t = store.getOne(id);
      if (!t) return send(res, 404, { error: 'task not found' });
      return send(res, 200, t);
    }

    // POST /tasks
    if (req.method === 'POST' && parts[0] === 'tasks' && parts.length === 1) {
      const data = await readBody(req);
      if (!data || !data.title) {
        return send(res, 400, { error: 'title is required' });
      }
      if (data.title.length > 100) {
        return send(res, 400, { error: 'title too long' });
      }
      const created = store.add(data);
      return send(res, 201, created);
    }

    // PATCH /tasks/:id
    if (req.method === 'PATCH' && parts[0] === 'tasks' && parts.length === 2) {
      const id = Number(parts[1]);
      const data = await readBody(req);
      const updated = store.patch(id, data);
      if (!updated) return send(res, 404, { error: 'task not found' });
      return send(res, 200, updated);
    }

    return send(res, 404, { error: 'route not found' });
  } catch (err) {
    return send(res, 400, { error: 'bad request', detail: err.message });
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('port ' + PORT + ' already in use. Is another server running?');
  } else {
    console.error('server error:', err.message);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log('tasks api listening on http://localhost:' + PORT);
});

module.exports = server;
