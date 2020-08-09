function remark_class_names(opts) {
	function add_class_names(tree) {
		console.log(tree)
	}

	return add_class_names;
}

function ensure_deep_props(props, leaf, obj) {
	let _obj = obj;

	for (let i = 0; i < props.length - 1; i++) {
		if (!_obj[props[i]]) _obj[props[i]] = {};
		_obj = _obj[props[i]]
	}

	_obj[props[props.length - 1]] = leaf;

	return obj;
}

module.exports = remark_class_names;