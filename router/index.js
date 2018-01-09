import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import DeckList from '../components/DeckList';
import Deck from '../components/Deck';
import Quiz from '../components/Quiz';
import AddDeck from '../components/AddDeck';
import AddCard from '../components/AddCard';


const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'All Decks'
    }
  },

  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  }
})

export default Router = StackNavigator({
  Home:{
    screen: Tabs
  },

  Deck:{
    screen: Deck
  },

  Quiz:{
    screen: Quiz
  },

  AddCard:{
    screen: AddCard
  }
});
