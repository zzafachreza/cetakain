import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  StatusGizi,
  Imt,
  Take,
  StatusGiziHasil,
  DataIbuHamil,
  DataPemeriksaanIbuHami,
  SubDataPemeriksaanIbuHami,
  IbuHamil,
  TrisemesterI,
  TrisemesterII1,
  TrisemesterIII1,
  TrisemesterIII2,
  TrisemesterIII3,
  IbuBersalin,
  IbuNifas,
  IbuNifasKF,
  VideoMateri,
  TanyaJawab,
  Artikel,
  Kuesioner,
  TrisemesterII2,
  InfoLayananKesehatan,
  InfoEdukasiPenyakit,
  InfoEdukasiPenyakitKanker,
  InfoEdukasiPenyakitStroke,
  InfoEdukasiPenyakitJantung,
  InfoEdukasiPenyakitGinjal,
  InfoEdukasiPenyakitDiabetes,
  InteraksiBersamaTim,
  TentangAplikasi,
  InfoEdukasiPenyakitStunting,
  PrintKainRoll,
  PrintJersey,
  CetakSample,
  CetakSampleKainRoll,
  CetakSampleHijab,
  CetakSampleJersey,
  PrintHijab,
  Riwayat,



} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Produk' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Riwayat" component={Riwayat} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName='MainApp'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />



      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="PrintKainRoll"
        component={PrintKainRoll}
        options={{
          headerShown: false,

        }}
      />


<Stack.Screen
        name="PrintHijab"
        component={PrintHijab}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="PrintJersey"
        component={PrintJersey}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="CetakSample"
        component={CetakSample}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="CetakSampleKainRoll"
        component={CetakSampleKainRoll}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="CetakSampleHijab"
        component={CetakSampleHijab}
        options={{
          headerShown: false,

        }}
      />
      

      <Stack.Screen
        name="CetakSampleJersey"
        component={CetakSampleJersey}
        options={{
          headerShown: false,

        }}
      />
      

      <Stack.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          headerShown: false,

        }}
      />
      
      <Stack.Screen
        name="InfoEdukasiPenyakitStunting"
        component={InfoEdukasiPenyakitStunting}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="InteraksiBersamaTim"
        component={InteraksiBersamaTim}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="TentangAplikasi"
        component={TentangAplikasi}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="TrisemesterII1"
        component={TrisemesterII1}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="TrisemesterII2"
        component={TrisemesterII2}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="TrisemesterIII1"
        component={TrisemesterIII1}
        options={{
          headerShown: false,

        }}
      />


<Stack.Screen
        name="TrisemesterIII2"
        component={TrisemesterIII2}
        options={{
          headerShown: false,

        }}
      />


<Stack.Screen
        name="TrisemesterIII3"
        component={TrisemesterIII3}
        options={{
          headerShown: false,

        }}
      />


<Stack.Screen
        name="IbuBersalin"
        component={IbuBersalin}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="IbuNifas"
        component={IbuNifas}
        options={{
          headerShown: false,

        }}
      />


<Stack.Screen
        name="IbuNifasKF"
        component={IbuNifasKF}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="VideoMateri"
        component={VideoMateri}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="TanyaJawab"
        component={TanyaJawab}
        options={{
          headerShown: false,

        }}
      />

<Stack.Screen
        name="Artikel"
        component={Artikel}
        options={{
          headerShown: false,

        }}
      />


<Stack.Screen
        name="Kuesioner"
        component={Kuesioner}
        options={{
          headerShown: false,

        }}
      />



      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />


      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="StatusGiziHasil"
        component={StatusGiziHasil}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="StatusGizi"
        component={StatusGizi}
        options={{
          headerShown: false,
        }}
      />












    </Stack.Navigator>
  );
}
