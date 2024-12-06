import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';

export default function MyHeader({ onPress, color = 'black', title, icon = false, iconname = 'search' }) {
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          marginTop: 0,
          marginHorizontal: 0,
          flexDirection: 'row',
          alignItems: 'center',
       
          justifyContent: 'flex-start',
    
          top: 10,
        }}
      >
        {/* Use the onPress prop passed from the parent instead of navigation.goBack() */}
        <TouchableOpacity onPress={onPress} style={{
          left: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Icon type='ionicon' name='arrow-back-outline' size={20} color={color} />
        </TouchableOpacity>

        <Text
          style={{
            ...fonts.headline2,
            flex: 1,
            color: color,
            fontSize: 14,
            marginLeft: 50
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
