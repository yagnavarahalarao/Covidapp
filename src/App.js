import StateDetails from './components/StateDetails' 
import Header from './components/Header'
import DistrictDetails from './components/DistrictDetails'
import CovidDataIndianMap from './components/CovidDataIndianMap';
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Switch>
        <Route exact path='/' component={StateDetails} />
        <Route exact path='/district/:statename' component={DistrictDetails} />
        <Route exact path='/mapview' component={CovidDataIndianMap} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

