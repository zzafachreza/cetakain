import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import { Color, colors } from '../../utils/colors';

export default function BottomNavigator({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;

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
              key: 0,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Tentukan path gambar berdasarkan label
        let iconSource;
        let iconSize = 20; // Default icon size

        if (label === 'Home') {
          iconSource = require('../../assets/icon_home.png');
        } else if (label === 'Pricelist') {
          iconSource = require('../../assets/icon_pricelist.png');
        } else if (label === 'History') {
          iconSource = require('../../assets/icon_history.png');
          iconSize = 20;
        } else if (label === 'Account') {
          iconSource = require('../../assets/icon_profile.png');
          iconSize = 20;
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
            <Image
              source={iconSource}
              style={{
                width: iconSize,
                height: iconSize,
                tintColor: isFocused ? colors.primary : colors.white,
              }}
              resizeMode="contain"
            />
            <Text style={styles.label(isFocused)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    height: 65,
    borderTopColor: colors.white,
    justifyContent: 'space-around',
    margin: 10,
    borderRadius: 50,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: (isFocused) => ({
    fontSize: 12,
    color: isFocused ? colors.primary : colors.white,
    marginTop: 4,
  }),
});
