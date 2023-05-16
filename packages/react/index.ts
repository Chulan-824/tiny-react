import { Dispatcher, resolveDispatcher } from './src/currentDispatcher';
import { jsx, isValidElement as isValidElementFn } from './src/jsx';
import currentDispatcher from './src/currentDispatcher';

export const useState: Dispatcher['useState'] = (initialState) => {
	const dispatcher = resolveDispatcher();
	return dispatcher.useState(initialState);
};

export const useEffect: Dispatcher['useEffect'] = (create, deps) => {
	const dispatcher = resolveDispatcher();
	return dispatcher.useEffect(create, deps);
};

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
	currentDispatcher
};

export const version = '0.0.0';
// TODO 根据环境区分使用jsx/jsxDEV
export const createElement = jsx;

export const isValidElement = isValidElementFn;

// export default {
// 	version: '0.0.1',
// 	createElement: jsx
// };
