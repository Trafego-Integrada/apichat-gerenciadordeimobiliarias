module.exports = {
  apps: [{
    name: 'My Application',
    script: 'dist/server.js',
    node_args: '-r dotenv/config',
  }],
}