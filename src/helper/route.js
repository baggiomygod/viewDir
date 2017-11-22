const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat); // 读取文件基本信息
const readdir = promisify(fs.readdir);
const mime = require('./mime');
const contentTypeRE = /(.+?\/)(.+)/;
const compress = require('./compress'); // 
const range = require('./range');
const isFresh = require('./cache'); // 缓存
// path.join(__dirname)----当前执行文件绝度路径
const tplPath = path.join(__dirname, '../template/dir.tpl');

const source = fs.readFileSync(tplPath, 'utf-8');
const template = Handlebars.compile(source);
module.exports = async function (req, res, filePath, conf) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile(stats, req, res)) { // 如果是个文件
            const contentType = mime(filePath);
            res.setHeader('Content-Type', contentType);
            // 判断浏览器中缓存是否过期
            if (isFresh(stats, req, res)) {
                res.statusCode = 304; // 缓存可用
                res.end();
                return;
            }
            let rs; // readStream
            // stats.size----文件大小信息
            const {
                code,
                start,
                end
            } = range(stats.size, req, res);
            if (code === 200) {
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            } else {
                res.statusCode = 206; // 部分内同
                rs = fs.createReadStream(filePath, {
                    start,
                    end
                });
            }
            // 如果是js html css 压缩它们
            if (filePath.match(conf.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) { // 如果是个文件夹
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(conf.root, filePath);
            console.log('dir:', dir);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file).match(contentTypeRE)[2]
                    };
                })
            };
            const f = files.map(file => {
                return {
                    file,
                    icon: mime(file)
                };
            });
            console.log(f);
            res.end(template(data));
        }
    } catch (e) {
        console.log('err:', e);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`404  ${filePath} id not a directory or file!`);
        return;
    }
};
