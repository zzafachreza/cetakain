import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyRadio({
  label,
  label2,
  value,
  onPress,
  iconname = 'checkmark-circle',
  selectedColor = colors.primary,
  unselectedColor = colors.primary,
  labelStyle,
  shape = 'circle', // New prop to choose shape
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.radioContainer}>
        {/* Custom shape style */}
        <View
          style={[
            shape === 'circle' ? styles.circle : styles.square, // Apply shape style
            { borderColor: value ? selectedColor : unselectedColor }, // Border color based on selection
          ]}
        >
          {value && (
            <Icon
              type="ionicon"
              name={iconname}
              color={selectedColor}
              size={20} // Adjust size as needed
            />
          )}
        </View>
        <Text style={[styles.label, labelStyle]}>{label2}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...fonts.body2,
    marginLeft: 10,
    color: colors.primary,
  },
  // Circle radio button style
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12, // Full circle
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Square radio button style with 10px radius
  square: {
    width: 24,
    height: 24,
    borderRadius: 10, // Rounded corners
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:colors.primary
  },
});
