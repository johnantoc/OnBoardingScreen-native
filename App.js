/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const data = [
  {
    id: '1',
    name: 'First',
  },
  {
    id: '1',
    name: 'Two',
  },
  {
    id: '1',
    name: 'Three',
  },
  {
    id: '1',
    name: 'Four',
  },
];

const App = () => {
  const renderScreens = (item, index) => {
    return (
      <View style={[styles.screen, StyleSheet.absoluteFillObject]}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={data} renderItem={renderScreens} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
