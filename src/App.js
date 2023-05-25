// import Navbar from './components/Navbar';

import { useBankContext } from "./BankContext/BankAppContext";
import Signup from "./components/Signup";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
// import Home from './components/Home';
import PrivateRoute from "./components/PrivateRoute";
import LoginState from "./components/LoginState";
import Profile from "./components/Profile";
import Creating from "./components/Creating";
import Logout from "./components/Logout";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
// import Home from './components/sidebar/Home';
import Credit from "./components/sidebar/Credit";
import Debit from "./components/sidebar/Debit";

function App() {
  const { handleModal } = useBankContext();
  return (
    <div className="App min-h-screen" onClick={handleModal}>
      {/* <Navbar /> */}

      <Switch>
        <Route exact path="/" component={LandingPage} />

        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/register" component={Signup} />

        <Route path="/loginState" component={LoginState} />
        <Route path="/login" component={Login} />

        <Route path="/Logout" component={Logout} />

        <Route path="/creating" component={Creating} />
        <Route exact path="/sidebar" component={Sidebar} />
        {/* <Route exact path='/sidebar' component={Home} /> */}
        <Route exact path="/sidebar/credit" component={Credit} />
        <Route exact path="/sidebar/debit" component={Debit} />

        {/* <Route path='/sidebar/settings' component={Sidebar} /> */}
      </Switch>

      {/* {isOpen ? <div className='overlay' onClick={handleModal}></div> : null} */}
    </div>
  );
}

export default App;
