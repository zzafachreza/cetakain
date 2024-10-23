import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyGap, MyHeader, MyHeaderPoint, MyIcon, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';


export default function Keamanan({ navigation }) {

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    const [KETERANGAN, setKETERAGAN] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post(apiURL + 'keamanan').then(res => {
            console.log(res.data[0].keterangan);
            setKETERAGAN(res.data[0].keterangan);
            setLoading(false)
        })
    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Keamanan" />
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <MyLoading />
            </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 16,
                }}>


                    {!loading &&

                        <RenderHtml
                            tagsStyles={{
                                div: {
                                    fontFamily: fonts.body3.fontFamily,
                                    textAlign: 'justify',
                                    lineHeight: 26,
                                },
                            }}
                            systemFonts={systemFonts}
                            contentWidth={windowWidth}
                            source={{
                                html: KETERANGAN
                            }}
                        />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})