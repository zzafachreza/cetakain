import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import { useIsFocused } from '@react-navigation/native';


export default function Pembayaran({ navigation }) {

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getData('user').then(u => {
                axios.post(apiURL + 'transaksi', {
                    fid_pengguna: u.id_pengguna
                }).then(res => {
                    console.log(res.data);
                    setData(res.data);
                    // setKETERAGAN(res.data[0].keterangan);
                    setLoading(false)
                })
            })
        }
    }, [isFocused])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Riwayat Pemesanan" />
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
                                <TouchableOpacity onPress={() => navigation.navigate('Detail', item)} style={{
                                    padding: 20,
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    backgroundColor: colors.white,
                                    marginVertical: 8,
                                    borderRadius: 10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.headline4,
                                            color: colors.primary
                                        }}>{item.jenis} {item.kategori}</Text>

                                        <Text style={{
                                            ...fonts.subheadline3,
                                            backgroundColor: colors.secondary,
                                            paddingHorizontal: 10,
                                            borderRadius: 10,
                                        }}>{item.status}</Text>
                                    </View>
                                    <Text style={{
                                        ...fonts.headline4,
                                        color: colors.black
                                    }}>{item.nomor_pesanan}</Text>
                                    <Text style={{
                                        ...fonts.subheadline3,
                                        color: colors.black
                                    }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>

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