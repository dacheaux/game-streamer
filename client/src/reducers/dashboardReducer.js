const initialState = {
  broadcasters: [],
  games: [],
  status: "loading",
  error: "",
  divHeight: 0,
  frameHeight: 0
}

window.divh = window.frameh = 0;

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_DASHBOARD':
      const requested = Object.assign({}, state, {
        status: action.status
      })
      return requested
    case 'FETCH_BROADCASTERS':
      const broadcasters = Object.assign({}, state, {
        status_broadcasters: action.status,
        broadcasters: action.payload
      })
      return broadcasters
    case 'FETCH_GAMES':
      const games = Object.assign({}, state, {
        status_games: action.status,
        games: action.payload
      })
      return games
    case 'FETCH_DASHBOARD_FAILURE':
      const failed = Object.assign({}, state, {
        status: action.status,
        error: action.error
      })
      return failed
    case 'DIV_HEIGHT':
      window.specialDivHeight = action.height;
      window.divh++;
      return Object.assign({}, state, {divHeight: action.height})
    case 'FRAME_HEIGHT':
      window.specialFrameHeight = action.height;
      window.frameh++;
      return Object.assign({}, state, {frameHeight: action.height})
    default:
      return state
  }
}