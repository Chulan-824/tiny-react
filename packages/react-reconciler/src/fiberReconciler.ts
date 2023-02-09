import { Container } from 'hostConfig';
import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';
import { scheduleUpdateOnFiber } from './workLoop';
import { HostRoot } from './workTags';

export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null); // hostRootFiber
	const root = new FiberRootNode(container, hostRootFiber); // fiberRootNode

	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}

export function updateContainer(element: ReactElementType | null, root) {
	const hostRootFiber = root.current;
	const update = createUpdate<ReactElementType | null>(element);

	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	scheduleUpdateOnFiber(hostRootFiber);

	return element;
}
