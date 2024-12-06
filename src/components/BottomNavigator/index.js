import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image, // Import Image dari react-native
} from 'react-native';
import { Color, colors } from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';

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
        let iconSize = 24; // Default icon size

        if (label === 'Home') {
          iconSource = require('../../assets/icon_home.png'); // Ganti dengan path gambar yang sesuai
        } else if (label === 'Riwayat') {
          iconSource = require('../../assets/icon_history.png');
        } else if (label === 'KatalogHarga') {
          iconSource = require('../../assets/icon_katalogharga.png');
          iconSize = 30; // Ukuran ikon berbeda untuk KatalogHarga
        } else if (label === 'Account') {
          iconSource = require('../../assets/icon_profile.png');
          iconSize = 28; // Ukuran ikon berbeda untuk Account
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
              <Image
                source={iconSource}
                style={{
                  width: iconSize,
                  height: iconSize,
                  tintColor: isFocused ? colors.white : colors.primary,
                }}
                resizeMode="contain" // Mengatur mode resize
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
    backgroundColor: colors.secondary,
    height: 65,
 
    borderTopColor: Color.blueGray[300],
    justifyContent: 'space-around',
    margin:10,
    borderRadius:50
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: (isFocused) => ({
    backgroundColor: isFocused ? colors.primary : 'transparent',
    borderRadius: isFocused ? 20 : 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
