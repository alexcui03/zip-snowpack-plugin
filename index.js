const JSZip = require('jszip');
const path = require('path');
const fs = require('fs');

function walkDirectory(dirPath, callback) {
    fs.readdirSync(dirPath).forEach(name => {
        const filePath = path.join(dirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            callback(filePath, 1)
            walkDirectory(filePath, callback);
        }
        else if (stat.isFile()) {
            callback(filePath, 0);
        }
    });
}

function matchPattern(file, include, exclude) {
    if (include) {
        for (const reg of include) {
            if (!reg.test(file)) {
                return false;
            }
        }
    }
    if (exclude) {
        for (const reg of exclude) {
            if (reg.test(file)) {
                return false;
            }
        }
    }
    return true;
}

module.exports = (snowpackConfig, pluginOptions) => ({
    name: 'zip-snowpack-plugin',
    async optimize({ buildDirectory }) {
        let zip = new JSZip();
        walkDirectory(buildDirectory, (filePath, isDir) => {
            filePath = path.relative(buildDirectory, filePath);
            if (!isDir &&
                matchPattern(filePath, pluginOptions.include, pluginOptions.exclude)
            ) {
                zip.file(filePath, fs.createReadStream(filePath));
            }
        });
        const zipPath = path.join(pluginOptions.path || buildDirectory, `${pluginOptions.filename || ''}.${pluginOptions.extension || 'zip'}`);
        zip.generateNodeStream({ streamFiles: true })
            .pipe(fs.createWriteStream(zipPath));
    }
});
