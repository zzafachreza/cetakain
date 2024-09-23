import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors } from 'react-native-elements'
import { MyHeader } from '../../components'

export default function KatalogHarga({navigation}) {
  return (
    <View style={{flex:1, backgroundColor:colors.white}}>
        <MyHeader onPress={() => navigation.goBack()} title="Katalog Harga"/>
        <ScrollView>
            <View style={{
                padding:10
            }}>

            </View>
        </ScrollView>
    </View>
  )
}