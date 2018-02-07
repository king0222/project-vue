'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getConfig = getConfig;
exports.applyMock = applyMock;
exports.outputError = outputError;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('path'),
    resolve = _require.resolve;

var _require2 = require('fs'),
    realpathSync = _require2.realpathSync;

function resolveOwn(relativePath) {
  return resolve(__dirname, relativePath);
}

function getPaths(cwd) {
  var appDirectory = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath);
  }

  return {
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveOwn('../node_modules'),
    resolveApp: resolveApp,
    appDirectory: appDirectory
  };
}

var error = null;
var CONFIG_FILE = '.mock.js';
var paths = getPaths(process.cwd());

function getConfig(filePath) {
  var resolvedFilePath = paths.resolveApp(filePath);
  if (_fs2.default.existsSync(resolvedFilePath)) {
    var files = [];
    var realRequire = require.extensions['.js'];
    require.extensions['.js'] = function (m, filename) {
      if (filename.indexOf(paths.appNodeModules) === -1) {
        files.push(filename);
      }
      delete require.cache[filename];
      return realRequire(m, filename);
    };

    var config = require(resolvedFilePath);
    require.extensions['.js'] = realRequire;

    return { config: config, files: files };
  } else {
    return {
      config: {},
      files: [resolvedFilePath]
    };
  }
}

function createMockHandler(method, path, value) {
  return function mockHandler() {
    var res = arguments.length <= 1 ? undefined : arguments[1];
    if (typeof value === 'function') {
      value.apply(undefined, arguments);
    } else {
      res.json(value);
    }
  };
}

function applyMock(devServer) {
  var realRequire = require.extensions['.js'];
  try {
    realApplyMock(devServer);
    error = null;
  } catch (e) {
    require.extensions['.js'] = realRequire;

    error = e;

    console.log();
    outputError();

    var watcher = _chokidar2.default.watch(paths.resolveApp(CONFIG_FILE), {
      ignored: /node_modules/,
      persistent: true
    });
    watcher.on('change', function (path) {
      console.log(_chalk2.default.green('CHANGED'), path.replace(paths.appDirectory, '.'));
      watcher.close();
      applyMock(devServer);
    });
  }
}

function realApplyMock(devServer) {
  var ret = getConfig(CONFIG_FILE);
  var config = ret.config;
  var files = ret.files;
  var app = devServer;

  (0, _keys2.default)(config).forEach(function (key) {
    var keyParsed = parseKey(key);
    (0, _assert2.default)(!!app[keyParsed.method], 'method of ' + key + ' is not valid');
    (0, _assert2.default)(typeof config[key] === 'function' || (0, _typeof3.default)(config[key]) === 'object', 'mock value of ' + key + ' should be function or object, but got ' + (0, _typeof3.default)(config[key]));
    app[keyParsed.method](keyParsed.path, createMockHandler(keyParsed.method, keyParsed.path, config[key]));
  });

  var lastIndex = null;
  app._router.stack.forEach(function (item, index) {
    if (item.name === 'webpackDevMiddleware') {
      lastIndex = index;
    }
  });
  var mockAPILength = app._router.stack.length - 1 - lastIndex;
  if (lastIndex && lastIndex > 0) {
    var newStack = app._router.stack;
    newStack.push(newStack[lastIndex - 1]);
    newStack.push(newStack[lastIndex]);
    newStack.splice(lastIndex - 1, 2);
    app._router.stack = newStack;
  }

  var watcher = _chokidar2.default.watch(files, {
    ignored: /node_modules/,
    persistent: true
  });
  watcher.on('change', function (path) {
    console.log(_chalk2.default.green('CHANGED'), path.replace(paths.appDirectory, '.'));
    watcher.close();

    app._router.stack.splice(lastIndex - 1, mockAPILength);

    applyMock(devServer);
  });
}

function parseKey(key) {
  var method = 'get';
  var path = key;

  if (key.indexOf(' ') > -1) {
    var splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return { method: method, path: path };
}

function outputError() {
  if (!error) return;

  var filePath = error.message.split(': ')[0];
  var relativeFilePath = filePath.replace(paths.appDirectory, '.');
  var errors = error.stack.split('\n').filter(function (line) {
    return line.trim().indexOf('at ') !== 0;
  }).map(function (line) {
    return line.replace(filePath + ': ', '');
  });
  errors.splice(1, 0, ['']);

  console.log(_chalk2.default.red('Failed to parse mock config.'));
  console.log();
  console.log('Error in ' + relativeFilePath);
  console.log(errors.join('\n'));
  console.log();
}