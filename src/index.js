'use strict';

const EventEmitter = require('events').EventEmitter;
const blessed = require('blessed');
const blessed_contrib = require('blessed-contrib');

const screen_conf = require('./config/screen');
const pane_conf = require('./config/panes');

// Constants
const EVENTS = require('./constants/events');

// Panes
const info_pane = require('./panes/info');
const cat_table_pane = require('./panes/cat_table');
const stat_indexing_rate_pane = require('./panes/stat_indexing_rate');
const stat_complete_pane = require('./panes/stat_complete');
const stat_lcd_pane = require('./panes/stat_lcd');
const stat_indexing_line_pane = require('./panes/stat_indexing_line');

// Services
const stat_service = require('./services/stat');

/**
 * Elasticsearch Bulk Upload Dashboard for the Terminal
 */
class ElasticBulkDashboard {
  /**
   * @param object screen_config
   * @param object pane_config
   * @param object service_config
   */
  constructor(screen_config, pane_config, service_config) {
    this.screen = this.create_screen(screen_config);
    this.grid = this.create_grid();
    this.service_config = service_config;
    this.emitter = new EventEmitter();
    this.register_grid_panes(pane_config);
    this.bind_events();
  }

  /**
   * Configure Blessed Screen
   */
  create_screen(config) {
    return blessed.screen(config);
  }

  /**
   * Configure Blessed Grid
   */
  create_grid() {
    return new blessed_contrib.grid({
      rows: 12,
      cols: 12,
      screen: this.screen
    });
  }

  /**
   * Register Panes with Grid
   */
  register_grid_panes(panes) {
    // This could be cleaner
    if (panes) {
      const s_conf = this.service_config;

      info_pane.register(panes.info, s_conf, this.emitter, this.grid);
      cat_table_pane.register(panes.cats.heap, s_conf, this.emitter, this.grid);
      cat_table_pane.register(panes.cats.health, s_conf, this.emitter, this.grid);
      cat_table_pane.register(panes.cats.thread_pool, s_conf, this.emitter, this.grid);
      stat_lcd_pane.register(panes.stats.translog, s_conf, this.emitter, this.grid);
      stat_lcd_pane.register(panes.stats.indexing_current, s_conf, this.emitter, this.grid);
      stat_indexing_rate_pane.register(panes.stats.indexing_rate, s_conf, this.emitter, this.grid);
      stat_indexing_line_pane.register(panes.stats.indexing_graph, s_conf, this.emitter, this.grid);
      stat_complete_pane.register(panes.stats.indexing_complete, s_conf, this.emitter, this.grid);
    }
  }

  /**
   * Bind Global Events
   */
  bind_events() {
    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], () => {
      process.exit(0);
     });
  }

  tick_stats() {
    const self = this;
    const conf = this.service_config;
    // Fetch from index _stats API
    stat_service.get(conf.host, conf.port, conf.index, (err, response) => {
      if (err) {
        return self.emitter.emit(EVENTS.STAT_FAILURE, err);
      }
      self.emitter.emit(EVENTS.STAT_UPDATE, response);
      // Tick again after timeout
      setTimeout(function() {
        self.tick_stats.call(self);
      }, conf.interval);
    });
  }

  /**
   * Render Screen
   */
  render() {
    this.tick_stats();
    this.screen.render();
  }
}

/**
 * Initializer for Elastic Dashboard
 * @param string host
 * @param number port
 * @param string index
 * @param number total
 * @param number interval
 */
module.exports.init = (host, port, index, total, interval) => {
  new ElasticBulkDashboard(screen_conf, pane_conf, {
    host: host,
    port: port,
    index: index,
    total: total,
    interval: interval
  }).render();
};
