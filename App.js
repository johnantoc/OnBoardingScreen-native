/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';

const data = [
  {
    id: '1',
    name: 'First',
    color: 'red',
  },
  {
    id: '2',
    name: 'Two',
    color: 'green',
  },
  {
    id: '3',
    name: 'Three',
    color: 'blue',
  },
  {
    id: '4',
    name: 'Four',
    color: 'yellow',
  },
];

const App = () => {
  const {width, height} = useWindowDimensions();

  const scrollHandler = useAnimatedScrollHandler(() => {
    onscroll: () => {};
  });

  const renderScreens = ({item, index}) => {
    return (
      <View
        style={[styles.screen, {width, height, backgroundColor: item.color}]}
        key={item.id}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <Text>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderScreens}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    // backgroundColor: 'green',
  },
});

export default App;
