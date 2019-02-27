import React from 'react';
import { Route, Switch } from 'react-router'
import Home from './containers/Home'
import Mobile from './containers/Mobile'
import RoomFull from './containers/RooomFull'
import RoomNotFound from './containers/RoomNotFound'


const Routes = () => (
  <div>
    <main>
     
        <Route exact path="/" component={Home} />
        <Route exact path="/m/:code" component={Mobile} />
        <Route exact path="/full" component={RoomFull} />
        <Route exact path="/not-found" component={RoomNotFound} />
     
    </main>
  </div>
)

export default Routes;