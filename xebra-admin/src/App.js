import logo from "./logo.svg";
import "./App.css";
import Login from "./Screens/UserManagement/Login";
import UserManagement from "./Components/layouts/UserManagement";
import Navigation from "./Navigation";

function App() {
	return (
		<div className="App">
			{/* <h1>Login Page --- </h1> */}
			{/* <Login /> */}
			{/* <UserManagement /> */}
			<Navigation />
		</div>
	);
}

export default App;
