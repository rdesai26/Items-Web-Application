module.exports = {
    apps : [{
      name      : 'Items Application',
      script    : './bin/www.mjs',
        node_args : '-r dotenv/config'
    }],
  }