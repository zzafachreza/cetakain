import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyButton, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInputLogin, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

export default function Alamat({ navigation, route }) {

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [key, setKey] = useState('');
    const user = route.params;
    console.log(user);

    const [kirim, setKirim] = useState({
        fid_pengguna: user.id_pengguna,
        alamat_lengkap: '',
        alamat_bawaan: '',
    });

    const simpan = () => {
        console.log(kirim);
        axios.post(apiURL + 'add_alamat', kirim).then(rex => {
            console.log(rex.data)
            if (rex.data.status == 200) {
                showMessage({
                    type: 'success',
                    message: rex.data.message
                });
                __getData()
            }
        })
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            __getData()
        }
    }, [isFocused]);

    const __getData = () => {
        axios.post(apiURL + 'alamat', {
            fid_pengguna: route.params.id_pengguna
        }).then(res => {
            console.log('alamat', res.data);
            if (res.data.length > 0) {
                setKirim(res.data[0])
            }
            setData(res.data)

        })
    }


    const [tmp, setTemp] = useState([])
    const onSearch = () => {
        axios.post(apiURL + 'get_alamat', {
            key: kirim.alamat_bawaan
        }).then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                setTemp(res.data);
            } else {
                showMessage({
                    type: 'danger',
                    icon: 'danger',
                    message: 'Kelurahan / Kecamatan / Kabupaten Kota / Provinsi tidak ada !'
                })
            }
        })
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Alamat" />

            <View style={{
                flex: 1,
                padding: 16,
            }}>


                <ScrollView>
                    {data.length > 0 &&

                        <Text style={{
                            ...fonts.subheadline3
                        }}>
                            {kirim.alamat_lengkap} {kirim.alamat_bawaan}
                        </Text>
                    }

                    <MyInputLogin height={100} multiline value={kirim.alamat_lengkap} label="Alamat Lengkap" onChangeText={x => setKirim({
                        ...kirim,
                        alamat_lengkap: x.toUpperCase()
                    })} placeholder="Isi jalan, nomor atau patokan" />
                    <View style={{
                        marginTop: 50,
                        position: 'relative'
                    }}>

                        <MyInputLogin height={100} value={kirim.alamat_bawaan} onChangeText={x => setKirim({
                            ...kirim,
                            alamat_bawaan: x
                        })} onEndEditing={x => {
                            onSearch(x.nativeEvent.text)
                        }} label="Kelurahan / Kecamatan / Kabupaten Kota / Provinsi" placeholder="Pencarian . . . " />

                        {kirim.alamat_bawaan.length > 0 &&
                            <TouchableOpacity onPress={() => {
                                setKirim({ ...kirim, alamat_bawaan: '' });
                                setTemp([])
                            }} style={{
                                position: 'absolute',
                                right: 10,
                                bottom: 10,
                            }}>
                                <Icon type='ionicon' name='close' />
                            </TouchableOpacity>

                        }


                    </View>
                    <MyGap jarak={60} />
                    {kirim.alamat_bawaan.length > 0 && tmp.length > 0 &&
                        <FlatList data={tmp} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setKirim({
                                        ...kirim,
                                        alamat_bawaan: item.alamat
                                    });
                                    setTemp([])
                                }} style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    marginVertical: 4,
                                }}>
                                    <Text>{item.alamat}</Text>
                                </TouchableOpacity>
                            )
                        }} />
                    }

                    <MyButton onPress={simpan} title="Simpan" />
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})