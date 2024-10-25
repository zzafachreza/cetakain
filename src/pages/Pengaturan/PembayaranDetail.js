import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, getDataCompany, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import { Icon } from 'react-native-elements';
import Clipboard from '@react-native-clipboard/clipboard';
import { showMessage } from 'react-native-flash-message';

export default function PembayaranDetail({ navigation, route }) {

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    const [data, setData] = useState([]);
    const [comp, setComp] = useState({});
    const [loading, setLoading] = useState(true);
    const item = route.params;
    useEffect(() => {
        // axios.post(apiURL + 'company').then(res => {
        //     console.log(res.data.data);
        //     setComp(res.data.data);
        // })
        getDataCompany().then(res => {
            console.log(res.data.data);
            setComp(res.data.data);
        })

        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, []);

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
            {!loading &&
                <ScrollView style={{
                    padding: 20,
                }} showsVerticalScrollIndicator={false}>
                    <View style={{
                        backgroundColor: colors.white,
                        marginVertical: 8,
                        borderRadius: 10,
                    }}>
                        <Image source={{
                            uri: item.image
                        }} style={{
                            width: item.nama_bank !== 'QRIS' ? 200 : windowWidth - 20,
                            height: item.nama_bank !== 'QRIS' ? 100 : windowWidth + 100,
                            resizeMode: 'contain'

                        }} />

                        {item.nama_bank !== 'QRIS' &&
                            <>
                                <Text style={{
                                    ...fonts.headline4,
                                    color: colors.primary
                                }}>{item.nama_bank}</Text>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    color: colors.black
                                }}>A/N {item.atas_nama}</Text>
                            </>

                        }

                    </View>
                    {item.nama_bank !== 'QRIS' &&


                        <TouchableOpacity onPress={() => {
                            Clipboard.setString(item.nomor_rekening);
                            showMessage({ message: 'Berhasil di copy !' })
                        }} style={{
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 30,
                            borderColor: Color.blueGray[400],
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Icon type='ionicon' name='copy-outline' color={Color.blueGray[400]} />
                            <Text style={{
                                marginLeft: 5,
                                ...fonts.subheadline3,
                                color: colors.black
                            }}>{item.nomor_rekening}</Text>
                        </TouchableOpacity>
                    }
                    <Text style={{
                        ...fonts.body3,
                        marginTop: 20,
                        color: colors.black,
                        textAlign: 'center',
                    }}>
                        Silakan lakukan konfirmasi pembayaran ke Admin Cetakain
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/' + comp.tlp + `?text=Hallo saya sudah melakukan pembayaran melalui *${item.nama_bank}*`)}>
                        <Image source={require('../../assets/wa.png')} style={{
                            marginTop: 10,
                            width: 50,
                            height: 50,
                            alignSelf: 'center'
                        }} />
                    </TouchableOpacity>
                    <MyGap jarak={50} />
                </ScrollView>
            }

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})