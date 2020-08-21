import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import DBClient from './db/DBClient'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

(async () => {
    await app.prepare();
    const dbClient = new DBClient();
    await dbClient.connect();
    console.log(process.env.DB_USER);
    
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true)
        const { pathname, query } = parsedUrl
    
        if (pathname === '/a') {
          app.render(req, res, '/a', query)
        } else if (pathname === '/b') {
          app.render(req, res, '/b', query)
        } else {
          handle(req, res, parsedUrl)
        }
      }).listen(port);
      console.log(
        `> Server listening at http://localhost:${port} as ${
          dev ? 'development' : process.env.NODE_ENV
        }`
      )
})();
