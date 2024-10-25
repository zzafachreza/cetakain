import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, ImageBackground, StyleSheet, Alert, Linking, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts, getDataByTable, getDataCompany, windowWidth } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyInputLogin, MyPicker, MyPickerSecond, MyRadio } from '../../components';
import MyMenu from '../../components/MyMenu';
import MyCarousel from '../../components/MyCarouser';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';


export default function SampleJersey({ navigation, route }) {

    const [comp, setComp] = useState({});

    const kosong = {
        s: '',
        m: '',
        l: '',
        xl: '',
        xxl: '',
        xxxl: ''
    }

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
            jenis: 'SAMPLE',
            nomor_pesanan: 'JS' + moment().format('YYYYMMDDHHmmss'),
            ...kirim
        };


        let WATemplate = `*PESANAN ${sendData.jenis} JERSEY*\n\nNomor Pesanan : *${sendData.nomor_pesanan}*\nTanggal : *${moment().format('dddd, DD MM YYYY')}*\nPengguna : *${user.nama_lengkap} / ${user.telepon}*\n----------------------------------\n`;
        WATemplate += `Bahan  : *${kirim.bahan}* \n`
        WATemplate += `Pola   : *${kirim.pola}* \n`
        WATemplate += `*SIZE* \n`
        WATemplate += kirim.s.toString().length > 0 ? `S    : *${kirim.s} pcs* \n` : '';
        WATemplate += kirim.m.toString().length > 0 ? `M    : *${kirim.m} pcs* \n` : '';
        WATemplate += kirim.l.toString().length > 0 ? `L    : *${kirim.l} pcs* \n` : '';
        WATemplate += kirim.xl.toString().length > 0 ? `XL   : *${kirim.xl} pcs* \n` : '';
        WATemplate += kirim.xxl.toString().length > 0 ? `XXL  : *${kirim.xxl} pcs* \n` : '';
        WATemplate += kirim.xxxl.toString().length > 0 ? `XXXL : *${kirim.xxxl} pcs* \n` : '';

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

    const [pilih, setPilih] = useState('');
    const UKURAN = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Sample Jersey" />
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

                    <FlatList horizontal data={UKURAN} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setPilih(item);
                                let cek = item.toLowerCase();
                                setKirim({
                                    ...kirim,
                                    ...kosong,
                                    [cek]: 1,
                                })
                            }} style={{
                                padding: 5,
                                borderColor: Color.blueGray[300],
                                width: windowWidth / 8,
                                height: windowWidth / 8,
                                marginHorizontal: 2,
                                borderRadius: 10,
                                backgroundColor: pilih == item ? colors.primary : colors.white,
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 12,
                                    color: pilih == item ? colors.white : colors.black
                                }}>{item}</Text>

                            </TouchableOpacity>
                        )
                    }} />

                    <View style={{ marginTop: 20 }}>
                        <MyButton onPress={sendServer} warna={colors.primary} colorText={colors.white} title="Buat Pesanan" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})