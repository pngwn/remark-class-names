const { suite } = require('uvu');
const assert = require('uvu/assert');

const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

const classnames = require('./index')

const processor = unified()
	.use(markdown, {commonmark: true})
	.use(classnames)
  .use(remark2rehype)
	.use(html);
	
const toMDAST = source => processor.parse(source);
const toHTML = async source => (await processor.process(source)).contents;

const classes = suite('remark-class-names');
console.log(processor)
classes('should apply class names to mdast nodes', async () => {
	const md = `# Hello`;
	const out = await toHTML(md)
	
	assert.equal(out, 'hi')
})

classes.run()