'use strict';

const blessed_contrib = require('blessed-contrib');

const cat_service = require('./../services/cat');
const Cat = require('./../models/cat');

const tick = (service_config, type, header, timeout, callback) => {
  setTimeout(() => {
    cat_service.get(service_config.host, service_config.port, type, header, (err, response) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, response);
    })
  }, timeout);
};

/**
 * Register an Info Pane
 * @param object options
 * @param object conf
 * @param object emitter
 * @param object grid
 */
module.exports.register = (opts, conf, emitter, grid) => {

  Object.assign(opts, {
    keys: true,
    fg: 'white',
    selectedBg: 'transparent',
    interval: 1000,
    style: {
      fg: 'grey'
    }
  });

  // Need to allow override of CAT refreshes
  // const interval = 30 * 1000;

  const pane = grid.set(
    // Grid Placement
    opts.layout.row,
    opts.layout.col,
    opts.layout.row_span,
    opts.layout.col_span,
    // Grid Type
    blessed_contrib.table,
    // Grid Options
    opts
  );

  const cat = new Cat(opts.cat.type);

  const tickCallback = (err, response) => {
    if (err) {
      return;
    }

    const translation = cat.translateResponse(response);

    pane.setData({
      headers: translation.header,
      data:  translation.data
     })

    pane.parent.render();

    // Fetch Again
    tick(conf, opts.cat.type, opts.cat.header, opts.interval, tickCallback);
  };

  tick(conf, opts.cat.type, opts.cat.header, opts.interval, tickCallback);

  return pane;
};
