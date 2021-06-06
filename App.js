/**
 * OnBoard Screen for PaniApp.
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  useWindowDimensions,
} from 'react-native';

const backGroundColors = ['#D3A518', '#646b88', '#39405B', '#101a31'];
const data = [
  {
    key: 'OnBoardOne',
    title: 'Need Materials?',
    text: 'Select needed items from list and order it with your favourite shop or nearby shop',
    image: require('./src/assets/screwdriverandspanner.png'),
  },
  {
    key: 'OnBoardTwo',
    title: 'Need Tradesman?',
    text: 'Search for nearby technicians and laborers',
    image: require('./src/assets/tools.png'),
  },
  {
    key: 'OnBoardThree',
    title: 'Need Material Estimate?',
    text: 'Select the number of materials and get estimate with just a click',
    image: require('./src/assets/screwdriver.png'),
  },
  {
    key: 'OnBoardFour',
    title: 'Find any services near you',
    text: 'Select services from a vast list',
    image: require('./src/assets/paint-brush.png'),
  },
];

const Circles = ({scrollX, width}) => (
  <View style={styles.circleContainer}>
    {data.map((_, index) => {
      const scale = scrollX.interpolate({
        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
        outputRange: [1, 1.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = scrollX.interpolate({
        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
        outputRange: [0.4, 1, 0.4],
        extrapolate: 'clamp',
      });
      return (
        <Animated.View
          key={`circle-${index}`}
          style={[
            styles.circle,
            {opacity},
            {
              transform: [
                {
                  scale,
                },
              ],
            },
          ]}
        />
      );
    })}
  </View>
);

const BackGround = ({scrollX, width}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: backGroundColors.map((_, index) => index * width),
    outputRange: backGroundColors.map(bg => bg),
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  );
};

const Square = ({scrollX, width, height}) => {
  const sqRotValue = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = sqRotValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['45deg', '-45deg', '-45deg'],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.square,
        {
          width: width * 2,
          height: width * 2,
          top: -width * 0.35,
          left: -width * 0.5,
          transform: [{perspective: 400}, {translateY: -width}, {rotate}],
        },
      ]}
    />
  );
};

const App = () => {
  const {width, height} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderScreens = ({item, index}) => {
    return (
      <View style={[styles.screen, {width}]} key={item.id}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={[styles.image, {width: width * 0.4, height: width * 0.4}]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackGround scrollX={scrollX} width={width} />
      <Square scrollX={scrollX} width={width} height={height} />
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={32}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderScreens}
      />
      <Circles scrollX={scrollX} width={width} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {paddingBottom: 10},
  imageContainer: {flex: 0.7, justifyContent: 'center'},
  image: {resizeMode: 'contain'},
  textContainer: {flex: 0.3, alignItems: 'center', padding: 10},
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
  },
  square: {
    backgroundColor: '#fff1c9',
    borderRadius: 80,
    position: 'absolute',
  },
  circleContainer: {position: 'absolute', bottom: 20, flexDirection: 'row'},
  circle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    margin: 10,
    backgroundColor: '#fff',
  },
});

export default App;
