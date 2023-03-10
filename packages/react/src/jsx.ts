import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';

// ReactElement
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'Chulan'
	};
	return element;
};

export const jsx = function (
	type: ElementType,
	config: any,
	...maybeChildren: any
) {
	let key = null;
	let ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];

		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}

		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;

	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = function (
	type: ElementType,
	config: any
	// ...maybeChildren: any
) {
	let key = null;
	let ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];

		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}

		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	// const maybeChildrenLength = maybeChildren.length;
	// console.log(config, 'config');

	// console.log(maybeChildren, 'maybeChildren');
	// console.log(maybeChildrenLength, 'maybeChildrenLength jsxDEV');

	// if (maybeChildrenLength) {
	// 	if (maybeChildrenLength === 1) {
	// 		props.children = maybeChildren[0];
	// 	} else {
	// 		props.children = maybeChildren;
	// 	}
	// }

	return ReactElement(type, key, ref, props);
};
