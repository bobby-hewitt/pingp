
const initialState = {
  roomCode: null,
  players:[],
  round: 0,
  isInPlay: false,
  responses: [],
  coords: {x:0,y:0,z:0},
  coords2: {x:0,y:0,z:0}
}

export default (state = initialState, action) => {
  // console.log('ACTION',action)
  switch (action.type) {
    case 'SET_ROOM_CODE':
      return {
        ...state,
        roomCode: action.payload,
      }
    case 'SET_COORDS_1':
      // console.log('setting coords')
      return {
        ...state,
        coords: action.payload.coords,
      }
    case 'SET_COORDS_2':
      // console.log('setting coords')
      return {
        ...state,
        coords2: action.payload.coords,
      }
    case 'ADD_PLAYER':
      let newPlayers = Object.assign([], state.players)
      newPlayers.push(action.payload)
      // console.log(newPlayers)
      return {
        ...state,
        players: newPlayers,
      }
    case 'START_ROUND_HOST':
      return {
        ...state,
        responses: [],
        isInPlay: true,
        round: state.round + 1,
      }
    case 'SET_RESPONSES':
      let responses = Object.assign([], state.responses).sort(function(obj1, obj2) {
      // Ascending: first age less than the previous
      return obj1.time - obj2.time;
    });
      responses.push(action.payload)
      return {
        ...state,
        responses,
      }
    default:
      return state
  }
}

