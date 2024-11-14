/**
 * Module dependencies.
 */

import app from './app/app'
import http from 'http'
import { debug as debugBuilder } from 'debug'
import { config as dotenvConfig } from 'dotenv'


/**
 * Fetch config and setup debug
 */
const config = dotenvConfig().parsed
if (!config || dotenvConfig().error) {
    console.warn('An error has occured while fetching environment variables.\n', dotenvConfig().error?.message)
}

const debug = debugBuilder('tarea3:backend')

/**
 * Get port from environment and store in Express.
 */
const port = isNaN(Number(config?.PORT)) ? 3000 : Number(config?.PORT)


/**
 * Create HTTP server
 */
const httpServer = http.createServer(app)


/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.listen(port)

httpServer.on('error', onError)
httpServer.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr :
    addr === null ? '[unknown address]' :
    'port ' + addr.port;

  debug('Listening on ' + bind);
}
