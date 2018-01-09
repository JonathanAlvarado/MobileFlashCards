import React, { Component } from 'react';
import { View, StyleSheet, Text, Keyboard, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { red } from '../utils/colors';
import { addQuestionToDeck } from '../actions';


class AddCard extends Component{

  state = {
    question: '',
    answer: '',
  }

  onQuestionChange = (question) => {
    this.setState({
      question
    });
  }

  onAnswerChange = (answer) => {
    this.setState({
      answer
    });
  }

  submit = () => {
    const { navigation } = this.props;
    const { question, answer } = this.state;
    const deck = navigation.state.params.deck;

    Keyboard.dismiss();

    this.props.dispatch(addQuestionToDeck(deck.title, {question, answer})).then(() => {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'Deck', params:{deck} })
        ]
      })
      navigation.dispatch(resetAction)
    })
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <FormLabel>Question for the Flashcard</FormLabel>
        <FormInput
          placeholder='Enter new question'
          onChangeText={this.onQuestionChange.bind(this)}
          value={this.state.question}
        />

        <FormLabel>Answer</FormLabel>
        <FormInput
          placeholder='Enter answer'
          onChangeText={this.onAnswerChange.bind(this)}
          value={this.state.answer}
        />

        <Button
          title='Add Card'
          backgroundColor={red}
          onPress={this.submit}
        />
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddCard);
