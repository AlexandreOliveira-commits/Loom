import {
    NavigationContainer
} from '@react-navigation/native';

import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';


import Login from '../Screens/Login';
import Cadastros from '../Screens/Cadastro';
import Sobre from '../Screens/Sobre';
import Avaliacao from '../Screens/avaliacao';
import Jogar from '../Screens/Jogar';
import Midia from '../Screens/midia';
import Perfil from '../Screens/Perfil';
import FazerAvaliacao from '../Screens/FazerAvaliacao';
import EditarPerfil from '../Screens/editarPerfil';
import { LinearGradient } from 'expo-linear-gradient'; // ou 'react-native-linear-gradient'


const Stack =
    createNativeStackNavigator();


export default function StackNavigator() {

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Login"
            >

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="Cadastro"
                    component={Cadastros}
                   options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="Sobre"
                    component={Sobre}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="avaliacao"
                    component={Avaliacao}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="Jogar"
                    component={Jogar}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="midia"
                    component={Midia}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="editarPerfil"
                    component={EditarPerfil}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />


                <Stack.Screen
                    name="FazerAvaliacao"
                    component={FazerAvaliacao}
                    options={{
          // Deixa o texto e o botão de voltar brancos para contrastar com o gradiente
          headerTintColor: '#b9cddf',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Cria o fundo gradiente para o header
          headerBackground: () => (
            <LinearGradient
              colors={['#def6ff', '#f8f4ff', '#ffcae0']} // Altere para as cores desejadas
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );

}