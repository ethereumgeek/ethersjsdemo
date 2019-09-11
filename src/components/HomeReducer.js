//import update from 'immutability-helper';

const emptyState = {
  transactionStatus: "not started"
}

const HomeReducer = (state = emptyState, action) => {
  switch (action.type) {
    case "TX_STATUS": {
      return {...state, transactionStatus: action.payload};
    }
    default: {
      return state
    }
  }
}

export default HomeReducer