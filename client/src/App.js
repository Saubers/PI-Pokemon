import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from '../src/components/LandingPage/LandingPage'
import Home from '../src/components/Home/Home'
import Detail from './components/Details/Detail';
import PokemonCreate from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={Detail}/>
        <Route exact path="/create" component={PokemonCreate}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
