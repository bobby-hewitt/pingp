import React from 'react';
import { Route } from 'react-router'
import PingPHost from './containers/PingP/Home'
import HostConnection from './containers/General/HostConnection'
import MobileConnection from './containers/General/MobileConnection'
import Mobile from './containers/PingP/Mobile'
import RoomFull from './containers/General/RooomFull'
import RoomNotFound from './containers/General/RoomNotFound'


const Routes = () => (
  <div>
    <main>   
        
        <Route path="/h" component={HostConnection} />
        <Route path="/m" component={MobileConnection} />
        <Route path="/join" component={MobileConnection} />
    	{/*PING P*/}
        <Route exact path="/pingp" component={PingPHost} />
        <Route exact path="/pingp/m/:code" component={Mobile} />
        <Route exact path="/pingp/full" component={RoomFull} />
        <Route exact path="/pingp/not-found" component={RoomNotFound} />     
    	{/*Other*/}
    	<Route exact path="/other" component={PingPHost} />
    </main>
  </div>
)

export default Routes;