/*
 * Javascript processor.
 *
 * Wrap js module with transport string.
 * It enables you to use commonjs module system on the client,
 * automatically generate module id from file path and inject require,
 * exports and module as private variables into the module closure.
 */

var parse = require('../deps').parse;

var tpl = ';define("{id}", {deps}, ' +
          'function(require, exports, module) {\n' +
              '{body}' +
          '\n});\n';

var extname = require('path').extname;

/**
 * Default options.
 * @type {Object}
 * @export
 */
exports.options = {
    pattern: /\.js$/,
    filter: /require\.js$/
};

/**
 * Wrap module with transport function string.
 * @param {string} path path to file.
 * @param {string} data module body.
 * @param {Object} o current configuration.
 * @this Build
 * @return {string} wraped module string.
 * @export
 */
exports.run = function(path, data, o) {
    var deps;

    // path is absolute
    if (path.substr(0, 1) === '/') {
        this.paths.forEach(function(lookupPath) {
            path = path.replace(lookupPath, '');
        });
        // if the lookupPath defined with slash at the end
        // f.e. /my/lib/
        if (path.substr(0, 1) === '/') {
            path = path.substr(1);
        }
    }

    // remove ext from the name
    path = path.substr(0, path.length - extname(path).length);

    deps = parse(data, true);
    deps.unshift('require', 'exports', 'module');

    return tpl.replace('{id}', path)
              .replace('{deps}', '["' + deps.join('", "') + '"]')
              .replace('{body}', data);
};