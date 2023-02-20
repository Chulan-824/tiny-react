import { FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags, Placement } from './fiberFlags';
import { appendChildToContainer, Container } from './hostConfig';
import { HostComponent, HostRoot, HostText } from './workTags';

let nextEffect: FiberNode | null = null;

export const commitMutationEffects = (finishWork: FiberNode) => {
	nextEffect = finishWork;

	while (nextEffect !== null) {
		const child: FiberNode | null = nextEffect.child;
		if (
			(nextEffect.subtreeFlags & MutationMask) !== NoFlags &&
			child !== null
		) {
			nextEffect = child;
		} else {
			// 向上遍历 DFS
			up: while (nextEffect !== null) {
				commitMutationEffectsOnFiber(nextEffect);
				const sibling: FiberNode | null = nextEffect.sibling;

				if (sibling !== null) {
					nextEffect = sibling;
					break up;
				}

				nextEffect = nextEffect.return;
			}
		}
	}
};

const commitMutationEffectsOnFiber = (finishWork: FiberNode) => {
	const flags = finishWork.flags;

	if ((flags & Placement) !== NoFlags) {
		commitPlacement(finishWork);
		// 将 Placement 从 flags 中移出
		finishWork.flags &= ~Placement;
	}

	// flags Update

	// flags ChildDeletion
};

const commitPlacement = (finishWork: FiberNode) => {
	// finishWork - DOM
	if (__DEV__) {
		console.warn('执行Placement操作', finishWork);
	}
	// parent DOM
	const hostParent = getHostParent(finishWork);

	// finishWork DOM append parent DOM
	appendPlacementNodeIntoContainer(finishWork, hostParent);
};

function getHostParent(fiber: FiberNode) {
	const parent = fiber.parent;

	while (parent) {
		const parentTag = parent.tag;
		// HostComponent
		if (parentTag === HostComponent) {
			return parent.stateNode as Container;
		}
		if (parentTag === HostRoot) {
			return (parent.stateNode as FiberRootNode).container;
		}

		parent = parent.return;
	}

	if (__DEV__) {
		console.warn('未找到host parent');
	}
}

function appendPlacementNodeIntoContainer(
	finishedWork: FiberNode,
	hostParent: Container
) {
	// 找到 fiber 对应宿主环境的 host node
	if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
		appendChildToContainer(finishedWork.stateNode, hostParent);
		return;
	}
	const child = finishedWork.child;
	if (child !== null) {
		appendPlacementNodeIntoContainer(child, hostParent);
		let sibling = child.sibling;

		while (sibling !== null) {
			appendPlacementNodeIntoContainer(sibling, hostParent);
			sibling = sibling.sibling;
		}
	}
}
