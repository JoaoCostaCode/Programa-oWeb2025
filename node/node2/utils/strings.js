const toUpper = (str) => str.toUpperCase()
const toLower = (str) => str.toLowerCase()
function createLink(filename) {
    return `<a href="/${filename}">${filename}</a><br>\n`;
    
}

module.exports = {toUpper, toLower, createLink}
