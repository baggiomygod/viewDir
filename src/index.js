const yargs = require('yargs');
const Server = require('./app');
const argv = yargs
    .usage('webdir [options]')
    .option('p', {
        alias: 'port', // 别名
        decsribe: '端口号 port',
        default: 8080
    })
    .option('h', {
        alias: 'hostname',
        describe: 'host',
        default: '127.0.0.1'
    })
    .option('d', {
        alias: 'root',
        describe: 'root path',
        default: process.cwd()
    })
    .version()
    .alias('v', 'version')
    .help()
    .argv;

// 实例化服务
const server = new Server(argv);
server.start();
