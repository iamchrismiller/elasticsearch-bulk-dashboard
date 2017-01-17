'use strict';

const blessed_contrib = require('blessed-contrib');

const EVENTS = require('./../constants/events');
const Stat = require('./../models/stat');

/**
 * Register a Completion Guage Pane
 * @param object options
 * @param object conf
 * @param object emitter
 * @param object grid
 */
module.exports.register = (opts, conf, emitter, grid) => {

  Object.assign(opts, {
    stroke: 'green',
    fill: 'white'
  });

  const pane = grid.set(
    // Grid Placement
    opts.layout.row,
    opts.layout.col,
    opts.layout.row_span,
    opts.layout.col_span,
    // Grid Type
    conf.total ? blessed_contrib.gauge : blessed_contrib.log,
    // Grid Options
    opts
  );

  if (conf.total) {
      const stat = new Stat(conf.index, opts.stat.type);

      // Listen for updates
      emitter.on(EVENTS.STAT_UPDATE, (raw_data) => {
        const response = stat.translateStatResponse(raw_data);
        if (conf.total) {
          pane.setPercent(~~(response.value / conf.total * 100));
        } else {
          pane.setPercent(0);
        }
        pane.parent.render();
      });
  } else {
    pane.log('');
    pane.log('');
    pane.log(' *You must specify a count');
  }

  return pane;
};
