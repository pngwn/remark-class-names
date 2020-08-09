const select = require('unist-util-select');

function remark_class_names({ classMap = {} }) {
	function add_class_names(tree) {
		for (const key in classMap) {
			const nodes = select(key, tree);

			for (let i = 0; i < nodes.length; i++) {
				nodes[i] = ensure_deep_props(nodes[i]);
				nodes[i].data.hProperties.className.push(classMap[key]);
			}
		}
	}

	return add_class_names;
}

function ensure_deep_props(props, leaf, obj) {
	let _obj = obj;

	for (let i = 0; i < props.length; i++) {
		if (!_obj[props[i]]) {
			if (i === props.length - 1) _obj[props[i]] = leaf;
			else _obj[props[i]] = {};  
		}
		_obj = _obj[props[i]]
	}

	return obj;
}

module.exports = remark_class_names;