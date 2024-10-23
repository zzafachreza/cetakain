import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';


export default function Pembayaran({ navigation }) {

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post(apiURL + 'bank').then(res => {
            console.log(res.data);
            setData(res.data);
            // setKETERAGAN(res.data[0].keterangan);
            setLoading(false)
        })
    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Pembayaran" />
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <MyLoading />
            </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>


                    {!loading &&

                        <FlatList data={data} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('PembayaranDetail', item)} style={{
                                    padding: 20,
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    backgroundColor: colors.white,
                                    marginVertical: 8,
                                    borderRadius: 10,
                                }}>
                                    <Image source={{
                                        uri: item.image
                                    }} style={{
                                        width: 100,
                                        height: 50,
                                        resizeMode: 'contain'

                                    }} />
                                    <Text style={{
                                        ...fonts.headline4,
                                        color: colors.primary
                                    }}>{item.nama_bank}</Text>
                                    <Text style={{
                                        ...fonts.subheadline3,
                                        color: colors.black
                                    }}>A/N {item.atas_nama}</Text>
                                    <Text style={{
                                        ...fonts.subheadline3,
                                        color: colors.black
                                    }}>No. Rek {item.nomor_rekening}</Text>
                                </TouchableOpacity>
                            )
                        }} />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})