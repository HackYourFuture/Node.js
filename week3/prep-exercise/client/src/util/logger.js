/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */

// Log levels in increasing severity
const LEVELS = ['silly', 'debug', 'info', 'warn', 'error', 'fatal', 'none'];

/**
 * Create a logger object.
 * @returns
 */
function logger() {
  let minLevel = LEVELS.length - 1;

  // Check the requested level against the minimum level
  const isMinLevel = (level) => LEVELS.indexOf(level) >= minLevel;

  // The function that does the actual logging.
  const log = (level, label, ...args) => {
    if (!isMinLevel(level)) {
      return;
    }

    let logFn;

    switch (level) {
      case 'warn':
        logFn = console.warn;
        break;
      case 'info':
        logFn = console.info;
        break;
      case 'error':
        logFn = console.error;
        break;
      default:
        logFn = console.log;
    }

    logFn(`${level}: ${label} =>`, ...args);
  };

  // Return an object with convenience functions for logging at specific
  // log levels.
  return {
    setLevel(level) {
      const newLevel = LEVELS.indexOf(level);
      if (newLevel !== -1) {
        minLevel = newLevel;
      }
    },
    getLevel() {
      return LEVELS[minLevel];
    },
    isMinLevel,
    log,
    silly(label, ...args) {
      log('silly', label, ...args);
    },
    debug(label, ...args) {
      log('debug', label, ...args);
    },
    info(label, ...args) {
      log('info', label, ...args);
    },
    warn(label, ...args) {
      log('warn', label, ...args);
    },
    error(label, ...args) {
      log('error', label, ...args);
    },
    fatal(label, ...args) {
      log('fatal', label, ...args);
    },
  };
}

export default logger();
