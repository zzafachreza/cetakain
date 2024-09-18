import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';

export default function MyHeader({ onPress, color = colors.primary, title, icon = false, iconname = 'search' }) {
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          marginTop: 0,
          marginHorizontal: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10, // Reduced padding to avoid overflowing
          backgroundColor: colors.white,
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 50,
          top: 10,
        }}
      >
        {/* Use the onPress prop passed from the parent instead of navigation.goBack() */}
        <TouchableOpacity onPress={onPress} style={{ marginTop: 0, left:10 }}>
          <View style={{ backgroundColor: colors.secondary, padding: 10, borderRadius: 100 }}>
            <Icon type='ionicon' name='arrow-back-outline' size={20} color={color} />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            ...fonts.headline2,
            flex: 1,
            textAlign: 'center',
            color: color,
            fontSize:20,
            left:-20
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
