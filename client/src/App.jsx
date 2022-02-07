import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";
import SessionProvider from "./providers/SessionProvider";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </SessionProvider>
    </div>
  );
}

export default App;
