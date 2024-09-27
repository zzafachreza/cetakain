import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function BottomNavigator({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const isFocused = useIsFocused();

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {
              key: 0
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = '';
        if (label === 'Home') {
          iconName = 'home';
        } else if (label === 'Riwayat') {
          iconName = 'refresh-circle';
        } else if (label === 'KatalogHarga') {
          iconName = 'reader';
        } else if (label === 'Account') {
          iconName = 'person';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            <View style={styles.iconContainer(isFocused)}>
              <Icon
                type="ionicon"
                name={iconName}
                size={24}
                color={isFocused ? colors.white : colors.primary}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 65,
    borderTopWidth: 1,
    borderTopColor: Color.blueGray[300],
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: isFocused => ({
    backgroundColor: isFocused ? colors.primary : 'transparent',
    borderRadius: isFocused ? 20 : 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
