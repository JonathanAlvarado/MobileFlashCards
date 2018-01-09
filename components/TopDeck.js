import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { white, gray, blue } from '../utils/colors';


export default function TopDeck ({ deck, navigation }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate(
          'Deck',
          { deck: deck }
        )}
        >
        <Text style={[styles.text, styles.title]}>{deck.title}</Text>
        <Text style={[styles.text, {color: gray}]}>{deck.questions.length} cards</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderBottomColor: blue,
    borderBottomWidth:5,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
