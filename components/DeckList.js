import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import TopDeck from './TopDeck';


class DeckList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Decks'
    }
  }

  state = {
    isAppReady: false,
  }

  componentDidMount() {
    getDecks()
      .then((decks) =>{
        this.props.dispatch(receiveDecks(decks))
        this.setState({
          isAppReady: true
        });
      })
  }

  render() {
    const { decks, navigation } = this.props;
    const { isAppReady } = this.state;

    if (!isAppReady) {
      return <AppLoading />
    }

    return (
      <View style={styles.deck}>
        <FlatList
          data={this.props.decks}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TopDeck deck={item} navigation={navigation}/>
          )}
          >
        </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    marginTop: 10
  }
})

function mapStateToProps(state) {
  const decks = [];
  Object.keys(state).forEach((key) => {
    decks.push(state[key])
  })
  return{
    decks
  }
}


export default connect(mapStateToProps)(DeckList);
