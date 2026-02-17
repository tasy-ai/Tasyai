const fs = require('fs');
const path = require('path');

const logError = (msg) => {
    const logPath = path.join(__dirname, 'server_error.log');
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${msg}\n`);
};

module.exports = logError;
