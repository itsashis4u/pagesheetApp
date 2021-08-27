import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../components/text';

export function ScreenTwo({navigation}) {
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate('One')}>
        <Text style={styles.button}>Take me back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    color: 'royalblue',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
