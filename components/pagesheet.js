import * as React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const springConfig = {
  damping: 80,
  stiffness: 500,
};

const {width, height: deviceHeight} = Dimensions.get('window');
const DEFAULT_HEIGHT = (2 * deviceHeight) / 3;

/**
 *
 *
 * @export
 * @param {Object} props
 * @param {function} props.onClose
 * @param {JSX.Element} props.children
 * @param {import('react-native').ViewStyle} props.style
 * @param {number} props.height
 * @return {*}
 */

export function PageSheet({
  onClose = () => {},
  children,
  style,
  height = DEFAULT_HEIGHT,
}) {
  const initialTop = Platform.OS === 'ios' ? deviceHeight - height : 150;

  const handleClose = () => {
    setTimeout(onClose, 300);
  };

  // Initialize the height of the page sheet
  const top = useSharedValue(deviceHeight);

  // Animate the top position of the page sheet
  const topStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, springConfig),
    };
  });

  // animate the background color of the overlay when scrolling downs
  const wrapperStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        top.value,
        [initialTop, deviceHeight],
        ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)'],
      ),
    };
  });

  // animate the top value when the user drags the sheet
  const handleGesture = useAnimatedGestureHandler({
    onStart(e, context) {
      // keep track of the initial position
      context.initialTop = top.value;
    },
    onActive(e, context) {
      if (e.translationY > 0) {
        top.value = context.initialTop + e.translationY;
      }
    },
    onEnd() {
      // If the user dragged more than 60% of the device height, close the sheet
      if (top.value > deviceHeight * 0.6) {
        top.value = deviceHeight;
        // close the sheet
        runOnJS(handleClose)();
      } else {
        // otherwise, reset the sheet to its initial position
        top.value = initialTop;
      }
    },
  });

  React.useEffect(() => {
    // set the initial position of the sheet
    top.value = withSpring(initialTop, springConfig);
  }, [top, initialTop, height]);

  // Using the SafeAreaContext to get the safe area insets
  const insets = useSafeAreaInsets();

  return (
    <Animated.View style={[styles.sheetWrapper, wrapperStyle]}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            topStyle,
          ]}>
          <View style={styles.divider} />
          <View
            style={[
              styles.wrapper,
              {paddingBottom: Math.max(insets.bottom, 16)},
              style,
            ]}>
            {children}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheetWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: 'white',
    height: '100%',
  },
  divider: {
    height: 6,
    width: width / 4,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 5,
    marginBottom: 5,
  },
});
