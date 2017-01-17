#!/usr/bin/env node
'use strict';

const program = require('commander');
const pkg = require('./package.json');

program
  .version(pkg.version)
  .option('-H, --host <host>', 'Elasticsearch host', '127.0.0.1')
  .option('-p, --port <port>', 'Elasticsearch port', 9200)
  .option('-i, --index <index>', 'Elasticsearch index')
  .option('-c, --count <count>', 'Elasticsearch doc count', parseInt)
  .option('-I, --interval <interval>', 'Query Interval', 1000)
  .parse(process.argv);

if (!program.index) {
  program.outputHelp();
  process.exit(1);
}

// Initialize Dashboard
require('./src/index').init(
  program.host,
  program.port,
  program.index,
  program.count,
  program.interval
);
