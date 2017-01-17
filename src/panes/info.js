'use strict';

const blessed_contrib = require('blessed-contrib');

/**
 * Register an Info Pane
 * @param object options
 * @param object conf
 * @param object emitter
 * @param object grid
 */
module.exports.register = (opts, conf, emitter, grid) => {
  const pane = grid.set(
    // Grid Placement
    opts.layout.row,
    opts.layout.col,
    opts.layout.row_span,
    opts.layout.col_span,
    // Grid Type
    blessed_contrib.log,
    // Grid Options
    opts
  );

  pane.log('');
  pane.log(` Host: ${conf.host}:${conf.port}`);
  pane.log(` Index: ${conf.index}`);
  pane.log(` Stat Interval: ${conf.interval / 1000}s`);
  if (conf.total) {
    pane.log(` Record Count: ${conf.total}`);
  }

  return pane;
};
