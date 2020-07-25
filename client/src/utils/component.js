/*****************************************************
 * Generate HTML attributes from React props if condition is met
 *
 * @param props - React Component props object
 * @param items - array of items to convert:
 *   item: [
 *     name (String)    - both HTML attribute name and prop variable name
 *     condition (Bool) - item ignored if false (default: true)
 *     modifier (Func)  - modifies the attribute value (optional)
 *   ]
 * @returns - object that maps attributes to values of props with matching name
 *
 *****************************************************/

export const getAttributesFromProps = (props, items) => {
	const attributes = {};

	items.forEach((item) => {
		let attrName, condition, modifier;

		if (Array.isArray(item)) {
			[attrName, condition = true, modifier] = item;
		} else {
			attrName = item;
			condition = true;
		}

		const attrVal = props[attrName];
		if (attrVal === undefined || !condition) return;

		attributes[attrName] = modifier ? modifier(attrVal) : attrVal;
	});

	return attributes;
};

/*****************************************************
 *  Generate classNames from n React props
 *
 * @param classes - initial HTML class attribute (String); must contain at least one className, i.e. base class
 * @param props   - React Component props object
 * @param items   - array of strings to convert into an HTML class if a props with a matching name exists
 *
 * Eeach item is converted as ' baseClass[0]--item', e.g:
 *   input:  'button button--blue', props, ['wide', 'secondary']
 *   output: 'button button--blue button--wide button--secondary'
 *
 * If item is an array, item[0] is the name and item[1] is option
 *
 * Options:
 *   'value-only'     - returns the value of the prop instead of its name
 *   'name-and-value' - returns both as 'propName-propValue', e.g:
 *     input:  'button', props = {size: 3}, [['size', 'name-and-value']]
 *     output: 'button button--size-3'
 *
 * @returns - HTML class attribute (String): initial classes + new classes
 *
 *****************************************************/

export const getClassNamesFromProps = (classes, props, items) => {
	const baseClass = classes.split(" ")[0];
	const newClasses = [classes];

	items.forEach((item) => {
		let propName, option;
		if (Array.isArray(item)) [propName, option] = item;
		else propName = item;

		const propValue = props[propName];
		if (!propValue && propValue !== 0) return;

		let string;
		if (option === "value-only") string = propValue;
		else if (option === "name-and-value") string = `${propName}-${propValue}`;
		else string = propName;

		newClasses.push(`${baseClass}--${string}`);
	});

	return newClasses.join(" ");
};
