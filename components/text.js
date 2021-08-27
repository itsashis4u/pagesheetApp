import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

/**
 * Text component
 *
 * @export
 * @param {import('react-native').TextProps} props
 * @return {JSX.Element}
 */
export function Text(props) {
  return <RNText style={[styles.font, props.style]} {...props} />;
}

const styles = StyleSheet.create({
  font: {fontFamily: 'Manrope'},
});
