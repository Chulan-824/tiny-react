import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import {
	Fragment,
	FunctionComponent,
	HostComponent,
	WorkTag
} from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
import { Lane, Lanes, NoLane, NoLanes } from './fiberLanes';

export class FiberNode {
	tag: WorkTag;
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
	subtreeFlags: Flags;
	updateQueue: unknown;
	deletions: FiberNode[] | null;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key;
		this.stateNode = null; // 对于 HostComponent div 的话 保存的就是 div 的 dom
		this.type = null; // 一般来讲和 ReactElement 组件的 type 一致

		// 构成树状结构
		this.return = null; // 指向父节点
		this.sibling = null; // 指向下一个兄弟节点
		this.child = null; // 指向第一个子节点
		this.index = 0; // fiber 在兄弟节点中的索引, 如果是单节点默认为 0

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps; // 输入属性, 从 ReactElement 对象传入的 props,用于和 memoizedProps 比较可以得出属性是否变动
		this.memoizedProps = null; // 上一次生成子节点时用到的属性, 生成子节点之后保持在内存中
		this.memoizedState = null;

		this.alternate = null; // 指向内存中的另一个fiber, 每个被更新过fiber节点在内存中都是成对出现(current和workInProgress)
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
		this.updateQueue = null;
		this.deletions = null;
	}
}

export interface PendingPassiveEffects {
	unmount: Effect[];
	update: Effect[];
}

export class FiberRootNode {
	container: Container; // 配置ts配置文件来引入类型文件是因为不能限制类型文件在reconciler包中
	current: FiberNode;
	finishedWork: FiberNode | null; // 递归完成后的 hostRootFiber
	pendingLanes: Lanes;
	finishedLane: Lane;

	pendingPassiveEffects: PendingPassiveEffects;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
		this.pendingLanes = NoLanes;
		this.finishedLane = NoLane;

		this.pendingPassiveEffects = {
			unmount: [],
			update: []
		};
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
		wip.subtreeFlags = NoFlags;
		wip.deletions = null;
	}

	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;

	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};

export function createFiberFromElement(element: ReactElementType) {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;

	if (typeof type === 'string') {
		// <div /> type: 'div'
		fiberTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型', element);
	}

	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}

export function createFiberFromFragment(elements: any[], key: Key): FiberNode {
	const fiber = new FiberNode(Fragment, elements, key);
	return fiber;
}
