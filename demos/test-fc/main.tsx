import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);
	window.setNum = setNum;
	return <div>{num}</div>;
}

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(<App />);

console.log(React);
console.log(ReactDOM);
