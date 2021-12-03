module.exports = {
    apps : [{
      name      : 'User Service',
      script    : 'user-server.mjs',
        node_args : '-r dotenv/config'
    }],
  }