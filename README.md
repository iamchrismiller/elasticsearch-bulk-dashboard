### Elasticsearch Bulk Ingest Dashboard [![npm version](https://badge.fury.io/js/elasticsearch-bulk-dashboard.svg)](https://badge.fury.io/js/elasticsearch-bulk-dashboard)

[![Greenkeeper badge](https://badges.greenkeeper.io/iamchrismiller/elasticsearch-bulk-dashboard.svg)](https://greenkeeper.io/)

`Elasticsearch >= 5.x` bulk ingest dashboard

Visualizes parts of the [_cat](https://www.elastic.co/guide/en/elasticsearch/reference/current/cat.html) and [_stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html) APIs.

## Install

`yarn global add elasticsearch-bulk-dashboard`

`npm install -g elasticsearch-bulk-dashboard`

## Usage

```
Usage: elasticsearch-bulk-dashboard [options]

Options:

  -h, --help                 output usage information
  -V, --version              output the version number
  -H, --host <host>          Elasticsearch host
  -p, --port <port>          Elasticsearch port
  -i, --index <index>        Elasticsearch index
  -c, --count <count>        Elasticsearch doc count
  -I, --interval <interval>  Query Interval
```


![Screenshot](https://raw.githubusercontent.com/iamchrismiller/elasticsearch-bulk-dashboard/master/screenshot.png)
