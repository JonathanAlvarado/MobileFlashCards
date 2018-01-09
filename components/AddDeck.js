import React, { Component } from 'react';
import { View, StyleSheet, Text, Keyboard, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { red } from '../utils/colors';
import { addNewDeck } from '../actions';


class AddDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add New Deck'
    }
  }

  state = {
    deckTitle: '',
  }

  onTitleChange = (title) => {
    this.setState({
      deckTitle: title
    });
  }

  submit = () => {
    const { navigation } = this.props;
    this.props.dispatch(addNewDeck(this.state.deckTitle)).then(() => {
      navigation.navigate(
        'Deck',
        {deck: {title:this.state.deckTitle, questions:[]}}
      );
    });
  }

  render() {
    return(
      <KeyboardAvoidingView behavior='padding'>
        <FormLabel>Enter new deck name</FormLabel>
        <FormInput
          onChangeText={this.onTitleChange.bind(this)}
          placeholder='New deck name'
          value={this.state.deckTitle}
        />

        <Button
          title='Create Deck'
          backgroundColor={red}
          onPress={this.submit}
        />
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddDeck);
