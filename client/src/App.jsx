import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";
import SessionProvider from "./providers/SessionProvider";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import About from "./components/About/About";
import Register from "./components/Register/Register";
import Background from "./components/Background/Background";
import Documentation from "./components/Documentation/Documentation";

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
          <Header />
          <Background />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/about" exact component={About} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/docs" exact component={Documentation} />
          <Route path="/*" exact component={Home} />
        </Router>
      </SessionProvider>
    </div>
  );
}

export default App;
