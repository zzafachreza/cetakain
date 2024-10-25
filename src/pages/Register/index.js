import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    PermissionsAndroid,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInputLogin, MyPicker, MyPickerSecond, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import { Icon } from 'react-native-elements';
import GetLocation from 'react-native-get-location'
import { showMessage } from 'react-native-flash-message';




export default function Register({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);
    const toast = useToast();
    const [location, setLocation] = useState({})

    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

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
        email: '',
        nama_lengkap: '',
        fid_toko: '',
        telepon: '',
        latitude: '',
        longitude: '',
        password: '',
        repassword: '',

    });

    const simpan = () => {


        if (kirim.telepon.substring(0, 2) !== '62') {
            console.log(kirim.telepon.substring(0, 2))
            toast.show('Nomor telepon harus diawali 62 didepan !', {
                type: 'warning'
            })
        } else if (!isChecked) {
            toast.show('Silahkan centang syarat dan ketentuan !', {
                type: 'warning'
            })
        } else if (
            kirim.nama_lengkap.length === 0 &&
            kirim.email.length === 0 &&
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

        else if (kirim.email.length === 0) {
            showMessage({
                message: 'Masukan email',
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
                .post(apiURL + 'register', {
                    ...kirim,
                    latitude: location.latitude,
                    longitude: location.longitude
                })
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
                        navigation.replace('Login');

                    }


                });
        }
    };

    const [comp, setComp] = useState({});
    const [toko, setToko] = useState([]);

    const IzinkanLokasi = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Izinkan Akses Lokasi',
                    message: 'Izinkan Akses Lokasi',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');

                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 60000,
                })
                    .then(location => {
                        console.log(location);
                        setLocation(location);
                    })
                    .catch(error => {
                        const { code, message } = error;
                        console.warn(code, message);
                    })
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    useEffect(() => {
        IzinkanLokasi();
        axios.post(apiURL + 'company').then(res => {
            setComp(res.data.data);
        })

        axios.post(apiURL + 'toko').then(res => {
            console.log(res.data);
            setToko(res.data);
            setKirim({
                ...kirim,
                fid_toko: res.data[0].value
            })
        })
    }, []);
    const [sama, setSama] = useState(true)

    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: colors.white
        }}>
            {/* <MyHeader title="Daftar Akun" /> */}

            <View style={{
                flex: 1,
                width: "100%",
                height: '100%',

            }}>

                <MyHeader title="Daftar" />
                <ScrollView showsVerticalScrollIndicator={false}>




                    <View style={{
                        padding: 20,
                        top: -50

                    }}>

                        <MyGap jarak={24} />
                        {/* NAMA LENGKAP */}
                        <MyInputLogin label='Nama Lengkap' onChangeText={x => {
                            setKirim({
                                ...kirim,
                                nama_lengkap: x
                            })
                        }} iconname='person-outline' placeholder='Isi nama lengkap' />

                        <MyGap jarak={0} />
                        <MyInputLogin label='Nomor Telepon ( cth. 62810 . . . )' onChangeText={x => {
                            setKirim({
                                ...kirim,
                                telepon: x
                            })
                        }} iconname='call-outline' keyboardType='phone-pad' placeholder='Isi nomor telepon' />

                        <MyGap jarak={0} />
                        <MyInputLogin label='Email' onChangeText={x => {
                            setKirim({
                                ...kirim,
                                email: x
                            })
                        }} iconname='call-outline' placeholder='Isi Email' />



                        <MyGap jarak={20} />

                        <MyPickerSecond textAlign='left' value={kirim.fid_toko} onValueChange={x => setKirim({
                            ...kirim,
                            fid_toko: x
                        })} data={toko} label="Toko" />
                        <MyGap jarak={0} />
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
                        <MyGap jarak={0} />
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

                        <View style={{}}>
                            {/* BUATKAN TOMBOL SAYA MESETUJUI SYARAT */}
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity style={styles.checkContainer} onPress={toggleCheck}>
                                    <View style={[styles.checkBox, isChecked && styles.checkBoxChecked]}>
                                        {isChecked && (
                                            <Icon
                                                type="ionicon"
                                                name='checkmark-circle'
                                                size={18}
                                                color={colors.primary}

                                            />
                                        )}
                                    </View>
                                    <Text style={styles.label}>
                                        Saya menyetujui{' '}
                                        <Text style={styles.termsText}>syarat & ketentuan</Text> yang berlaku
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {!loading &&
                            <>

                                <MyGap jarak={20} />
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
                                        fontFamily: fonts.primary[500]
                                    }}>
                                        Sudah memiliki akun? Silahkan <Text style={{
                                            ...fonts.headline5,
                                            color: colors.primary,
                                            textAlign: 'center',
                                            fontFamily: fonts.primary[800]
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkBoxChecked: {

    },
    checkIcon: {
        width: 16,
        height: 16,
        tintColor: colors.white,
    },
    label: {
        color: '#666',
        fontFamily: fonts.primary[600],
        fontSize: 10,
    },
    termsText: {
        color: colors.primary,
        fontFamily: fonts.primary[800],
        fontSize: 10
    },
});
