import React from 'react';
import { Text, Image, View,ImageBackground, TextInput,StyleSheet, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import programStyle from '../Estilos/programStyles';
import axios from 'axios';
import DlgModal from '../Componentes/dialogModal'
import {url_base,getAllMonitorUrl,getMonitorPerEmailUrl,insertNewMonitorUrl,deleteMonitorUrl,updateMonitorUrl,getAllPacientes} from '../urls'
import DashContainer from '../Componentes/dashBoardContainer.js'
import { BarChart } from "react-native-gifted-charts";



export default function DashboardPage({navigation, route, user}) {

    
    const [NmUsuario,SetNome] = React.useState("") 
    const [TotalPacientes, setTotalPacientes] = React.useState(0)
    const [AMais, setAMais] = React.useState(0)
    const [A, setA] = React.useState(0)
    const [BMais, setBMais] = React.useState(0)
    const [B, setB] = React.useState(0)
    const [ABMais, setABMais] = React.useState(0)
    const [AB, setAB] = React.useState(0)
    const [OMais, setOMais] = React.useState(0)
    const [O, setO] = React.useState(0)
function getSangueInfos(){
      const req = fetch(url_base+getAllPacientes)
      .then(response => response.json())
      .then(data => formatSangue(data))
}
function formatSangue(pacientesLista : Array){


let a=0,am=0,b=0,bm=0,ab=0,abm=0,o=0,om=0;
setTotalPacientes(pacientesLista.length)
pacientesLista.forEach((paciente)=>{ 
switch (paciente.cd_tipo_sanguineo) {
  case "A+":
    am++
  break; 
  case "A-": 
    a++
  break;
  case "B+":
      bm++
  break; 
  case "B-":
        b++
  break;
  case "AB+":
        abm++
  break;
  case "AB-":
        ab++
  break;
  case "O+":
    om++
     
  break;
  case "O-":
      o++
  break;

}
setAMais(am)
setA(a)
setBMais(bm)
setB(b)
setABMais(abm)
setAB(ab)
setOMais(om)
setO(o)
})
}

  React.useEffect(() => {
      const x = navigation.addListener('focus', () => {
        getSangueInfos();
      })
      
      return () => x()

    }, [navigation]);


  return(
    
  <View style={[programStyle.column,{padding:10}]}>
  <Text style={[programStyle.containerText,{color:'black'}]}> Seja bem vindo, {String(user.nm_usuario).charAt(0).toUpperCase() + String(user.nm_usuario).slice(1)}.</Text>

  <View style={[programStyle.container,{ display:'flex',borderRadius: 15,width:"100%",height:'8%',marginBottom:10}]}>
  <Text style={programStyle.containerText}>Numero de pacientes:</Text>
  <Text style={programStyle.containerText}>{TotalPacientes}</Text>
  </View>
  
  
    <View style={[programStyle.column,{gap:30,marginBottom:50}]}>
  <View style={[programStyle.row,{gap:'10%'}]}>  
  <DashContainer tipoSanguefrase={"Sangue A-"} numPacientes={A}></DashContainer>
  <DashContainer tipoSanguefrase={"Sangue A+"} numPacientes={AMais}></DashContainer>
  </View>
    <View style={[programStyle.row,{gap:'10%'}]}>  
  <DashContainer tipoSanguefrase={"Sangue B-"} numPacientes={B}></DashContainer>
  <DashContainer tipoSanguefrase={"Sangue B+"} numPacientes={BMais}></DashContainer>
  </View>
    <View style={[programStyle.row,{gap:'10%'}]}>  
  <DashContainer tipoSanguefrase={"Sangue AB-"} numPacientes={AB}></DashContainer>
  <DashContainer tipoSanguefrase={"Sangue AB+"} numPacientes={ABMais}></DashContainer>
  </View>
    <View style={[programStyle.row,{gap:'10%'}]}>  
  <DashContainer tipoSanguefrase={"Sangue O-"} numPacientes={O}></DashContainer>
  <DashContainer tipoSanguefrase={"Sangue O+"} numPacientes={OMais}></DashContainer>
  </View>
  </View>

    <BarChart showValuesAsTopLabel={true} disableScroll={true} initialSpacing={10} height={210} width={320} barWidth={24} spacing={15} frontColor='red' data = {[{value:AMais},{value: A},{value: BMais},{value: B},{value: ABMais},{value: AB},{value: OMais},{value: O}]} xAxisLabelTexts={["A+","A-","B+","B-","AB+","AB-","O+","O-"]}
    />
  </View>
  )}





