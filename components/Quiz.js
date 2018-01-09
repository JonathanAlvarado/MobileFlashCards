import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { green, red, white, purple, lightPurp } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'


class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }

  state = {
    currentIndex: 0,
    right: 0,
    showAnswer: false
  }

  toggleAnswer = () => {
    this.setState((prevState) => (
      {showAnswer:!prevState.showAnswer}
    ));
  }

  rightAnswer = () => {
    let { currentIndex, right } = this.state;
    currentIndex += 1;
    right += 1;

    this.setState({
      currentIndex,
      right,
      showAnswer: false
    });
  }

  incorrectAnswer = () => {
    let { currentIndex } = this.state;
    currentIndex += 1;
    this.setState({
      currentIndex,
      showAnswer: false
    });
  }

  resetQuiz = () => {
    this.setState({
      currentIndex:0,
      right:0,
      showAnswer: false
    });
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }


  render() {
    const navigation = this.props.navigation;
    const questions = navigation.state.params.questions;
    const { currentIndex, showAnswer } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: white}}>
        {
          currentIndex === questions.length ?
          <View style={[styles.container, {marginTop: 130}]}>
            <Text style={{fontWeight: 'bold', fontSize: 28}}>Final Score:</Text>
            <Text style={{fontWeight: 'bold', fontSize: 28}}>You had {this.state.right} of {questions.length} correct answers</Text>
            <Button
              title='Try it again!'
              onPress={this.resetQuiz}
              style={{marginTop: 10}}
            />
            <Button
              title='Go decks'
              onPress={() => {
                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                  ]
                })
                navigation.dispatch(resetAction)
              }}
              style={{marginTop: 10}}
            />
          </View> :

          <View>
            <Text style={{fontWeight:'bold', fontSize:18, marginTop:10, padding:10}}>{currentIndex + 1} / {questions.length} </Text>
            <View style={[styles.container, {marginTop:10, marginBottom:120, padding:10}]}>
              <Text style={{fontWeight:'bold', fontSize:25}}>
                {
                  showAnswer ?
                    questions[currentIndex].answer :
                    questions[currentIndex].question
                }
              </Text>
            </View>

            <Button
              title={showAnswer ? 'Hide Answer' : 'Show Answer'}
              backgroundColor={lightPurp}
              onPress={this.toggleAnswer}
            />
            <Button
              title='Correct'
              backgroundColor={green}
              style={{marginTop:10}}
              onPress={this.rightAnswer}
            />
            <Button
              title='Incorrect'
              backgroundColor={red}
              style={{marginTop:10}}
              onPress={this.incorrectAnswer}
            />

          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center'
  }
})


export default connect()(Quiz);
