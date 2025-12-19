import React from 'react';
import { Text, Image, View,ImageBackground, Modal, TextInput } from 'react-native';
import loginStyle from '../Estilos/loginStyles';
import LoginInput from '../Componentes/loginTextInput'
import LoginButton from '../Componentes/loginButtons'
import DlgModal from '../Componentes/dialogModal'
import axios from 'axios';
import  {checkEmail} from '../AuxFunctions/functions'

import {url_base,getAllMonitorUrl,getMonitorPerEmailUrl,insertNewMonitorUrl,deleteMonitorUrl,updateMonitorUrl} from '../urls'

function RegisterPage({navigation}){

   const [allData, setData] = React.useState("");
  function getAll (){
      const req = fetch(url_base+getAllMonitorUrl)
      .then(response => response.json())
      .then(data => setData(data))
    
  }

  function CadastrarNoBanco(nmUsuario : String,emailUsuario : String,senhaUsuario : String,){
    var jsonPost=JSON.stringify({
          cd_usuario: 0,
          nm_usuario: nmUsuario,
          nm_email: emailUsuario,
          dt_nascimento: "2000-01-01",
          dt_criacao_conta:"0",
          nm_senha: senhaUsuario
        })
    fetch(url_base+insertNewMonitorUrl, {
        method: "POST",
        body: jsonPost,
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}).then((response) => console.log(response.json()))
}
function checkIfExists(nmUsuario,emailUsuario,senhaUsuario){
  var emailToSearch=emailUsuario.replace('@','%40')
 const req =fetch(url_base+getMonitorPerEmailUrl+emailToSearch)
   .then(response => existsReturn(response.status,nmUsuario,emailUsuario,senhaUsuario))
}
function existsReturn(response,nmUsuario,emailUsuario,senhaUsuario){
  SetModalVisible(true)
  if (response==200){
    SetModalFrase("Email já cadastrado!")
  }
  else{
    SetModalFrase("Registro realizado!")
    CadastrarNoBanco(nmUsuario,emailUsuario,senhaUsuario)
    navigation.navigate("login")
    }

}
  function checkRegister(nmUsuario : String,emailUsuario : String,senhaUsuario : String,senhaUsuario2 : String){
  if(nmUsuario.split()=="" || emailUsuario.split()=="" || senhaUsuario.split()=="" || senhaUsuario2.split()=="" ){
      SetModalFrase("Por favor preencha todos os campos!")
        SetModalVisible(true)

  }
    else if (!checkEmail(emailUsuario.split())) {
      SetModalFrase("Email inválido!")
        SetModalVisible(true)

  }
  else if (senhaUsuario!=senhaUsuario2) {
      SetModalFrase("As duas senhas precisam ser iguais!")
        SetModalVisible(true)

  }
  else if (senhaUsuario.length<4) {
      SetModalFrase("A senha precisa ter no mínimo 4 dígitos!")
        SetModalVisible(true)

  }
  else{
        checkIfExists(nmUsuario,emailUsuario,senhaUsuario)

  }
}

  const [modalVisible : Boolean, SetModalVisible] = React.useState(false)
  const [modalFrase : String, SetModalFrase] = React.useState("")
  const [nmUsuario : String,SetNome] = React.useState("") 
  const [emailUsuario : String,SetEmail] = React.useState("") 
  const [senhaUsuario : String,SetSenha] = React.useState("") 
  const [senhaUsuario2 : String,SetSenha2] = React.useState("") 
  return(    
    <ImageBackground source={require('../assets/image_main_menu.png')} style={loginStyle.loginPrincipalDiv}> 

          <View style={loginStyle.backGroundDiv}>
          
                <Text style={{fontFamily: 'BOLD', color: 'white', fontSize: 20}}>REGISTRE-SE</Text>
                <View style={{width:'100%', gap:10, alignItems:"center", marginBottom:30}}>
                  <LoginInput
                  value={nmUsuario}  
                  nmIcon="user"
                  pcHolder="Nome" 
                  onChange={SetNome}/>
                  <LoginInput  
                  nmIcon="mail"
                  pcHolder="Email" 
                  onChange={SetEmail}/>
                  <LoginInput  
                  keyboardType={true}
                  nmIcon="lock"
                  pcHolder="Senha" 
                  onChange={SetSenha}/>
                  <LoginInput  
                  keyboardType={true}
                  nmIcon="lock"
                  pcHolder="Confirme senha" 
                  onChange={SetSenha2}/>            
                </View>    
                <View style={{width:'100%',gap:10, alignItems:"center"}}> 
                  <LoginButton textButton="REGISTRAR" nmIcon="adduser" pressAction={()=>checkRegister(nmUsuario,emailUsuario,senhaUsuario,senhaUsuario2)} />
                  <LoginButton textButton="VOLTAR" nmIcon="back" pressAction={()=>navigation.navigate("login")}/>

                </View>
                

          </View>
              <DlgModal fraseModal={modalFrase} isVisible={modalVisible} buttonFrase={"Entendi."} setIsVisible={SetModalVisible}></DlgModal> 

      </ImageBackground>
    )
}
export default RegisterPage

