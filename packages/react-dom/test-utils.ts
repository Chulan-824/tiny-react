import { ReactElementType } from 'shared/ReactTypes';
// 不要从src下引入，因为之后测试用例引用代码是直接引用 react react-dom
// @ts-ignore
import { createRoot } from 'react-dom';

export function renderIntoDocument(element: ReactElementType) {
	const div = document.createElement('div');
	// element
	return createRoot(div).render(element);
}
