import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, ImageBackground, StyleSheet, Alert, Linking, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts, getDataByTable, getDataCompany } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyInputLogin, MyPicker, MyPickerSecond, MyRadio } from '../../components';
import MyMenu from '../../components/MyMenu';
import MyCarousel from '../../components/MyCarouser';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';


export default function PrintJerseyku({ navigation, route }) {

    const [comp, setComp] = useState({});

    const [kirim, setKirim] = useState({
        bahan: '',
        pola: 'O - Neck',
        s: '',
        m: '',
        l: '',
        xl: '',
        xxl: '',
        xxxl: ''
    });

    const pola = [
        { label: 'O - NECK', value: 'O - NECK' },
        { label: 'V - NECK', value: 'V - NECK' },
        { label: 'Long Sleeve', value: 'Long Sleeve' },
        { label: 'Basket', value: 'Basket' },
    ]

    const [bahan, setBahan] = useState([]);
    const [motif, setMotif] = useState([]);
    const __getDataBahan = () => {

        getDataByTable('bahanjersey').then(res => {
            console.log(res.data);
            setBahan(res.data);

            setKirim({
                ...kirim,
                bahan: res.data[0].value,

            })
        })


    }

    const sendServer = () => {
        let sendData = {
            fid_pengguna: user.id_pengguna,
            jenis: 'PRINT',
            nomor_pesanan: 'JP' + moment().format('YYYYMMDDHHmmss'),
            ...kirim
        };


        let WATemplate = `*PESANAN ${sendData.jenis} JERSEY*\n\nNomor Pesanan : *${sendData.nomor_pesanan}*\nTanggal : *${moment().format('dddd, DD MM YYYY')}*\nPengguna : *${user.nama_lengkap} / ${user.telepon}*\n----------------------------------\n`;
        WATemplate += `Bahan  : *${kirim.bahan}* \n`
        WATemplate += `Pola   : *${kirim.pola}* \n`
        WATemplate += `*SIZE* \n`
        WATemplate += `S    : *${kirim.s} pcs* \n`
        WATemplate += `M    : *${kirim.m} pcs* \n`
        WATemplate += `L    : *${kirim.l} pcs* \n`
        WATemplate += `XL   : *${kirim.xl} pcs* \n`
        WATemplate += `XXL  : *${kirim.xxl} pcs* \n`
        WATemplate += `XXXL : *${kirim.xxxl} pcs* \n`

        console.log(WATemplate)



        axios.post(apiURL + 'add_print_jersey', sendData).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                showMessage({
                    type: 'success',
                    icon: 'success',
                    message: res.data.message
                });
                console.log(WATemplate);
                Linking.openURL('https://wa.me/' + comp.tlp + '?text=' + WATemplate);
                navigation.goBack();
            }
        })


    }

    const [user, setUser] = useState({});
    useEffect(() => {

        __getDataBahan();

        getData('user').then(u => setUser(u));
        __getGambar();
        getDataCompany().then(res => setComp(res.data.data));
    }, [])


    const [gambar, setGambar] = useState([{ "file_gambar": "datafoto/77aa75f161f68d878234f06023f722cc1f2801d8.png", "id_gambar": "2", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Banner" }, { "file_gambar": "datafoto/dc5e27da22554899592c344074266072a2f2b2bc.png", "id_gambar": "3", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Print" }, {
        "file_gambar": "datafoto/b1cc5dba39d74acfb780c3772e7a9e1a6774fc72.png", "id_gambar": "4",
        "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Sample"
    }])
    const __getGambar = () => {
        axios.post(apiURL + 'gambar_detail', {
            menu: 'Jersey'
        }).then(res => {
            setGambar(res.data)
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Print Jersey" />
            <ScrollView>
                <MyCarousel data_gambar={gambar.filter(i => i.posisi == 'Desain')} />
                <View style={{ padding: 20 }}>

                    <MyPickerSecond
                        value={kirim.bahan}
                        onValueChange={x => setKirim({ ...kirim, bahan: x })}
                        data={bahan}
                        label="Bahan"
                    />
                    <MyGap jarak={10} />
                    <MyPickerSecond
                        value={kirim.pola}
                        onValueChange={x => setKirim({ ...kirim, pola: x })}
                        data={pola}
                        label="Pola"
                    />
                    <Text style={{
                        ...fonts.headline3,
                        color: colors.black
                    }}>Size</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 4,
                        }}>
                            <MyInputLogin
                                label="S (pcs)"
                                keyboardType='numeric'
                                onChangeText={x => setKirim({ ...kirim, s: x })}
                                styleInput={{ paddingLeft: 10 }}
                                styleLabel={{ color: colors.primary, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyInputLogin
                                label="M (pcs)"
                                keyboardType='numeric'
                                onChangeText={x => setKirim({ ...kirim, m: x })}
                                styleInput={{ paddingLeft: 10 }}
                                styleLabel={{ color: colors.primary, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 4,
                        }}>
                            <MyInputLogin
                                label="L (pcs)"
                                keyboardType='numeric'
                                onChangeText={x => setKirim({ ...kirim, l: x })}
                                styleInput={{ paddingLeft: 10 }}
                                styleLabel={{ color: colors.primary, textAlign: 'center' }}
                            />
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 4,
                        }}>
                            <MyInputLogin
                                label="XL (pcs)"
                                keyboardType='numeric'
                                onChangeText={x => setKirim({ ...kirim, xl: x })}
                                styleInput={{ paddingLeft: 10 }}
                                styleLabel={{ color: colors.primary, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyInputLogin
                                label="XXL (pcs)"
                                keyboardType='numeric'
                                onChangeText={x => setKirim({ ...kirim, xxl: x })}
                                styleInput={{ paddingLeft: 10 }}
                                styleLabel={{ color: colors.primary, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 4,
                        }}>
                            <MyInputLogin
                                label="XXXL (pcs)"
                                keyboardType='numeric'
                                onChangeText={x => setKirim({ ...kirim, xxxl: x })}
                                styleInput={{ paddingLeft: 10 }}
                                styleLabel={{ color: colors.primary, textAlign: 'center' }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <MyButton onPress={sendServer} warna={colors.primary} colorText={colors.white} title="Buat Pesanan" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})