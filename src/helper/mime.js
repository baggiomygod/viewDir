/**
 * 文件类型
 */
const path = require('path');
const mimeTypes = {
    'css': 'text/css',
    'html': 'text/html',
    'tpl': 'text/html',
    'xml': 'text/xml',
    'js': 'text/javascript',
    'txt': 'text/plain',
    'cml': 'text/xml',
    'json': 'application/json',
    'pdf': 'application/json',
    'swf': 'application/x-shockwave-flash',
    'gif': 'image/gif',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'tiff': 'image/tiff',
    'wav': 'audio/x-wav',
    'wma': 'audio/jx-ms-wmason',
    'wmv': 'audio/jx-ms-wmv'
};

module.exports = (filePath) => {
    console.log('mime:', path.extname(filePath).split('.'));
    // extname 返回扩展名
    let ext = path.extname(filePath)
        .split('.')
        .pop()
        .toLowerCase();

    if (!ext) {
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['txt'];
};
