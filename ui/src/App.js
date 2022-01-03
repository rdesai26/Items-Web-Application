import './App.css';
import { Route, Switch } from "react-router-dom";
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Login from './pages/Login';
import {PrivateRoute} from './auth/PrivateRoute';
function App() {
  return (

    <div className="App">
      <Switch>
        <Route  path="/" component={Homepage} exact/>
          <Route  path="/items" component={Items} exact/>
          <PrivateRoute path="/items/add/" exact>
          <Add />
          </PrivateRoute>
          <Route  path="/items/login/" component={Login}exact />
          <PrivateRoute path="/items/edit/:id" exact>
        <Edit/>
      </PrivateRoute>
      </Switch>
    </div>

  );
}

export default App;
