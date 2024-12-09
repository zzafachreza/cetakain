import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'

export default function Pricelsit({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.background,
    }}>
      {/* hEADER */}
      <View style={{
        padding:10,

      }}>
      <MyHeader title="Price List"/>

      </View>

      {/* MAIN */}
      
      <ScrollView>
        <View style={{
            padding:10,
        }}>

        {/* PRICE LIST MASUK DI DI SINI */}

        </View>
      </ScrollView>
    </View>
  )
}