(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t){},104:function(e,t,n){},105:function(e,t,n){},106:function(e,t,n){},107:function(e,t,n){},108:function(e,t,n){},109:function(e,t,n){"use strict";n.r(t);var i,o=n(0),r=n.n(o),a=n(51),l=n(15),s=n(14),c=n(6),h=n(5),u=n(34),p=n(13),d={roomCode:null,players:[],round:0,isInPlay:!1,responses:[],coords:{x:0,y:0,z:0},coords2:{x:0,y:0,z:0}},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ROOM_CODE":return Object(p.a)({},e,{roomCode:t.payload});case"SET_COORDS_1":return Object(p.a)({},e,{coords:t.payload.coords});case"SET_COORDS_2":return Object(p.a)({},e,{coords2:t.payload.coords});case"ADD_PLAYER":var n=Object.assign([],e.players);return n.push(t.payload),Object(p.a)({},e,{players:n});case"START_ROUND_HOST":return Object(p.a)({},e,{responses:[],isInPlay:!0,round:e.round+1});case"SET_RESPONSES":var i=Object.assign([],e.responses).sort(function(e,t){return e.time-t.time});return i.push(t.payload),Object(p.a)({},e,{responses:i});default:return e}},b={room:null,playerNumber:null},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PLAYER_ROOM":return Object(p.a)({},e,{room:t.payload});case"SET_PLAYER_NUMBER":return Object(p.a)({},e,{playerNumber:t.payload});case"SET_SELF":return Object(p.a)({},e,{self:t.payload});default:return e}},m=n(55),O=Object(c.a)(),w=[m.a,Object(s.routerMiddleware)(O)],g=h.d.apply(void 0,[h.a.apply(void 0,w)].concat([])),v=Object(h.e)((i=O,Object(h.c)({router:Object(s.connectRouter)(i),player:f,host:y})),{},g),E=n(25),j=n(8),S=n(9),Y=n(11),D=n(10),P=n(12),R=(n(75),n(19)),C=n.n(R),k=C()("https://bping.herokuapp.com");function H(e,t){console.log("SUBSCRIBING TO PLAYER"),k.on("success-joining-room",function(e,t){console.log("success joining room",t),e.props.setPlayerRoom(t.result),e.props.setPlayerNumber(t.playerNumber)}.bind(this,e)),k.on("error-joining-room",function(){console.log("error joining room")}.bind(this)),k.on("start-round",function(e){console.log("starting round"),e.props.push("player/buzzer")}.bind(this,e)),k.on("room-full",function(e){e.props.push("full")}.bind(this,e))}function N(e,t){k.emit(e,t)}var _=C()("https://bping.herokuapp.com");function T(e,t){console.log("SUBSCRIBING TO HOST"),_.emit("host-connected"),_.on("room-code-generated",function(e,t){console.log("setting roomcode",t),e("setRoomCode",t)}.bind(this,t)),_.on("player-joined",function(e,t){console.log("player joined",t),e("addPlayer",t)}.bind(this,t)),_.on("start-round",function(e,t){_.emit("start-round")}.bind(this,e)),_.on("player-responded",function(e,t){console.log("player response"),e.props.setResponses(t)}.bind(this,e)),_.on("device-orientation-sending",function(e,t){1===t.coords.playerNumber?e("setCoords1",t):e("setCoords2",t)}.bind(this,t))}var X=function(e){return function(t){t({type:"SET_ROOM_CODE",payload:e})}},x=function(e){return function(t){t({type:"SET_COORDS_1",payload:e})}},M=function(e){return function(t){t({type:"SET_COORDS_2",payload:e})}},W=function(e){return function(t){t({type:"SET_RESPONSES",payload:e})}},L=function(e){return function(t){t({type:"ADD_PLAYER",payload:e})}},A=function(e){return console.log("start round host"),function(t){t({type:"START_ROUND_HOST",payload:e})}},B=function(e){return console.log("SETTING PLAYER ROOM"),function(t){t({type:"SET_PLAYER_ROOM",payload:e})}},I=function(e){return console.log("SETTING PLAYER Number"),function(t){t({type:"SET_PLAYER_NUMBER",payload:e})}},z=function(e){return function(t){t({type:"SET_SELF",payload:e})}},U=function(e){function t(e){return Object(j.a)(this,t),Object(Y.a)(this,Object(D.a)(t).call(this,e))}return Object(P.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.isHost?T(this,function(t,n){e.props[t](n)}):H(this)}},{key:"render",value:function(){return r.a.createElement("div",null)}}]),t}(o.Component),F=Object(l.connect)(function(e){return{}},function(e){return Object(h.b)({setRoomCode:X,setPlayerNumber:I,setResponses:W,setCoords1:x,setCoords2:M,setSelf:z,startRoundHost:A,addPlayer:L,setPlayerRoom:B,push:function(e){return Object(u.push)("/"+e)}},e)})(U),G=(n(104),function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(Y.a)(this,Object(D.a)(t).call(this,e))).ctx=null,n.playerHeight=100,n.playerWidth=7,n.playerX=20,n.playerY=window.innerHeight/2-n.playerHeight/2,n.player2X=window.innerWidth-n.playerX,n.player2Y=window.innerHeight/2-n.playerHeight/2,n.ballSize=5,n.ballX=window.innerWidth/2,n.ballY=window.innerHeight/2,n.ballDirX=1,n.ballDirY=1,n.ballYSpeed=Math.random()<.5?5:-5,n.ballXSpeed=Math.random()<.5?5:-5,n}return Object(P.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){var e=this.refs.canvas.getContext("2d");this.ctx=e,this.loop()}},{key:"setup",value:function(){this.ballX=window.innerWidth/2,this.ballYSpeed=Math.random()<.5?5:-5,this.ballXSpeed=Math.random()<.5?5:-5}},{key:"loop",value:function(){this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight),this.updateBall(),this.ballX<=this.playerX&&this.ballX>this.playerX-this.playerWidth?this.checkCollision():this.props.is2Player&&this.ballX+this.ballSize>=this.player2X&&this.ballX<this.player2X+this.playerWidth&&(console.log("checking player 2 collision"),this.checkPlayer2Collision()),this.drawBall(),this.updatePlayer(),this.drawPlayer(),this.props.is2Player&&this.updatePlayer2(),window.requestAnimationFrame(this.loop.bind(this))}},{key:"updateBall",value:function(){this.ballX=this.ballX+this.ballXSpeed*this.ballDirX,this.ballY=this.ballY+this.ballYSpeed*this.ballDirY,this.ballX>window.innerWidth-this.ballSize?this.props.is2Player?this.setup():this.ballDirX*=-1:this.ballX<0&&this.setup(),(this.ballY>window.innerHeight-this.ballSize||this.ballY<=0)&&(this.ballDirY*=-1)}},{key:"drawBall",value:function(){new function(e,t,n){this.x=null===e?0:e,this.y=null===t?0:t,this.r=null===n?0:n,this.draw=function(e){e.beginPath(),e.arc(this.x,this.y,this.r,0,2*Math.PI),e.fillStyle="#f7f7f7",e.fill()}}(this.ballX,this.ballY,this.ballSize).draw(this.ctx)}},{key:"updatePlayer",value:function(){this.playerY=this.playerY-this.props.yDir>window.innerHeight-this.playerHeight?window.innerHeight-this.playerHeight:this.playerY-this.props.yDir<=0?0:this.playerY-this.props.yDir}},{key:"updatePlayer2",value:function(){this.player2Y=this.player2Y-this.props.yDir2>window.innerHeight-this.playerHeight?window.innerHeight-this.playerHeight:this.player2Y-this.props.yDir2<=0?0:this.player2Y-this.props.yDir2}},{key:"drawPlayer",value:function(){function e(e,t,n,i){this.x=null===e?20:e,this.y=null===t?0:t,this.draw=function(o){o.rect(e,t,n,i),o.fillStyle="#f7f7f7",o.fill()}}(new e(this.playerX-this.playerWidth,this.playerY,this.playerWidth,this.playerHeight).draw(this.ctx),this.props.is2Player)&&new e(this.player2X-this.playerWidth,this.player2Y,this.playerWidth,this.playerHeight).draw(this.ctx)}},{key:"checkCollision",value:function(){var e=this.playerY,t=this.playerY+this.playerHeight/5,n=this.playerY+this.playerHeight,i=n-this.playerHeight/5;this.ballY>e&&this.ballY<n&&(this.ballXSpeed+=.5,this.ballDirX*=-1,this.ballY<t?this.ballYSpeed-=1:this.ballY>i&&(this.ballYSpeed+=1))}},{key:"checkPlayer2Collision",value:function(){var e=this.player2Y,t=this.player2Y+this.playerHeight/5,n=this.player2Y+this.playerHeight,i=n-this.playerHeight/5;this.ballY>e&&this.ballY<n&&(this.ballDirX*=-1,this.ballY<t?this.ballYSpeed-=1:this.ballY>i&&(this.ballYSpeed+=1))}},{key:"render",value:function(){return r.a.createElement("canvas",{ref:"canvas",id:"canvas",height:window.innerHeight,width:window.innerWidth})}}]),t}(o.Component)),J=function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(Y.a)(this,Object(D.a)(t).call(this,e))).speed=1,n.state={yDir:0,yDir2:0,is2Player:!1},n}return Object(P.a)(t,e),Object(S.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.state.yDir!==e.coords.y&&(console.warn("new dirs player 1",e.coords),this.setState({yDir:e.coords.y})),this.state.yDir2!==e.coords2.y&&(console.warn("new dirs player 2",e.coords),this.setState({yDir2:e.coords2.y,is2Player:!0}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"home"},r.a.createElement(F,{isHost:!0}),r.a.createElement(G,{yDir:this.state.yDir,yDir2:this.state.yDir2,is2Player:this.state.is2Player}),r.a.createElement("p",{className:"code"},"www.pingp.co/m/",this.props.roomCode?this.props.roomCode.toLowerCase():""))}}]),t}(o.Component),q=Object(l.connect)(function(e){return{roomCode:e.host.roomCode,coords:e.host.coords,coords2:e.host.coords2}},function(e){return Object(h.b)({push:function(e){return Object(s.push)(e)}},e)})(J),K=(n(105),function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(Y.a)(this,Object(D.a)(t).call(this,e))).state={xDir:0,yDir:0},n}return Object(P.a)(t,e),Object(S.a)(t,[{key:"componentWillMount",value:function(){var e,t,n=window.location.pathname.split("/")[2];if(n){var i={name:"",room:n.toUpperCase()};t=this,(e=i).id=k.id,t.props.setSelf(e),N("player-join-room",e)}}},{key:"componentWillReceiveProps",value:function(e){null===e.playerNumber&&null!==this.props.playerNumber&&this.props.push("/not-found")}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("deviceorientation",function(t){var n,i,o=e.findLimit(t.beta);if(o!==e.state.yDir){var r={y:o,playerNumber:e.props.playerNumber};console.log("sending oritentation",o),n=r,i=e,console.log(i),i.props.room&&N("device-orientation",{room:i.props.room.long,coords:n}),e.setState({yDir:o})}})}},{key:"findLimit",value:function(e){return e<-47.5?-10:e<-42.5?-9:e<-37.5?-8:e<-32.5?-7:e<-27.5?-6:e<-22.5?-5:e<-17.5?-4:e<-12.5?-3:e<-7.5?-2:e<-2.5?-1:e<2.5?0:e<7.5?1:e<12.5?2:e<17.5?3:e<22.5?4:e<27.5?5:e<32.5?6:e<37.5?7:e<42.5?8:e<47.5?9:10}},{key:"render",value:function(){return r.a.createElement("div",{className:"mobile"},r.a.createElement(F,null),r.a.createElement("div",{style:{transform:"translateY("+5*this.state.yDir+"px)"}},r.a.createElement("h3",null,"Player ",JSON.stringify(this.props.playerNumber)),r.a.createElement("p",null,"Tilt phone to control paddle")))}}]),t}(o.Component)),Q=Object(l.connect)(function(e){return{router:e.router,room:e.player.room,playerNumber:e.player.playerNumber}},function(e){return Object(h.b)({push:function(e){return Object(s.push)(e)},setSelf:z},e)})(K),V=(n(106),function(e){function t(){return Object(j.a)(this,t),Object(Y.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(P.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"roomFull"},r.a.createElement("h3",null,"Uh oh"),r.a.createElement("p",null,"This game is full :("))}}]),t}(o.Component)),Z=(n(107),function(e){function t(){return Object(j.a)(this,t),Object(Y.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(P.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"roomNotFound"},r.a.createElement("h3",null,"Oh no!"),r.a.createElement("p",null,"Couldn't find the game."))}}]),t}(o.Component)),$=function(){return r.a.createElement("div",null,r.a.createElement("main",null,r.a.createElement(E.a,{exact:!0,path:"/",component:q}),r.a.createElement(E.a,{exact:!0,path:"/m/:code",component:Q}),r.a.createElement(E.a,{exact:!0,path:"/full",component:V}),r.a.createElement(E.a,{exact:!0,path:"/not-found",component:Z})))};n(108);Object(a.render)(r.a.createElement(l.Provider,{store:v},r.a.createElement(s.ConnectedRouter,{history:O},r.a.createElement(r.a.Fragment,null,r.a.createElement($,null)))),document.getElementById("root"))},56:function(e,t,n){e.exports=n(109)},75:function(e,t,n){}},[[56,1,2]]]);
//# sourceMappingURL=main.64454e48.chunk.js.map