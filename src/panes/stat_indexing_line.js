'use strict';

const blessed_contrib = require('blessed-contrib');

const EVENTS = require('./../constants/events');
const Stat = require('./../models/stat');

/**
 * Register a Stat Line Graph
 * @param object options
 * @param object conf
 * @param object emitter
 * @param object grid
 */
module.exports.register = (opts, conf, emitter, grid) => {

  Object.assign(opts, {
    label:  opts.label,
    style: {
      text: "white",
      baseline: "black",
    },
    legend: {width: 10},
    abbreviate: true,
    wholeNumbersOnly: false
  });

  const pane = grid.set(
    // Grid Placement
    opts.layout.row,
    opts.layout.col,
    opts.layout.row_span,
    opts.layout.col_span,
    // Grid Type
    blessed_contrib.line,
    // Grid Options
    opts
  );

  const stat = new Stat(conf.index, opts.stat.type);

  let data = {
    success: {
      x: [],
      y: []
    },
    failed: {
      x: [],
      y: []
    }
  };

  // Listen for updates
  emitter.on(EVENTS.STAT_UPDATE, (raw_data) => {
    const response = stat.translateStatResponse(raw_data);
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    data.success.x.push(timestamp);
    data.success.y.push(response.value);

    data.failed.x.push(timestamp);
    data.failed.y.push(response.failed);

    pane.setData([
      {
        title: 'Sucessful',
        style: {
            line: 'green'
        },
        x: data.success.x,
        y: data.success.y
      },
      {
        title: 'Failed',
        style: {
            line: 'red'
        },
        x: data.failed.x,
        y: data.failed.y
      }
    ]);

    pane.parent.render();
  });

  return pane;
};
