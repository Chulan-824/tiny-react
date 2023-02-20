import { beginWork } from './beginWork';
import { commitMutationEffects } from './commitWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags } from './fiberFlags';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {}, null);
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// TODO 调度功能
	// 从当前更新的fiber 一直向上遍历直到 fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (e) {
			if (__DEV__) {
				console.warn('workLoop发生错误', e);
			}
			workInProgress = null;
		}
	} while (true);

	const finishWork = root.current.alternate;
	root.finishWork = finishWork;

	// wip fiberNode 树 树种的 Flags
	commitRoot(root);
}

function commitRoot(root: FiberNode) {
	const finishWork = root.finishWork;

	if (finishWork === null) {
		return;
	}

	if (__DEV__) {
		console.warn('commit阶段开始', finishWork);
	}

	// 重置
	root.finishWork = null;

	// 判断是否存在3个子阶段需要执行的操作
	// root flags root subtreeFlags
	const subtreeHasEffect = (finishWork.subtreeFlags & MutationMask) !== NoFlags;
	const rootHasEffect = (finishWork.flags & MutationMask) !== NoFlags;

	if (subtreeHasEffect || rootHasEffect) {
		// beforeMutation
		// mutation
		commitMutationEffects(finishWork);
		root.current = finishWork;
		// layout
	} else {
		root.current = finishWork;
	}
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	// 开始工作后保留原来属性
	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		// 没有子 fiber 了 递归到最后一层
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		completeWork(node);
		const sibling = node.sibling;

		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
