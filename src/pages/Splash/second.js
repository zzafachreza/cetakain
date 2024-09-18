import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function SecondPlash() {
  const navigation = useNavigation();

  const handleSwipeUp = ({ nativeEvent }) => {
    if (nativeEvent.translationY < -50) {
      // If swipe up is detected, navigate to the login page
      navigation.navigate('Login'); // Make sure 'Login' is the correct route name
    }
  };

  return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor: colors.white
    }}>
      <View>
        <Image style={{
        }} source={require('../../assets/img_secondsplash.png')}/>
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

        {/* SWIPE UP NAVIGATE TO LOGIN PAGE */}
        <PanGestureHandler onGestureEvent={handleSwipeUp}>
          <View style={{
            alignItems: "center",
            marginTop: 60
          }}>
            <Image style={{
              width: 74,
              height: 105,
            }} source={require('../../assets/swipe_img.png')} />
          </View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
}
