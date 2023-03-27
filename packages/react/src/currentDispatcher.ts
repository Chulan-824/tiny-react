import { Action } from 'shared/ReactTypes';

export interface Dispatcher {
	useState: <T>(initialState: () => T | T) => [T, Dispatch<T>];
}

const currentDispatcher: { current: Dispatcher | null } = {
	current: null
};

export type Dispatch<State> = (action: Action<State>) => void;

export const resolveDispatcher = (): Dispatcher => {
	const dispathcer = currentDispatcher.current;

	if (dispathcer === null) {
		throw new Error('Hook只能在函数组件中进行');
	}
	return dispathcer;
};

export default currentDispatcher;
