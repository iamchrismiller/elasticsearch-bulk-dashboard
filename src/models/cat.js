'use strict';

/**
 * Cat Model
 */
module.exports = class Cat {
  /**
   * Cat Contructor
   * @param string type
   */
  constructor(type) {
    this.type = type;
  }

  getValuesForType(data) {
    switch(this.type) {
      case 'thread_pool/bulk,flush,refresh,index,force_merge':
      case 'health':
      case 'nodes':
        const rows = data.split("\n");
        let result = {
          header: rows.shift().split(' ').filter(r => r.length),
          data: []
        };
        rows.forEach((row) => {
          if (row.length) {
            const columns = row.split(' ').filter(r => r.length);
            result.data.push(columns);
          }
        });
        return result;
    }
  }

  translateResponse(data) {
    const response = this.getValuesForType(data);

    return response;
  }
}
