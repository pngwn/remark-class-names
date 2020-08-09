const { suite } = require('uvu');
const assert = require('uvu/assert');

const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

const classnames = require('./index')

const processor = unified()
	.use(markdown, {commonmark: true})
	.use(classnames, { 
		classMap: { 
			"heading[depth=1]": "title", 
			"heading[depth=1] ~ :nth-child(even)": 'even-para',
			"table": 'table',
			'tableRow': 'row',
			'tableCell': 'cell'
		}
	})
  .use(remark2rehype)
	.use(html);
	
const toMDAST = source => processor.parse(source);
const toHTML = async source => (await processor.process(source)).contents;

const classes = suite('remark-class-names');

classes('should apply class names to mdast nodes', async () => {
	const md = `# Hello`;
	const out = await toHTML(md)
	
	assert.equal(out, '<h1 class="title">Hello</h1>')
})

classes('matches strange selectors', async () => {
	const md = `
# Hello

hello

friends

my friends

hello

again
	`;
	const out = await toHTML(md)

	assert.equal(out, `<h1 class="title">Hello</h1>
<p class="even-para">hello</p>
<p>friends</p>
<p class="even-para">my friends</p>
<p>hello</p>
<p class="even-para">again
</p>`)
})

classes('other stuff', async () => {
	const md = `
|   |   |
|---|---|
|   |   |
	`;
	const out = await toHTML(md)

	assert.equal(out, `<table class="table">
<thead>
<tr class="row">
<th class="cell"></th>
<th class="cell"></th>
</tr>
</thead>
<tbody>
<tr class="row">
<td class="cell"></td>
<td class="cell"></td>
</tr>
</tbody>
</table>`)
})
classes.run()