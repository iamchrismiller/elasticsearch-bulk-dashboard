'use strict';

const blessed_contrib = require('blessed-contrib');

const EVENTS = require('./../constants/events');
const Stat = require('./../models/stat');

/**
 * Register a Stat LCD Pane
 * @param object options
 * @param object conf
 * @param object emitter
 * @param object grid
 */
module.exports.register = (opts, conf, emitter, grid) => {

  Object.assign(opts, {
    elements: 9,
    display: '---------',
    color: 'white'
  });

  const pane = grid.set(
    // Grid Placement
    opts.layout.row,
    opts.layout.col,
    opts.layout.row_span,
    opts.layout.col_span,
    // Grid Type
    blessed_contrib.lcd,
    // Grid Options
    opts
  );

  const stat = new Stat(conf.index, opts.stat.type);
  let current_count = 0;

  // Listen for errors
  emitter.on(EVENTS.STAT_FAILURE, (err) => {
    // console.warn(err);
    pane.setDisplay("Error Encountered");
  });

  // Listen for updates
  emitter.on(EVENTS.STAT_UPDATE, (raw_data) => {
    // Get Values from Stat Response
    const response = stat.translateStatResponse(raw_data);

    // Update Current Count for Deltas
    current_count = response.value;

    pane.setDisplay(current_count + (response.magnitude ? response.magnitude : ''));
    pane.parent.render();
  });

  return pane;
};
