import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import PrivateRoute from "./components/HOC/PrivateRoute";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<PrivateRoute path="/" exact component={Home} />
					<Route path="/signin" component={SignIn} />
					<Route path="/signup" component={SignUp} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
