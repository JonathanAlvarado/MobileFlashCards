import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION_TO_DECK } from '../actions';

function decks(state={}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
      break;
    case ADD_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };
      break;
    case ADD_QUESTION_TO_DECK:
      const newState = {...state};
      newState[action.title].questions.push(action.card);
      return newState;
    break;
    default:
      return state;
    }
}


export default decks;
