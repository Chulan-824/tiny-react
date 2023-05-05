import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);
	const arr =
		num % 2 === 0
			? [
					<ul>
						<li key="1">1</li>
						<li key="2">2</li>
						<li key="3">3</li>
						123
					</ul>
			  ]
			: [
					<ul>
						<li key="3">3</li>
						<li key="2">2</li>
						<li key="1">1</li>
						321
					</ul>
			  ];

	return (
		<ul onClickCapture={() => setNum(num + 1)}>
			{arr}
			<li>4</li>
			<li>5</li>
		</ul>
	);
}

function Child() {
	return <span>big-react</span>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
