'use strict';

const stringHelper = require('./../utils/string');

/**
 * Stat Model
 */
module.exports = class Stat {
  /**
   * Stat Contructor
   * @param string index
   * @param string type
   */
  constructor(index, type) {
    this.index = index;
    this.type = type;
  }

  /**
   * Get Record from response for type
   * @param object data
   */
  getRecordForType(data) {
    return data.indices[this.index].total[this.type];
  }

  /**
   * Translate response into something consistent
   * @param object data
   */
  translateStatResponse(data) {
    switch(this.type) {
      case 'indexing':
      const record = this.getRecordForType(data);
      return {
        value: record.index_total,
        failed: record.index_failed,
        human: stringHelper.bytesToHuman(record.index_total)
      };
      case 'segments':
        return {
          value: this.getRecordForType(data).count
        };
      case 'fielddata':
        return stringHelper.bytesToHuman(this.getRecordForType(data).memory_size_in_bytes);
      case 'translog':
        return stringHelper.bytesToHuman(this.getRecordForType(data).size_in_bytes);
      default:
        // console.log("unhandled stat result", JSON.stringify(result));
        return {
          value: 0
        };
    }
  }
};
