import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });
            axios.post(apiURL + 'company').then(res => {
                setCom(res.data.data)
            })
        }




    }, [isFocused]);


    const MylistPengaturan = ({ icon = 'location-outline', label, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
            }}>
                <Icon type='ionicon' name={icon} color={colors.primary} size={20} />
                <Text style={{
                    flex: 1,
                    left: 8,
                    ...fonts.headline5
                }}>{label}</Text>
                <Icon type='ionicon' name='chevron-forward-outline' color={colors.primary} size={20} />
            </TouchableOpacity>
        )
    }


    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 2,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: Color.blueGray[50],
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        ...fonts.headline5,
                        color: colors.primary,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        ...fonts.body3,
                        color: Color.blueGray[900],
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <MyHeader title="Akun Saya" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}

            {open &&

                <View style={{
                    margin: 5,
                    flex: 1,
                }}>
                    <View style={{
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: Color.blueGray[300],
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: 60,
                            height: 60,
                            borderWidth: 1,
                            borderColor: Color.blueGray[100],
                            overflow: 'hidden',
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <Image source={{
                                uri: user.file_pengguna
                            }} style={{
                                width: 60,
                                height: 60,

                            }} />

                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 10,
                        }}>
                            <Text style={{
                                ...fonts.headline5,
                                color: colors.primary,
                            }}>Hai, {user.nama_lengkap}</Text>
                            <Text style={{
                                ...fonts.body3
                            }}>{user.telepon}</Text>
                        </View>

                    </View>
                    <View style={{ padding: 10, flex: 1, }}>
                        <Text style={{
                            ...fonts.headline5,
                            color: colors.black,
                        }}>Pengaturan</Text>

                        <MylistPengaturan onPress={() => navigation.navigate('Alamat', user)} label="Alamat" />
                        <MylistPengaturan onPress={() => navigation.navigate('Pembayaran', user)} icon='wallet-outline' label="Pembayaran" />
                        {/* <MylistPengaturan onPress={() => navigation.navigate('Keamanan', user)} icon='lock-closed-outline' label="Keamanan" /> */}
                        <MylistPengaturan onPress={() => Linking.openURL('https://wa.me/' + com.tlp)} icon='logo-whatsapp' label="Customer Service" />



                    </View>
                    {/* data detail */}
                </View>

            }
            <View style={{
                padding: 10,
            }}>
                <MyButton colorText={colors.white} iconColor={colors.white} warna={colors.primary} title="Edit Profile" Icons="create-outline" onPress={() => navigation.navigate('AccountEdit', user)} />
                <MyGap jarak={10} />
                <MyButton onPress={btnKeluar} warna={colors.secondary} title="Log Out" Icons="log-out-outline" iconColor={colors.primary} colorText={colors.primary} />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
