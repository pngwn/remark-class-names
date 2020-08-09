# remark-class-names

A [`remark`](https://github.com/remarkjs/remark) plugin to add custom classnames to markdown elements. `unified` / `remark` friendly alternative to [`gatsby-remark-classes`](https://github.com/chrisg86/gatsby-remark-classes).

## Install

With `npm`:
```
npm i -D remark-class-names
```

Or with `yarn`:
```
yarn add --dev remark-class-names
```

## Use

```js
const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

const classnames = require('remark-class-names');

const classname_opts = { 
	classMap: { 
		"heading[depth=1]": "title", 
		paragraph: "para"
	}
}

const processor = unified()
	.use(markdown, {commonmark: true})
	.use(classnames, classname_opts)
	.use(remark2rehype)
	.use(html);

processor.process(input).then(vFile => console.log(vFile.contents));
```

With the above configuration given the following input:

```md
# Hello friends

What even is 'clocks'?
```

We will get the following output:

```html
<h1 class="title">Hello friends</h1>

<p class="para">What even is 'clocks'?</p>
```

## Options

`remark-class-names` takes a single object as configuration which needs a `classNames` property if you want anything to happen.

### `classNames`

`classNames` should be an object of key value pairs. The key should be the `selector` and the value should be the class that wish to apply to it.

Basic selectors can simply select nodes from the list in the [MDAST spec](https://github.com/syntax-tree/mdast). Anything listed under [Nodes](https://github.com/syntax-tree/mdast#nodes) should be selectable.

You can also use more advances selectors, such as `heading[depth=1] ~ :nth-child(even)` which will select _even_ children that have a level one heading as a sibling (at least I think that's what it does). The full list of support selectors can be found on the [`unist-util-select` documentation](https://github.com/syntax-tree/unist-util-select#support), there are lots.

## Have fun

Please have fun.

