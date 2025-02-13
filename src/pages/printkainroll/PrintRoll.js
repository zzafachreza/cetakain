import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, ImageBackground, StyleSheet, Alert, Linking, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts, getDataByTable, getDataCompany } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyRadio } from '../../components';
import MyMenu from '../../components/MyMenu';
import MyCarousel from '../../components/MyCarouser';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

export default function PrintRoll({ navigation, route }) {

    const [comp, setComp] = useState({});

    const sendServer = () => {
        let sendData = {
            fid_pengguna: user.id_pengguna,
            jenis: 'PRINT',
            nomor_pesanan: 'RP' + moment().format('YYYYMMDDHHmmss'),
            order: data.map(i => ({
                id_bahanroll: i.id_bahanroll,
                nama_bahan: i.nama_bahan,
                qty: i.qty
            })),
        };

        if (sendData.order.filter(i => i.qty > 0).length > 0) {
            let WATemplate = `*PESANAN ${sendData.jenis} KAIN ROLL*\n\nNomor Pesanan : *${sendData.nomor_pesanan}*\nTanggal : *${moment().format('dddd, DD MM YYYY')}*\nPengguna : *${user.nama_lengkap} / ${user.telepon}*\n----------------------------------\n`;
            sendData.order.map(i => {
                if (i.qty > 0) {
                    WATemplate += `${i.nama_bahan} *${i.qty} Yard* \n`
                }

            })


            axios.post(apiURL + 'add_print_roll', sendData).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    showMessage({
                        type: 'success',
                        icon: 'success',
                        message: res.data.message
                    });
                    Linking.openURL('https://wa.me/' + comp.tlp + '?text=' + WATemplate);
                    navigation.goBack()
                }
            })
        } else {
            showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Silahkan pilih minimal 1 bahan !'
            });
        }


    }

    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(u => setUser(u));
        getDataCompany().then(res => setComp(res.data.data));
        __getData();
        __getGambar();
     
    }, [])


    const [gambar, setGambar] = useState([{ "file_gambar": "datafoto/77aa75f161f68d878234f06023f722cc1f2801d8.png", "id_gambar": "2", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Banner" }, { "file_gambar": "datafoto/dc5e27da22554899592c344074266072a2f2b2bc.png", "id_gambar": "3", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Print" }, {
        "file_gambar": "datafoto/b1cc5dba39d74acfb780c3772e7a9e1a6774fc72.png", "id_gambar": "4",
        "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Sample"
    }])
    const __getGambar = () => {
        axios.post(apiURL + 'gambar_detail', {
            menu: 'Kain Roll'
        }).then(res => {
            setGambar(res.data)
        })
    }


    const [data, setData] = useState([]);
    const __getData = () => {
        getDataByTable('bahanroll').then(res => {
            console.log('bahan', res.data);
            setData(res.data);
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Print Kain Roll" />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        color: colors.primary,
                        fontSize: 25
                    }}>Kain</Text>


                    {/* LIST KAIN ROLL */}
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                marginVertical: 4,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                                borderColor: Color.blueGray[200],
                                flexDirection: 'row'
                            }}>
                                <Image source={{
                                    uri: item.image
                                }}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 10,
                                    }}
                                />
                                <View style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                }}>
                                    <Text style={{
                                        ...fonts.headline4,
                                        color: colors.primary
                                    }}>{item.nama_bahan}</Text>
                                    <MyInput
                                        // value={item.qty}
                                        onChangeText={x => {

                                            let tempt = [...data];
                                            tempt[index].qty = x;
                                            console.log(tempt)
                                            setData(tempt)
                                        }}
                                        label="QTY"
                                        styleInput={{ paddingLeft: 5, }}
                                        keyboardType='number-pad'
                                        label2="Yard" />
                                </View>
                            </View>
                        )
                    }} />

                    <View style={{ marginTop: 20 }}>
                        <MyButton onPress={sendServer} warna={colors.primary} colorText={colors.white} title="Buat Pesanan" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})