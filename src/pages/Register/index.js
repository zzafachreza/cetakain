import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInputLogin, MyPicker, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

export default function Register({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);
    const toast = useToast();
    Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    Animated.timing(card, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    const [kirim, setKirim] = useState({
        api_token: api_token,
        username: '',
        nama_lengkap: '',
        jenis_kelamin: 'Laki-laki',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        telepon: '',
        password: '',
        repassword: '',

    });

    const simpan = () => {



        if (
            kirim.nama_lengkap.length === 0 &&
            kirim.username.length === 0 &&
            kirim.password.length === 0

        ) {
            toast.show('Formulir pendaftaran tidak boleh kosong', {
                type: 'warning'
            })
        } else if (kirim.nama_lengkap.length === 0) {
            toast.show('Silahkan ketikan nama lengkap', {
                type: 'warning'
            })
        }

        else if (kirim.username.length === 0) {
            showMessage({
                message: 'Masukan username',
            });
        }
        else if (kirim.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (kirim.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {

            console.log(kirim);

            setLoading(true);
            axios
                .post(apiURL + 'register', kirim)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        toast.show(res.data.message, {
                            type: 'danger'
                        })

                    } else {
                        toast.show(res.data.message, {
                            type: 'success'
                        });
                        storeData('user', res.data.data);
                        navigation.replace('MainApp');

                    }


                });
        }
    };




    useEffect(() => {


        axios.post(apiURL + 'company').then(res => {
            setComp(res.data.data);
        })
    }, []);
    const [sama, setSama] = useState(true)

    return (
        <SafeAreaView style={{
            flex: 1,
            width:'100%',
            height:'100%',
            backgroundColor:colors.white
        }}>
            {/* <MyHeader title="Daftar Akun" /> */}

            <View  style={{
                flex:1,
                width:"100%",
                height:'100%',

            }}>


            <ScrollView showsVerticalScrollIndicator={false}>
            <MyHeader title="Daftar"/>

            

                <View style={{
                  padding:20
                
                }}>

                    <MyGap jarak={24} />
                    {/* NAMA LENGKAP */}
                    <MyInputLogin label='Nama Lengkap' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_lengkap: x
                        })
                    }} iconname='person-outline' placeholder='Isi nama lengkap' />
                
                    <MyGap jarak={20} />
                    <MyInputLogin label='Nomor Telepon' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            telepon: x
                        })
                    }} iconname='call-outline' keyboardType='phone-pad' placeholder='Isi nomor telepon' />

                    <MyGap jarak={20} />
                    <MyInputLogin label='Email' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            telepon: x
                        })
                    }} iconname='call-outline' keyboardType='phone-pad' placeholder='Isi Email' />



                    <MyGap jarak={20} />
                    <MyInputLogin label='Toko' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            telepon: x
                        })
                    }} iconname='call-outline' keyboardType='phone-pad' placeholder='Isi toko' />


                    <MyGap jarak={20} />
                    {/*INPUT KATA SANDI */}
                    <MyInputLogin
                        placeholder="Isi Password"
                        label="Password"
                        iconname="lock-closed-outline"
                        value={kirim.password}
                        secureTextEntry={true}
                        onChangeText={value =>
                            setKirim({
                                ...kirim,
                                password: value,
                            })
                        }
                    />


                    {/* INPUT KATA SANDI ULANG */}
                    <MyGap jarak={20} />
                    <MyInputLogin
                        borderColor={sama ? Color.blueGray[300] : colors.danger}

                        placeholder="Isi konfirmasi password"
                        label="Konfirmasi Password"
                        iconname="lock-closed-outline"
                        secureTextEntry
                        value={kirim.repassword}
                        onChangeText={value => {

                            if (value !== kirim.password) {
                                setSama(false)
                            } else {
                                setSama(true)
                            }

                            setKirim({
                                ...kirim,
                                repassword: value,
                            })
                        }

                        }
                    />
                    <MyGap jarak={20} />

                        <View style={{flexDirection:"row"}}>
                          
                        </View>

                    {!loading &&
                        <>
                            <MyButton

                                warna={colors.tertiary}
                                title="Daftar"
                                Icons="log-in"
                                onPress={simpan}
                            />

                            <MyGap jarak={20} />
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{
                                    ...fonts.body3,
                                    color: '#9E9E9E',
                                    textAlign: 'center',
                                    fontFamily:fonts.primary[500]
                                }}>
                                    Sudah memiliki akun? Silahkan <Text style={{
                                        ...fonts.headline5,
                                        color: colors.primary,
                                        textAlign: 'center',
                                        fontFamily:fonts.primary[800]
                                    }}>
                                        Masuk
                                    </Text>
                                </Text>
                            </TouchableOpacity>

                        </>
                    }

                    {loading && <MyLoading />}

                </View>


            </ScrollView>
            </View>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
