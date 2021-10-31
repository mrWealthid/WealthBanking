import Navbar from './components/Navbar';
import Shopify from './components/Shopify';
import { useBankContext } from './BankContext/BankAppContext';
import Signup from './components/Signup';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import LoginState from './components/LoginState';
import Profile from './components/Profile';

function App() {
  const { data } = useBankContext();
  return (
    <div className='App min-h-screen'>
      <Navbar />

      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/create' component={Signup} />

        <Route path='/loginState' component={LoginState} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/profile' component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
