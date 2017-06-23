import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Signin from '../pages/Signin';
import Auth from '../middleware/Auth';
import Layout from '../component/layout/Layout';
import Home from '../pages/Home';

export default (
    <Route>
        <Route path='/' component={Layout}>
            <IndexRoute component={Auth(Home)} />
        </Route> 
        <Route path="/signin" component={Auth(Signin)} />
    </Route>
)