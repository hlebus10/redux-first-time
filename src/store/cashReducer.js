const defaultState = {
    cash: 5,
  }

  const ADD_CASH = 'ADD_CASH';
  const GET_CASH = 'GET_CASH';

export const cashReducer = (state = defaultState, action) => {
    switch(action.type) {
      case ADD_CASH:
        return {...state, cash: state.cash + action.payload}
      case GET_CASH:
        if (action.playload >= state.cash) {
          return state;
        }
        return {...state, cash: state.cash - action.payload}
  
      default:
        return state
    }
  }