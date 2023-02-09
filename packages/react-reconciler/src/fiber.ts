import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkType } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	tag: WorkType;
	key: Key;
	stateNode: any;
	type: any;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	ref: Ref;

	pendingProps: Props;
	memoizedProps: Props | null;
	memoizedState: any;

	alternate: FiberNode | null;
	flags: Flags;
	updateQueue: unknown;

	constructor(tag: WorkType, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key;
		this.stateNode = null; // 对于 HostComponent div 的话 保存的就是 div 的 dom
		this.type = null; // 一般来讲和 ReactElement 组件的 type 一致

		// 构成树状结构
		this.return = null; // 指向父节点
		this.sibling = null; // 指向下一个兄弟节点
		this.child = null; // 指向第一个子节点
		this.index = null; // fiber 在兄弟节点中的索引, 如果是单节点默认为 0

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps; // 输入属性, 从 ReactElement 对象传入的 props,用于和 memoizedProps 比较可以得出属性是否变动
		this.memoizedProps = null; // 上一次生成子节点时用到的属性, 生成子节点之后保持在内存中
		this.memoizedState = null;

		this.alternate = null;
		this.flags = NoFlags;
		this.updateQueue = null;
	}
}

export class FiberRootNode {
	container: Container; // 配置ts配置文件来引入类型文件是因为不能限制类型文件在reconciler包中
	current: FiberNode;
	finishWork: FiberNode | null; // 递归完成后的 hostRootFiber

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}

	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;

	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};
