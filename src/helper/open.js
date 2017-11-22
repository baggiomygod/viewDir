const {exec} = require('child_process');

module.exports = url => {
    switch(process.platform) {
    case 'darwin':
        exec(`open ${url}`);
        break;
    case 'cin32':
        exec(`start ${url}`);
        break;
    default:
        break;
    }
};