import { saveDeckTitle, addCardToDeck } from '../utils/api';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION_TO_DECK = 'ADD_QUESTION_TO_DECK';


export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export const addNewDeck = (title) => dispatch => (
  saveDeckTitle(title)
    .then(() => dispatch({
      type: ADD_DECK,
      title
    }))
);

export const addQuestionToDeck = (title, card) =>  dispatch=> (
    addCardToDeck(title, card)
      .then(() => {
        dispatch({
          type: ADD_QUESTION_TO_DECK,
          title,
          card
        })
      })
  )
