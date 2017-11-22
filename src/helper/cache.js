/**
 * 缓存
 */
const { cache } = require('../config/defaultConfig');
function refreshRes(stats, res){
    const {maxAge, expires, cacheControl, lastModified, etag} = cache;
    if (expires) {
        res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
    }

    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }

    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }

    if (etag) {
        res.setHeader('ETag', `${stats.size}-${stats.mtime}.toUTCString()`);
    }
}

module.exports = function isFresh(stats, req, res) {
    refreshRes(stats, res);
    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];
    // 如果是第一次请求
    if (!lastModified && !etag) {
        return false;
    }
    // 如果浏览器请求头中的lastModified 与 本地设置的不一致 --- 失效
    if (lastModified && lastModified !== res.getHeader('Last-modified')) {
        return false;
    }
    // 如果浏览器请求头中的etag 与 本地设置的不一致 
    if (etag && etag !== res.getHeader('ETag')) {
        return false;
    }
    // 否则缓存是可用的， 返回true
    return true;

};