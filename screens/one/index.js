import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Menu} from '../../components/menu';
import {PageSheet} from '../../components/pagesheet';
import {Text} from '../../components/text';
import {list} from './constants';

export function ScreenOne({navigation}) {
  const [openSheet, toggleSheet] = React.useState(false);

  function handlePress() {
    toggleSheet(true);
  }

  function handleItemPress({route}) {
    toggleSheet(false);
    navigation.navigate('Two');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.button}>Open Sheet</Text>
      </TouchableOpacity>
      {openSheet ? (
        <PageSheet
          style={styles.sheet}
          onClose={() => {
            toggleSheet(false);
          }}>
          <Menu list={list} onItemPress={handleItemPress} />
        </PageSheet>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    color: 'royalblue',
  },
  sheet: {
    backgroundColor: '#f8f5f8',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
