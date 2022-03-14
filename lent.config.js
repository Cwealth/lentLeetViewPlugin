const { defineLentConfig } = require('lent');
const { lentLeetCodePlugin } = require('lentleetcodeplugin');
const { lentLeetViewPlugin } = require('./dist/index');

module.exports = defineLentConfig({
	root: './',
	plugin(i) {
		lentLeetCodePlugin(i);
		lentLeetViewPlugin(i);
	}
});
