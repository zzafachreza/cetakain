import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Import Picker dari library yang benar
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  value,
  data = [],
  width = '100%',  // Custom width
  height = 50,     // Custom height
  colorIcon = colors.primary,
}) {
  return (
    <View style={{ marginBottom: 20 }}>
      {/* Label di atas */}
      {label && (
        <Text style={{
          ...fonts.subheadline3,
          color: colors.primary,
          marginBottom: 8,
          textAlign: 'center'  // Centered label
        }}>
          {label}
        </Text>
      )}

      {/* Picker Container */}
      <View style={[styles.pickerContainer, { width, height }]}>
        {/* Icon di kiri */}
        {iconname && (
          <View style={styles.iconContainer}>
            <Icon type='ionicon' name={iconname} color={Color.blueGray[300]} size={24} />
          </View>
        )}

        {/* Picker */}
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={[styles.picker, { width: '80%', height }]}  // Custom width and height
          itemStyle={styles.pickerItem}  // Style untuk item picker
        >
          {data.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>

        {/* Icon dropdown di kanan */}
        <View style={styles.dropdownIcon}>
          <Icon type='ionicon' name='caret-down-outline' color={Color.blueGray[300]} size={24} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.blueGray[300],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  picker: {
    flex: 1,
    marginLeft: 40,  // Adjusted to avoid overlap with the icon
  },
  pickerItem: {
    fontSize: 16,
    ...fonts.body2,
    color: colors.primary,
    flexShrink: 1, // Prevent text from being cut off
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
  },
});
