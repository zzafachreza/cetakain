import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { colors, fonts, Color } from '../../utils'; // Adjust the imports based on your project structure

export default function MyInputLogin({
  onFocus,
  label,        // Top label
  label2,       // Right-side label (e.g., "Yard")
  borderColor = Color.blueGray[300],
  editable,
  iconname,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  placeholder,
  autoFocus,
  onEndEditing,
  multiline,
  styleInput,
  styleLabel,   // Custom styling for the right-side label
  textColor = colors.black,
  width = '100%',  // Custom width for the input field (default 100%)
  height = 50,
  marginTop = 20,    // Custom height for the input field (default 50)
}) {

  const [tutup, setTutup] = useState(true);

  return (
    <View style={{ marginTop: marginTop }}>
      {/* Top Label */}
      {label && (
        <Text style={[styles.topLabel, styleLabel]}>
          {label}
        </Text>
      )}

      {/* Input Field with Right-side Label */}
      <View style={[styles.inputContainer, { width, height }]}>
        {/* Optional Left-side Icon */}
        {iconname && (
          <Icon
            type="ionicon"
            name={iconname}
            color={Color.blueGray[300]}
            size={24}
            style={styles.icon}
          />
        )}

        {/* Text Input */}
        <TextInput
          style={[
            styles.textInput,
            {
              paddingLeft: 0, // Adjust padding if there's an icon
              borderColor: borderColor,
              color: textColor,
            },
            styleInput,
          ]}
          onEndEditing={onEndEditing}
          maxLength={100}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Color.blueGray[400]}
          editable={editable}
          multiline={multiline}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry ? tutup : false}
          onFocus={onFocus}
        />

        {/* Right-side Label (e.g., "Yard") */}
        {label2 && (
          <Text style={styles.label2}>
            {label2}
          </Text>
        )}

        {/* Toggle Password Visibility (for secure input) */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setTutup(!tutup)}
            style={styles.eyeIcon}>
            <Icon
              type="ionicon"
              name={tutup ? 'eye' : 'eye-off'}
              color={colors.border}
              size={18}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#7E7E7E',
    justifyContent: 'space-between',  // Adjust space between input and side label
    paddingHorizontal: 10,
    borderColor: Color.blueGray[300]
  },
  textInput: {
    fontFamily: fonts.primary[400],
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 50,

  },
  icon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  topLabel: {
    fontFamily: fonts.primary[400],
    color: colors.black,
    marginBottom: 8,
  },
  label2: {
    ...fonts.body3,
    paddingHorizontal: 15,
    color: colors.primary,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
