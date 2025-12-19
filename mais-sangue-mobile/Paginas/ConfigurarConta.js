import React from 'react';
import { Text, Image, View,Pressable, TextInput } from 'react-native';
import DropdownComponent from '../Componentes/dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import programStyle from '../Estilos/programStyles';
import LoginInput from '../Componentes/loginTextInput'
import LoginButton from '../Componentes/loginButtons'
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import  {checkEmail} from '../AuxFunctions/functions'
import DlgModal from '../Componentes/dialogModal'
import {url_base,updateMonitorUrl} from '../urls'
import AddTextInput from '../Componentes/addTextInput.js'


export default function UpdataMonitorAccount({navigation,route,user}) {
  const [email,SetEmail]=React.useState("")
  const [nome,SetNome]=React.useState("")
  const [senha,setSenha]=React.useState("")
  const [modalVisible : Boolean, SetModalVisible] = React.useState(false)
  const [modalFrase : String, SetModalFrase] = React.useState("")

function checkInputs(){
if(email.trim()=="" && nome=="" && senha==""){
  SetModalFrase("Por favor, preencha algum campo.")
  SetModalVisible(true)
  return
}
else if (senha!="" && senha.length<4){
      SetModalFrase("A senha deve ter pelo menos 4 dígitos.")
      SetModalVisible(true)
      return
}
else if(email.trim()!="")
      if(!checkEmail(email)){
      SetModalFrase("Email inválido.")
      SetModalVisible(true)
      return
      }
updateUser()
}

function updateUser(){
  var dataResponse=""
    var jsonPost=JSON.stringify({
  cd_usuario: user.cd_usuario,
  nm_usuario: nome.trim()==""?user.nm_usuario:nome,
  nm_email: email.trim()==""?user.nm_email:email,
  dt_nascimento: "2000-01-01",
  dt_criacao_conta: "2000-01-01",
  nm_senha: senha==""?user.nm_senha:senha
        })
    fetch(url_base+updateMonitorUrl, {
        method: "POST",
        body: jsonPost,
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})   .then(response => response.json())
   .then(data => backToLoginPage(data))
}

function backToLoginPage(dataResponse){
SetEmail("")
SetNome("")
setSenha("")
SetModalVisible(true)
SetModalFrase("Cadastro Atualizado!")
navigation.navigate("mainMenu", {
    user: dataResponse,
})
}

return(
   <View style={[programStyle.column,programStyle.addPacient]}>
  <Text style={{textAlign:'center'}}>Configurações de conta do usuário: {user.nm_usuario}</Text>
   <AddTextInput pcHolder={"José da silva"} textOutside={"Digite o novo nome de usuário da conta.."} inputValue={nome} onChange={SetNome} nmIcon={"person"}/>
   <AddTextInput pcHolder={"exemplo@email.com"} textOutside={"Digite o novo email da conta..."} inputValue={email} onChange={SetEmail} nmIcon={"alternate-email"}/>
   <AddTextInput isPassword={true} pcHolder={"1234"} textOutside={"Digite a nova senha da conta..."} inputValue={senha} onChange={setSenha} nmIcon={"password"}/>
    <View style={[programStyle.sendButton,programStyle.row]}>
        <Pressable  onPress={()=>checkInputs()} style={[programStyle.row,{fontSize: 20,gap:10,width:"100%",height:"100%",justifyContent:'center'}]}>
          <Text style={{fontSize: 15,fontWeight:'bold',opacity:1,color:'white'}}>ATUALIZAR</Text>
          <MaterialIcons name={"assignment-add"} size={24} color="white" />        
        </Pressable> 
    </View>
    <Text style={{fontSize:12,textAlign:'center'}}>*Preencha apenas os campos que deseja atualizar</Text>
          <DlgModal backgroundColor={"rgba(0,0,0,1)"} opacidade={1} fraseModal={modalFrase} isVisible={modalVisible} buttonFrase={"Entendi."} setIsVisible={SetModalVisible}></DlgModal> 
   </View>
   )   
    
}

