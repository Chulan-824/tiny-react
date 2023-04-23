import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);
	window.setNum = setNum;
	return <div onClick={() => setNum(num + 1)}>{num}</div>;
}

function Child() {
	return <span>tiny-react</span>;
}

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(<App />);
