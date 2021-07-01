import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// pages
import TutorialList from "./components/TutorialList";
import AddTutorial from "./components/AddTutorial";
import Tutorial from './components/Tutorial';

function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/tutorials"} className="navbar-brand">
        튜토리얼
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/tutorials"} className="nav-link">
            리스트
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            +추가
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/tutorials"]} component={TutorialList} />
        <Route exact path="/add" component={AddTutorial} />
        <Route path="/tutorials/:id" component={Tutorial} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
