import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);
	window.setNum = setNum;
	return num === 3 ? <Child></Child> : <div>{num}</div>;
}

function Child() {
	return <span>tiny-react</span>;
}

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(<App />);
