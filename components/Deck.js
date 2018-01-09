import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { white, gray, blue, purple } from '../utils/colors';
import { connect } from 'react-redux';


class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deck.title
    }
  }

  render() {
    const navigation = this.props.navigation;
    const deck = this.props.deck;

    return(
      <View style={styles.deck}>
        <View style={{marginTop:100}}>
          <Text style={[styles.text, {fontSize: 40, fontWeight: 'bold'}]}>
            {deck.title}
          </Text>
          <Text style={[styles.text, {fontSize: 18, color: gray}]}>
            {deck.questions.length} cards
          </Text>
        </View>

        <View style={{marginTop:40}}>
          <TouchableHighlight
            style={[styles.button, {borderWidth: 2, borderColor: purple}]}
            onPress={() =>navigation.navigate(
              'AddCard',
              {deck}
            )}
          >
            <Text style={{fontSize:20, color: purple}}>
              Add Card
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, {backgroundColor: blue, borderWidth: 2, borderColor: blue}]}
            onPress={() => navigation.navigate(
              'Quiz',
              { title: 'Quiz on ' + deck.title, questions: deck.questions }
            )}
          >
            <Text style={{fontSize:20, color: white}}>
              Start Quiz
            </Text>
          </TouchableHighlight>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
  }
})

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    deck: state[deck.title],
  }
}


export default connect(mapStateToProps)(Deck);
