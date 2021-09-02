import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from '../src/components/LandingPage/LandingPage'
import Home from '../src/components/Home/Home'

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
