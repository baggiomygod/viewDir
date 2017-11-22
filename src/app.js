const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');
const path = require('path');
const route = require('./helper/route');
const openUrl = require('./helper/open');
class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }
    // 启动方法
    start(){
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            console.log('filePath:', filePath);
            // fs.stat 获取文件或目录的详细信息
            route(req,res,filePath, this.conf);
        }
        );
        
        server.listen(this.conf.port, this.conf.hostname, () => {
            const address = `http://${this.conf.hostname}:${this.conf.port}`;
            console.log(`Server started at ${chalk.green(address)}`);
            openUrl(address);
        });
    }
}

module.exports = Server;