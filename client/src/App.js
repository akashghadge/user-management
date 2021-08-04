import './App.css';
import { Route, Switch } from "react-router-dom"
import Login from './Components/Login';
import Screen2 from './Components/Screen2';
function App() {
	return (
		<>
			<Switch>
				<Route path='/' exact component={Login}></Route>
				<Route path='/user-add' exact component={Screen2}></Route>
			</Switch>
		</>
	);
}

export default App;
