const NodeCache = require('node-cache');

// Initialize cache with 60s TTL
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Metrics tracker for cache-hit and cache-miss
const metrics = {
  hits: 0,
  misses: 0
};

module.exports = {
  cache,
  metrics
};
