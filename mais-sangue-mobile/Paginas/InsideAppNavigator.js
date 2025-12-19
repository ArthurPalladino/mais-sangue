import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import DashboardPage from './dashBoardPage.js'
import AdicionarPacientePage from './adicionarPacientePage'
const Tab = createBottomTabNavigator()
import UpdatePage from './updateUserPage'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PesquisarPacientePage from './pesquisarPacientePage'
import UpdataMonitorAccount from './ConfigurarConta'
import LoginPage from './loginPage'
export default MenuPage = ({navigation,route}) => {

let {user} = route.params
React.useEffect(() => {
  console.log(route.params)
}, [route.params]);

const ExitPage = ({navigation, route}) => {
React.useEffect(() => {
navigation.navigate("login")
}, [route]);  
}

return(
  <Tab.Navigator>
        <Tab.Screen name="Menu Principal"options={{tabBarLabel: 'Menu',tabBarIcon: ({ color, size }) =>(<AntDesign name="home" size={24} color="black" />),}}  >
          {(props) =>  <DashboardPage {...props} user={user}/> }
        </Tab.Screen>

        <Tab.Screen name="Adicionar Pacientes" component={AdicionarPacientePage}
        options={{
            tabBarLabel: 'Adicionar Pacientes',
            tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-search" size={24} color="black" />
            ),
          }}
        />
  
        <Tab.Screen name="Pesquisar Pacientes" component={PesquisarPacientePage}
        options={{
            tabBarLabel: 'Pesquisar Pacientes',
            tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color="black" />
            ),
          }}
        
        />
        
          <Tab.Screen name="Configurações"options={{tabBarLabel: 'Configurações',tabBarIcon: ({ color, size }) =>(<AntDesign name="edit" size={24} color="black" />),}}  >
          {(props) =>  <UpdataMonitorAccount {...props} user={user}/> }
        </Tab.Screen>


        <Tab.Screen name="Sair" component={ExitPage}
        options={{
            tabBarLabel: 'Sair',
            tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" size={24} color="black" />
            ),
          }}></Tab.Screen>


        <Tab.Screen 
        options={{
        tabBarButton:()=>null,
        tabBarItemStyle:{
          position:"absolute",
          backgroundColor:'red',
          margin:5,
          borderRadius:10,
          left: 100,

        }
        }}
        name="Editar Paciente">{(props) =>  <UpdatePage {...props}/>}</Tab.Screen>

  </Tab.Navigator>
);
}