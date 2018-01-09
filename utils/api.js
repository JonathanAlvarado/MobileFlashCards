import { AsyncStorage } from 'react-native';
import { setData, DECKS_STORAGE_KEY, QUESTIONS_STORAGE_KEY } from './helpers';


export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(setData);
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: [],
    }
  }));
}

export function getDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const decks = JSON.parse(results);
      return decks[title];
    });
}

export function addCardToDeck (title, card) {
  return getDeck(title)
    .then(result => result)
    .then(deck => {
      const { question, answer } = card;
      const newQuestions = deck.questions.concat({
        question,
        answer,
      });

      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
          title,
          questions: newQuestions
        }
      }));
    })
}
