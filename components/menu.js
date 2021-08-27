import * as React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from './text';

function Row({index, icon, title, route, description, onPress = () => {}}) {
  const handlePress = () => {
    onPress({route, index, title});
  };
  return (
    <TouchableOpacity style={styles.row} onPress={handlePress}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={icon} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function Menu({list = [], onItemPress = () => {}}) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      bounces={false}
      data={list}
      renderItem={({item, index}) => (
        <Row {...item} index={index} onPress={onItemPress} />
      )}
      keyExtractor={item => item.title}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    />
  );
}

const styles = StyleSheet.create({
  itemSeparator: {height: 1, backgroundColor: 'white'},
  description: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  image: {height: 40, width: 40},
  imageWrapper: {
    marginRight: 10,
  },
  row: {
    padding: 10,
    backgroundColor: '#f8f5f8',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
