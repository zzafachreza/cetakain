import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { useNavigation } from '@react-navigation/native';

export default function SecondPlash() {
  const navigation = useNavigation();

  // Function to handle the click event
  const handleClick = () => {
    navigation.navigate('Login'); // Make sure 'Login' is the correct route name
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View>
        <Image style={{
          // You can add styles for the image here if needed
        }} source={require('../../assets/img_secondsplash.png')} />
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{
          color: colors.primary,
          fontFamily: fonts.primary[600],
          fontSize: 25,
          textAlign: "center",
          marginTop: 45,
        }}>
          The Easy Way to Print Your Fashion
        </Text>

        <Text style={{
          color: '#959493',
          fontFamily: fonts.primary[600],
          fontSize: 12,
          textAlign: "center",
          marginTop: 34,
        }}>
          Fast, Easy, and Affordable
        </Text>

        {/* CLICK HERE NAVIGATE TO LOGIN PAGE */}
        <TouchableOpacity onPress={handleClick}>
          <View style={{
            alignItems: "center",
            marginTop: 85
          }}>
            <Image style={{
              width: 70,
              height: 70,
            }} source={require('../../assets/clickhare.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
