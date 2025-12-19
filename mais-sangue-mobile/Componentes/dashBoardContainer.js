import { View,Text,Pressable,Modal,SafeAreaView,SafeAreaProvider} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import programStyle from '../Estilos/programStyles.js'
type dashProps={
  tipoSangue:String,
  numPacientes:Number,
}


const DashContainer = ({tipoSanguefrase, numPacientes}:dashProps) => {
  return(<View style={[programStyle.container,{ display:'flex',borderRadius: 15,width:"45%",height:'100%'}]}>
  <Text style={programStyle.containerText}>{tipoSanguefrase}</Text>
  <Text style={programStyle.containerText}>{numPacientes}</Text>
  </View>)
}

export default DashContainer