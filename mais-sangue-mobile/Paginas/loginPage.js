import React from 'react';
import { Text, Image, View,ImageBackground, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import loginStyle from '../Estilos/loginStyles';
import LoginInput from '../Componentes/loginTextInput'
import LoginButton from '../Componentes/loginButtons'
import axios from 'axios';
import DlgModal from '../Componentes/dialogModal'
import {url_base,getAllMonitorUrl,getMonitorPerEmailUrl,insertNewMonitorUrl,deleteMonitorUrl,updateMonitorUrl} from '../urls'


export default function LoginPage({navigation}) {
  const [modalVisible : Boolean, SetModalVisible] = React.useState(false)
  const [modalFrase : String, SetModalFrase] = React.useState("")
  const [NmUsuario,SetNome] = React.useState("") 
  const [SenhaUsuario,SetSenha] = React.useState("") 

function  getMonitorPEmail(email : String) {
  email=email.replace('@','%40')
 const req =fetch(url_base+getMonitorPerEmailUrl+email)
   .then(response => response.json())
   .then(data => loginCheck(data))
}
function loginCheck(data){
          // navigation.navigate("mainMenu", {
          //   user: {nm_usuario:"ARthur",cd_usuario:2,nm_email:"emailatualizacao",nm_senha:"TEste"}
          // })
      if(NmUsuario.toLowerCase().trim()==data.nm_email.toLowerCase().trim() && SenhaUsuario==data.nm_senha){
        navigation.navigate("mainMenu", {
            user: data,
          })
      } 
      else{
        SetModalFrase("Senha ou email incorretos.")
        SetModalVisible(true)
      }
}

const requestUserData = (nmUser:String,senha:String)=>{
  if(nmUser.trim()=="" || senha==""){
    SetModalFrase("Por favor, preencha todos os campos.")
    SetModalVisible(true)
  }
  else if (senha.length<4){
    SetModalFrase("A senha precisa ter no mínimo 4 dígitos!")
    SetModalVisible(true)
  }
  else
      {
      getMonitorPEmail(nmUser)
  }}

  return(    
    <ImageBackground source={require('../assets/image_main_menu.png')} style={loginStyle.loginPrincipalDiv}>  
          <View style={loginStyle.backGroundDiv}>
                <Image source={require('../assets/icon.png')} style={{width:300,height:150}}/> 
                <View style={{width:'100%', gap:10, alignItems:"center", marginBottom:30}}>
                <LoginInput  
                  nmIcon="user"
                  pcHolder="Email" 
                  onChange={SetNome}/>
                  <LoginInput  
                  keyboardType={true}
                  nmIcon="lock"
                  pcHolder="Senha" 
                  onChange={SetSenha}/>
                
                </View>
                <View style={{width:'100%',gap:10, alignItems:"center"}}> 
                  <LoginButton textButton="ENTRAR" nmIcon="login" pressAction={()=>requestUserData(NmUsuario,SenhaUsuario)}/>

                  <LoginButton textButton="REGISTRE-SE" nmIcon="adduser" pressAction={()=>navigation.navigate("register")} />
                </View>
          </View>
          <DlgModal fraseModal={modalFrase} isVisible={modalVisible} buttonFrase={"Entendi."} setIsVisible={SetModalVisible}></DlgModal> 
      </ImageBackground>
    )
}

