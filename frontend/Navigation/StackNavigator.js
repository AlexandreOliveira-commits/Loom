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
import Baixar from '../Screens/Baixar';
import Midia from '../Screens/midia';
import Perfil from '../Screens/Perfil';
import FazerAvaliacao from '../Screens/FazerAvaliacao';
import EditarPerfil from '../Screens/editarPerfil';


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
                />


                <Stack.Screen
                    name="Cadastro"
                    component={Cadastros}
                />


                <Stack.Screen
                    name="Sobre"
                    component={Sobre}
                />


                <Stack.Screen
                    name="avaliacao"
                    component={Avaliacao}
                />


                <Stack.Screen
                    name="Baixar"
                    component={Baixar}
                />


                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                />


                <Stack.Screen
                    name="midia"
                    component={Midia}
                />


                <Stack.Screen
                    name="editarPerfil"
                    component={EditarPerfil}
                />


                <Stack.Screen
                    name="FazerAvaliacao"
                    component={FazerAvaliacao}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );

}