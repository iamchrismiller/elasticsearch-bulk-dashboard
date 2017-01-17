'use strict';

const http = require("http");

/*
 * Stat Service
 * @TODO Support https, basic www-auth
 * @param {string} host
 * @param {number} port
 * @param {string} index
 * @param {function} callback
 */
module.exports.get = (host, port, index, callback) => {
  http.get({
    host: host,
    port: port,
    path: `${index}/_stats`
  }, function(response) {
    let body = '';
    response.on('data', (chunk) => body += chunk);
    response.on('end', () => {
      if (response.statusCode === 200) {
        callback(null, JSON.parse(body));
      } else if (response.statusCode === 401) {
        callback("Authorization Error Encountered");
      }
    });
  });
};
