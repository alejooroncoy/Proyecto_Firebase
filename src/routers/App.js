import React from 'react';
import {Router, Route, Switch,Redirect} from 'react-router-dom';
import Home from '../containers/Home';
import Layout from '../components/Layout';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import Login from '../containers/Login';
import Register from '../containers/Register';
import RePassword from '../components/RePassword';
import User from '../containers/User';
import Carrito from '../containers/Carrito';
import NotFound from '../containers/NotFound';
import Product from '../containers/Product';
const App = () => {
    const history = createBrowserHistory();

    ReactGA.initialize('UA-000000-01');

    ReactGA.pageview(`${window.location.pathname} ${window.location.search}`);

    history.listen(location => {
    ReactGA.pageview(`${window.location.pathname} ${window.location.search}`);
    })
    return(
    <Router history={history}>
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register}/>
                <Route exact path="/repassword" component={RePassword} />
                <Route exact path="/user/:id" component={User}/>
                <Route exact path="/carrito/:id" component={Carrito} />
                <Route exact path="/product/:id" component={Product} />
                <Redirect from="/home" to="/" />
                <Route component={NotFound}/>
            </Switch>
        </Layout>
    </Router>
)}
export default App; 