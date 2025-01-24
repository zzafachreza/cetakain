import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'
import { WebView } from 'react-native-webview';
import { webURL } from '../../utils/localStorage';
import { useIsFocused } from '@react-navigation/native';
export default function Pricelsit({ navigation }) {
  let myUrl = webURL + 'pricelist';
  console.log(myUrl);
  const webRef = useRef();
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //     // webRef.current.reload()
  //   }
  // }, [isFocused])
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
    }}>
      {/* hEADER */}
      <View style={{
        padding: 10,

      }}>
        <MyHeader title="Price List" />

      </View>

      {/* MAIN */}

      <View style={{
        flex: 1,
        // margin: 10,
      }}>
        <WebView ref={ref => webRef.current = ref} javaScriptEnabledAndroid={true}
          source={{ uri: myUrl }} style={{ flex: 1 }} />
      </View>
    </View>
  )
}