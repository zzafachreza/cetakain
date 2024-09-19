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
  unselectedColor = Color.blueGray[300],
  labelStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.radioContainer}>
        <Icon
          type="ionicon"
          name={value ? iconname : 'ellipse-outline'}
          color={value ? selectedColor : unselectedColor}
          size={24}
        />
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
});
