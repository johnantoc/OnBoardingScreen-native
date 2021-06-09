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
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Onboarding Slides.
const slides = [
  {
    key: 'OnBoardOne',
    title: 'Need Materials?',
    text: 'Select needed items from list and order it with your favourite shop or nearby shop',
    image: require('./src/assets/screwdriverandspanner.png'),
    backGroundColor: '#575E6E',
  },
  {
    key: 'OnBoardTwo',
    title: 'Need Tradesman?',
    text: 'Search for nearby technicians and laborers',
    image: require('./src/assets/tools.png'),
    backGroundColor: '#3F475A',
  },
  {
    key: 'OnBoardThree',
    title: 'Need Material Estimate?',
    text: 'Select the number of materials and get estimate with just a click',
    image: require('./src/assets/screwdriver.png'),
    backGroundColor: '#273045',
  },
  {
    key: 'OnBoardFour',
    title: 'Find services near you',
    text: 'Select services from a variety of vendors',
    image: require('./src/assets/paint-brush.png'),
    backGroundColor: '#101a31',
  },
];

const Circles = ({scrollX, width}) => (
  <View style={styles.circleContainer}>
    {slides.map((_, index) => {
      const scale = scrollX.current?.interpolate({
        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
        outputRange: [1, 1.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = scrollX.current?.interpolate({
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
                  scale: scale ? scale : 1,
                },
              ],
            },
          ]}
        />
      );
    })}
  </View>
);

const BackGround = ({scrollX, inputRange}) => {
  const backgroundColor = scrollX.current?.interpolate({
    inputRange: inputRange,
    outputRange: slides.map(slide => slide.backGroundColor),
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  );
};

const Square = ({scrollX, width}) => {
  const sqRotValue = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX.current || 0, width),
      new Animated.Value(width),
    ),
    1,
  );

  const rotate = sqRotValue.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [
      '45deg',
      '36deg',
      '27deg',
      '18deg',
      '9deg',
      '0deg',
      '-9deg',
      '-18deg',
      '-27deg',
      '-36deg',
      '-45deg',
    ],
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

const DoneButton = ({scrollX, width, onDone, inputRange}) => {
  const translateY = scrollX.current?.interpolate({
    inputRange: inputRange,
    outputRange: slides.map((_, index) =>
      index === slides.length - 1 ? 0 : width,
    ),
  });
  return (
    <Animated.View
      style={[
        styles.buttonCircleContainer,
        {transform: [{translateY: translateY ? translateY : 0}]},
      ]}>
      <Pressable
        onPress={onDone}
        style={[styles.buttonCircle]}
        android_ripple={{color: '#000', radius: width}}>
        <Icon name="check" color="#39405B" size={24} />
      </Pressable>
    </Animated.View>
  );
};

const App = () => {
  const {width} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0));
  const inputRange = slides.map((_, index) => index * width);

  const renderScreens = ({item}) => {
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

  const onDone = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <BackGround scrollX={scrollX} inputRange={inputRange} />
      <Square scrollX={scrollX} width={width} />
      <Animated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX.current}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={32}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderScreens}
      />
      <Circles scrollX={scrollX} width={width} />
      <DoneButton
        scrollX={scrollX}
        width={width}
        onDone={onDone}
        inputRange={inputRange}
      />
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
    backgroundColor: '#f7f7f7',
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
  buttonCircleContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonCircle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03DAC6',
  },
});

export default App;
