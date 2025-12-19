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
import {url_base,updatePacienteUrl} from '../urls'
import AddTextInput from '../Componentes/addTextInput.js'


export default function UpdatePage({navigation,route}) {
  const {paciente} = route.params
  const [email,SetEmail]=React.useState("")
  const [phone,SetPhone]=React.useState("")
  const [genero,SetGenero]=React.useState("")
  const [obs,SetObs]=React.useState("")
  const [modalVisible : Boolean, SetModalVisible] = React.useState(false)
  const [modalFrase : String, SetModalFrase] = React.useState("")
  const [nome,SetNome]=React.useState("")

  genderdata=[
    {label:"Masculino", value:"M"},
    {label:"Feminino", value:"F"},
    {label:"Prefiro não identificar", value:"N"}
  ]
  
function checkInputs(){
if(email.trim()=="" && phone=="" && obs.trim()=="" && genero.trim()=="" && nome.trim==""){
  SetModalFrase("Por favor, preencha algum campo.")
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
    var jsonPost=JSON.stringify({
        id_paciente: paciente.id_paciente,
        nm_paciente:nome.trim()==""?paciente.nm_paciente:nome ,
        nm_email_paciente:email.trim()==""?paciente.nm_email_paciente:email,
        nu_celular_paciente: phone.trim()==""?paciente.nu_celular_paciente:phone,
        dt_nascimento_paciente:formatDateToDB(paciente.dt_nascimento_paciente),
        ic_genero_paciente: genero.trim()==""?paciente.ic_genero_paciente:genero,
        cd_tipo_sanguineo: paciente.cd_tipo_sanguineo,
        nu_cpf_paciente: paciente.nu_cpf_paciente,
        obs_paciente: obs.trim()==""?paciente.obs_paciente:obs,
        dt_cadastro: "2000-01-01"
        })
    fetch(url_base+updatePacienteUrl, {
        method: "POST",
        body: jsonPost,
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})

SetEmail("")
SetPhone("")
SetGenero("")
SetObs("")
SetModalVisible(true)
SetNome("")

SetModalFrase("Paciente atualizado!")
}
function formatDateToDB(data){
  let partes = data.split('/'); 
  console.log(partes)
  let novaData = `${partes[2].substring(0,4)}-${partes[0]}-${partes[1]}`;
  return novaData;
}
return(
  
   <View style={[programStyle.column,programStyle.addPacient]}>
   <View style={[programStyle.row,{padding:10,gap:10}]}>
   <View style={[programStyle.row,{backgroundColor:"red",borderWidth:2,height:25,borderRadius:4}]}>
   <Pressable style={programStyle.row} onPress={()=>navigation.navigate("Pesquisar Pacientes")}>
  <MaterialIcons name="arrow-back" size={24} color="white" /><Text style={{color:'white'}}>Voltar</Text></Pressable></View>
   <View style={programStyle.column}>
  <Text >Atualizar cadastro do paciente:{paciente.nm_paciente}</Text>
  <Text style={{textAlign:'center'}}>Portador(a) do CPF: {paciente.nu_cpf_paciente}</Text>

   </View>
   </View>
   <AddTextInput pcHolder={"José da silva"} textOutside={"Digite o novo nome do paciente.."} inputValue={nome} onChange={SetNome} nmIcon={"person"}/>
   <AddTextInput pcHolder={"exemplo@email.com"} textOutside={"Digite o novo email do paciente..."} inputValue={email} onChange={SetEmail} nmIcon={"alternate-email"}/>
   <AddTextInput pcHolder={"(00) 00000-0000"} textOutside={"Digite o novo número de telefone do paciente..."} nmIcon={"phone"}isPhone={true} inputValue={phone} onChange={SetPhone}/>
    <AddTextInput pcHolder={"Observações"} textOutside={"Atualize as observações sobre o paciente..."}  inputValue={obs} onChange={SetObs} nmIcon={"person"}/>
   <DropdownComponent onChangeAction={SetGenero} valor={genero} showData={genderdata} nm_icon={"male"} insideText={'Escolha o genero do paciente.'}/>
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

