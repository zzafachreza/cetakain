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


export default function PrintHijabku({ navigation, route }) {

    const [comp, setComp] = useState({});

   

    const [bahan, setBahan] = useState([]);
    const [motif, setMotif] = useState([]);
    const [kirim, setKirim] = useState({
        fid_bahanhijab: '',
        fid_motifhijab: '',
        qty: ''
    });
    const __getDataBahan = () => {

        getDataByTable('bahanhijab').then(res => {

            setBahan(res.data);

            getDataByTable('motifhijab').then(res2 => {
                console.log(res2.data);
                setMotif(res2.data);
                setKirim({
                    fid_bahanhijab: res.data[0].value,
                    fid_motifhijab: res2.data[0].value,
                })
            })
        })


    }

    const sendServer = () => {
        let sendData = {
            fid_pengguna: user.id_pengguna,
            jenis: 'PRINT',
            nomor_pesanan: 'HP' + moment().format('YYYYMMDDHHmmss'),
            fid_bahanhijab: kirim.fid_bahanhijab,
            fid_motifhijab: kirim.fid_motifhijab,
            qty: kirim.qty
        };


        let WATemplate = `*PESANAN ${sendData.jenis} HIJAB*\n\nNomor Pesanan : *${sendData.nomor_pesanan}*\nTanggal : *${moment().format('dddd, DD MM YYYY')}*\nPengguna : *${user.nama_lengkap} / ${user.telepon}*\n----------------------------------\n`;
        WATemplate += `Bahan  : *${bahan.filter(i => i.value == kirim.fid_bahanhijab)[0].nama_bahan}* \n`
        WATemplate += `Ukuran : *${bahan.filter(i => i.value == kirim.fid_bahanhijab)[0].size}* \n`
        WATemplate += `Motif  : *${motif.filter(i => i.value == kirim.fid_motifhijab)[0].nama_motif}* \n`
        WATemplate += `Jumlah : *${kirim.qty}* \n`

        console.log(WATemplate)



        axios.post(apiURL + 'add_print_hijab', sendData).then(res => {
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
            menu: 'Hijab'
        }).then(res => {
            setGambar(res.data)
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Print Hijab" />
            <ScrollView>
                <MyCarousel data_gambar={gambar.filter(i => i.posisi == 'Desain')} />
                <View style={{ padding: 20 }}>

                    <MyPickerSecond
                        value={kirim.fid_bahanhijab}
                        onValueChange={x => setKirim({ ...kirim, fid_bahanhijab: x })}
                        data={bahan}
                        label="Bahan dan Ukuran"
                    />
                    <MyGap jarak={10} />
                    <MyPickerSecond
                        value={kirim.fid_motifhijab}
                        onValueChange={x => setKirim({ ...kirim, fid_motifhijab: x })}
                        data={motif}
                        label="Lasser Cut"
                    />

                    <MyInputLogin

                        label="Quantity"
                        keyboardType='numeric'
                        onChangeText={x => setKirim({ ...kirim, qty: x })}
                        styleInput={{ paddingLeft: 10 }}
                        styleLabel={{ color: colors.primary, textAlign: 'center' }}
                    />

                    <View style={{ marginTop: 20 }}>
                        <MyButton onPress={sendServer} warna={colors.primary} colorText={colors.white} title="Buat Pesanan" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})