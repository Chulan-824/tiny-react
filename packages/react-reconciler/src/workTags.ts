export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 3; // 挂载的根节点xxx ReactDOM.render(xxx)
export const HostComponent = 5; // 元素节点对应的 FiberNode 比如 div p 标签
export const HostText = 6; // <div>123</div> 123文本的 FiberNode
