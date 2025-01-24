import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import { useIsFocused } from '@react-navigation/native';


export default function Pembayaran({ navigation }) {

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    const [data, setData] = useState([]);
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getData('user').then(u => {
                setUser(u)
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
            backgroundColor: colors.background
        }}>
            <View style={{
                padding: 10
            }}>
                <MyHeader onPress={() => navigation.goBack()} title="Riwayat Pemesanan" />
            </View>
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
                                <TouchableOpacity onPress={() => {
                                    if (item.modul == 'transaksiroll') {
                                        navigation.navigate('DetailRoll', item)
                                    } else if (item.modul == 'transaksihijab') {
                                        navigation.navigate('DetailHijab', item)
                                    } else if (item.modul == 'transaksijersey') {
                                        navigation.navigate('DetailJersey', item)
                                    } else if (item.modul == 'transaksisample') {
                                        navigation.navigate('DetailSample', item)
                                    }
                                }} style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: Color.blueGray[200],
                                    backgroundColor: colors.white,
                                    marginVertical: 4,
                                    borderRadius: 10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            fontFamily: fonts.secondary[400],
                                            fontSize: 11,
                                        }}>{moment(item.tanggal + ' ' + item.jam).format('DD MMMM YYYY, HH:mm')} WIB</Text>
                                        <Text style={{
                                            // flex: 1,
                                            fontFamily: fonts.secondary[400],
                                            fontSize: 11,
                                        }}>Status : <Text style={{ color: colors.success }}>{item.status}</Text></Text>
                                    </View>
                                    <View style={{
                                        marginTop: 5,
                                        flexDirection: 'row',
                                        // alignItems: 'center'
                                    }}>
                                        <View>
                                            <Image source={{
                                                uri: webURL + item.image
                                            }} style={{
                                                borderRadius: 4,
                                                width: 60,
                                                height: 60,
                                            }} />
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            paddingHorizontal: 10,
                                            flexDirection: 'column',
                                        }}>
                                            <Text style={{
                                                flex: 1,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 14,
                                                color: colors.secondary,
                                                // marginBottom: 10,
                                            }}>PRINT {item.kategori}</Text>
                                            <Text style={{
                                                // flex: 1,
                                                fontFamily: fonts.secondary[400],
                                                fontSize: 10,
                                                color: Color.blueGray[400]
                                            }}>Cust : {user.nama_lengkap}</Text>
                                            <Text style={{
                                                // flex: 1,
                                                fontFamily: fonts.secondary[400],
                                                fontSize: 10,
                                                color: Color.blueGray[400]
                                            }}>Code produksi : #{item.nomor_pesanan}</Text>
                                            <Text style={{
                                                // flex: 1,
                                                fontFamily: fonts.secondary[400],
                                                fontSize: 10,
                                                color: Color.blueGray[400]
                                            }}>Nama Barang : {item.barang}</Text>
                                        </View>
                                    </View>
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