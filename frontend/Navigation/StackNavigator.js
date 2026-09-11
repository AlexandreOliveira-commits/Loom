import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screens/Login';
import Cadastros from '../Screens/Cadastro';
import Sobre from '../Screens/Sobre';
import avaliacao from '../Screens/avaliacao';
import Baixar from '../Screens/Baixar';
import midia from '../Screens/midia';
import Perfil from '../Screens/Perfil';
import FazerAvaliacao from '../Screens/FazerAvaliacao';
import editarPerfil from '../Screens/editarPerfil';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

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
          component={avaliacao}
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
          component={midia}
        />
       
        <Stack.Screen 
        name="editarPerfil"
        component={editarPerfil}
        />
         <Stack.Screen 
          name="FazerAvaliacao"
          component={FazerAvaliacao}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}