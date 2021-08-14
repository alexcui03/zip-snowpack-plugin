# zip-snowpack-plugin
Snowpack plugin to zip files.

## Installation

For NPM:
```bash
npm install --save-dev zip-snowpack-plugin
```

For Yarn:
```bash
yarn add -D zip-snowpack-plugin
```

## Usage

**snowpack.config.js**
```javascript
module.exports = {
    // ...
    plugins: [
        ['zip-snowpack-plugin', {
            // set zip out path
            // OPTIONAL: defaults to the Snowpack build path
            path: 'dist',

            // set zip file name
            // OPTIONAL: defaults to ''
            filename: '',

            // set zip file extension
            // OPTIONAL: defaults to 'zip'
            extension: 'zip',

            // must be a RegExp, zip the file only when file relative path is satisfied with any of RegExp in the list
            // If undefined, plugin will ignore it
            // OPTIONAL: defaults to undefined
            include: [],
            
            // must be a RegExp, don't zip the file only when file relative path is satisfied with any of RegExp in the list
            // If undefined, plugin will ignore it
            // OPTIONAL: defaults to undefined
            exclude: [/\.png$/]
        }]
    ]
}
```

