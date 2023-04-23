import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	return (
		<div>
			<Child></Child>
		</div>
	);
}

function Child() {
	return <span>11 tiny-react 22</span>;
}

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(<App />);

console.log(React);
console.log(ReactDOM);