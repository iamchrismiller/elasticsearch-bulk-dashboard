'use strict';

const http = require("http");

/*
 * Cat Service
 * @TODO Support https, basic www-auth
 * @param {string} host
 * @param {number} port
 * @param {string} type
 * @param {string} header
 * @param {function} callback
 */
module.exports.get = (host, port, type, header, callback) => {
  http.get({
    host: host,
    port: port,
    path: `_cat/${type}?v&h=${header}`
  }, function(response) {
    let body = '';
    response.on('data', (chunk) => body += chunk);
    response.on('end', () => {
      if (response.statusCode === 200) {
        callback(null, body);
      } else if (response.statusCode === 401) {
        callback("Authorization Error Encountered");
      }
    });
  });
};
