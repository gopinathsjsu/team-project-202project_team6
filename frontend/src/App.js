import './App.css';
import Header from "./Header";
import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"



function App() {
  return (
    <Router>
        <div className = "app">
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/'>
              <Signup />
            </Route>
          </Switch>
        </div>
    </Router>

  );
}

export default App;
