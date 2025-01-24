import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, getDataByTable, POSDataByTable, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import { useIsFocused } from '@react-navigation/native';

export default function DetailHijab({ navigation, route }) {
    const [user, setUser] = useState({});
    const ITEM = route.params;
    const [status, setStatus] = useState([]);
    const isFocused = useIsFocused();
    const [item, setItem] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const __getTransaksi = () => {
        getData('user').then(u => setUser(u));
        POSDataByTable('transaksihijab', {
            nomor_pesanan: ITEM.nomor_pesanan
        }).then(res => {
            setItem(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 800)

        })

        POSDataByTable('statustrx').then(res => {

            setStatus(res.data);
            setActiveIndex(res.data.map(i => i.nama_status).indexOf(ITEM.status) + 1)

        })
    }

    useEffect(() => {
        if (isFocused) {
            __getTransaksi();
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
                <MyHeader onPress={() => navigation.goBack()} title="Print Hijab" />
            </View>
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 20,
                }}>
                    <View
                        style={{
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
                                    uri: webURL + item.file_bahanhijab
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

                            </View>

                        </View>

                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    // flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 10,
                                    color: Color.blueGray[400]
                                }}>Kain : {item.nama_bahan}</Text>
                                <Text style={{
                                    // flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 10,
                                    color: Color.blueGray[400]
                                }}>Ukuran : {item.size}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    // flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 10,
                                    color: Color.blueGray[400]
                                }}>Lasercut : {item.nama_motif}</Text>
                                <Text style={{
                                    // flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 10,
                                    color: Color.blueGray[400]
                                }}>Quantity : {item.qty} Pcs</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderColor: Color.blueGray[200],
                            backgroundColor: colors.white,
                            marginVertical: 4,
                            borderRadius: 10,
                        }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                            fontSize: 14,
                            marginBottom: 10,
                        }}>Order tracking</Text>

                        <FlatList data={status} renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    // alignItems: 'center',
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{
                                            width: 12,
                                            borderRadius: 10,
                                            height: 12,
                                            backgroundColor: activeIndex >= item.id_statustrx ? colors.success : Color.blueGray[300]
                                        }} />
                                        <View style={{
                                            width: 5,
                                            height: 40,
                                            backgroundColor: activeIndex >= item.id_statustrx ? colors.success : Color.blueGray[300]
                                        }} />

                                    </View>
                                    <View style={{
                                        paddingHorizontal: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 14,
                                        }}>{item.nama_status}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[400],
                                            fontSize: 10,
                                        }}>{item.keterangan_status}</Text>
                                    </View>
                                </View>
                            )
                        }} />
                    </View>
                </View>
            }
            {
                loading && <MyLoading />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})