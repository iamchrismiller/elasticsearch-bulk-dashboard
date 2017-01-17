### Elasticsearch Bulk Ingest Dashboard

`Elasticsearch >= 5.x` bulk ingest dashboard

Visualizes parts of the [_cat](https://www.elastic.co/guide/en/elasticsearch/reference/current/cat.html) and [_stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html) APIs.

## Install

`yarn/npm install`


## Usage

```
Usage: index [options]

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
