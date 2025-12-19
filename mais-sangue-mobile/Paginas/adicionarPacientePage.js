import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import programStyle from '../Estilos/programStyles';
import axios from 'axios';
import DlgModal from '../Componentes/dialogModal'
import {url_base,getPacienteByCpf,insertPaciente} from '../urls'
import AddTextInput from '../Componentes/addTextInput.js'
import  DropdownComponent from '../Componentes/dropdown'
import LoginButton from '../Componentes/loginButtons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import  {checkCpf,checkDate,checkEmail} from '../AuxFunctions/functions'

export default function AdicionarPacientePage({navigation}) {
  const [nome,SetNome]=React.useState("")
  const [email,SetEmail]=React.useState("")
  const [phone,SetPhone]=React.useState("")
  const [cpf,SetCPF]=React.useState("")
  const [tiposangue,SetSangue]=React.useState("")
  const [genero,SetGenero]=React.useState("")
  const [dtnascimento,SetDataNascimento]=React.useState("")
  const [obs,SetObs]=React.useState("")
  const [modalVisible : Boolean, SetModalVisible] = React.useState(false)
  const [modalFrase : String, SetModalFrase] = React.useState("")
  
  const blooddata = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
    { label: 'AB+', value:'AB+' },
    { label: 'AB-', value:'AB-' },
  ];
  genderdata=[
    {label:"Masculino", value:"M"},
    {label:"Feminino", value:"F"},
    {label:"Prefiro não identificar", value:"N"}
  ]


function  checkIfPacienteAlreadyExists(cpf : String) {
 const req =fetch(url_base+getPacienteByCpf+cpf)
   .then(response => returnIfExists(response.status))
}

function returnIfExists(data){
  if (data==200){
    SetModalFrase("Paciente já cadastrado!")
  }
  else{
      SetModalFrase("Paciente registrado com sucesso!")
      registerPaciente()
  }
  SetModalVisible(true)

}
function registerPaciente(){
    var jsonPost=JSON.stringify({
        id_paciente: 0,
        nm_paciente:nome ,
        nm_email_paciente: email,
        nu_celular_paciente: phone,
        dt_nascimento_paciente: formatDateToDB(dtnascimento),
        ic_genero_paciente: genero,
        cd_tipo_sanguineo: tiposangue,
        nu_cpf_paciente: cpf,
        obs_paciente: obs,
        dt_cadastro: "2000-01-01"
        })
    fetch(url_base+insertPaciente, {
        method: "POST",
        body: jsonPost,
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
SetNome("")
SetEmail("")
SetPhone("")
SetCPF("")
SetSangue("")
SetGenero("")
SetDataNascimento("")
}
function formatDateToDB(data){
  let partes = data.split('/'); 
  let novaData = `${partes[2]}-${partes[1]}-${partes[0]}`;
  return novaData;
}


function cadastro(){
  if(nome==""|| email==""|| phone==""|| cpf==""|| tiposangue==""|| genero==""|| dtnascimento==""){
      SetModalFrase("Por favor, preencha todos os campos")
        SetModalVisible(true)
  }
  else if(!checkCpf(cpf)){
      SetModalFrase("Cpf inválido. Por favor corrija.")
  SetModalVisible(true)
  }

  else if(!checkDate(dtnascimento)){
          SetModalFrase("Data de nascimento inválida. Por favor corrija.")
  SetModalVisible(true)

  }
  else if(!checkEmail(email)){
          SetModalFrase("Email inválido. Por favor corrija.")
  SetModalVisible(true)

  }
  else if(phone.length<14){
          SetModalFrase("Número de telefone inválido. Por favor corrija")
  SetModalVisible(true)

  }
  else{
  checkIfPacienteAlreadyExists(cpf)
}

}




 return(
   <View style={[programStyle.column,programStyle.addPacient]}>
   
   <AddTextInput pcHolder={"José da silva"} textOutside={"Digite seu nome..."} inputValue={nome} onChange={SetNome} nmIcon={"person"}/>
    <AddTextInput pcHolder={"000.000.000-00"}  isCpf={true} inputValue={cpf} onChange={SetCPF} textOutside={"Digite seu CPF..."} nmIcon={"post-add"}/>
   <AddTextInput pcHolder={"exemplo@email.com"} textOutside={"Digite seu email..."} inputValue={email} onChange={SetEmail} nmIcon={"alternate-email"}/>
   <AddTextInput pcHolder={"(00) 00000-0000"} textOutside={"Digite seu telefone..."} nmIcon={"phone"}isPhone={true} inputValue={phone} onChange={SetPhone}/>
   <AddTextInput isDate={true} inputValue={dtnascimento} onChange={SetDataNascimento} pcHolder={"01/01/2000"} textOutside={"Digite sua data de nascimento (DD/MM/AAAA)"} nmIcon={"person"}/>
    <AddTextInput pcHolder={"Observações"} textOutside={"Observações sobre o paciente..."}  inputValue={obs} onChange={SetObs} nmIcon={"person"}/>
   <DropdownComponent onChangeAction={SetSangue} valor={tiposangue} showData={blooddata} nm_icon={"bloodtype"} insideText={'Escolha seu tipo sanguíneo.'}/>
   <DropdownComponent onChangeAction={SetGenero} valor={genero} showData={genderdata} nm_icon={"male"} insideText={'Escolha seu genero.'}/>
    <View style={[programStyle.sendButton,programStyle.row]}>
        <Pressable  onPress={()=>cadastro()} style={[programStyle.row,{fontSize: 20,gap:10,width:"100%",height:"100%",justifyContent:'center'}]}>
          <Text style={{fontSize: 15,fontWeight:'bold',opacity:1,color:'white'}}>CADASTRAR</Text>
          <MaterialIcons name={"assignment-add"} size={24} color="white" />        
        </Pressable> 
    </View>
          <DlgModal backgroundColor={"rgba(0,0,0,1)"} opacidade={1} fraseModal={modalFrase} isVisible={modalVisible} buttonFrase={"Entendi."} setIsVisible={SetModalVisible}></DlgModal> 
   </View>
   )   





   
}





