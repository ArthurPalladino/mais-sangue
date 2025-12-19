import React from 'react';
import { Text, View, Pressable, TextInput, FlatList, Image, Switch,ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import programStyle from '../Estilos/programStyles';
import axios from 'axios';
import DlgModal from '../Componentes/dialogModal'
import {url_base,getPacienteByCpf,insertPaciente,getAllPacientes} from '../urls'
import AddTextInput from '../Componentes/addTextInput.js'
import  DropdownComponent from '../Componentes/dropdown'
import LoginButton from '../Componentes/loginButtons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign'
import { CheckBox } from 'react-native-elements';


export default function PesquisarPacientePage({navigation}) {

const [Busca, setBusca] = React.useState('');
const [data, setData] = React.useState([]);
const [itemSelecionado, setItemSelecionado] = React.useState(null)
const [AMais,SetAM]=React.useState(false)
const [BMais,SetBM]=React.useState(false)
const [OMais,SetOM]=React.useState(false)
const [AbMais,SetABM]=React.useState(false)
const [Amenos,SetA]=React.useState(false)
const [Bmenos,SetB]=React.useState(false)
const [Omenos,SetO]=React.useState(false)
const [ABmenos,SetAB]=React.useState(false)
const [paramBusca,setBuscaParam] = React.useState("")
function getPacientesInfo(){
      const req = fetch(url_base+getAllPacientes)
      .then(response => response.json())
      .then(data => setData(data))
}
    React.useEffect(() => {
      const x = navigation.addListener('focus', () => {
      getPacientesInfo();
      })
      return () => x()
    }, [navigation]);

React.useEffect(() => {
  if(Busca.length==0){
    setBuscaParam("")
  }

}, [Busca]);


function disableSwitch(value,switchToTrue){
//DESCULPA JÁ SÂO 1 DA MANHA TO CANSADO
SetAM(false)
SetBM(false)
SetOM(false)
SetABM(false)
SetA(false)
SetB(false)
SetO(false)
SetAB(false)
if(!value){
switchToTrue(true)
}}
const toggleSelection = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id_paciente === id) {
          const isSelected = !item.selected;
          if (isSelected) {
            setItemSelecionado(item)
          } else {
            setItemSelecionado(null)
          }
          return { ...item, selected: isSelected };
        }
        return { ...item, selected: false }; 
      })
    )
  }
  const filteredData = data.filter((item) =>
    item.nu_cpf_paciente.replace('-','').replace('.','').includes(paramBusca.replace('-','').replace('.',''))
  );

  
  return (
    <View style={{height:"100%"}}>
    <View style={{padding:5,borderRadius: 10,height:'90%',borderWidth: 2,borderColor: 'black',gap:5}}>
          <View style={[programStyle.row,{width:"100%",gap:10}]}>
      <TextInput
      style={{borderRadius:2,borderWidth: 2,width:"85%"}}
        placeholder="Digite o CPF do paciente que deseja encontrar..."
        value={Busca}
        onChangeText={(text) => setBusca(text)}
      />
      <Pressable style={{borderWidth:2,borderRadius:2}} onPress={()=>setBuscaParam(Busca)}>
      <AntDesign name="search1" size={38} color="black" />
      </Pressable>
      </View>
      <FlatList
        data={AMais?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("A+")):BMais?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("B+")):OMais?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("O+")):AbMais?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("AB+")):Amenos?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("A-")):Bmenos?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("B-")):Omenos?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("O-")):ABmenos?filteredData.filter((item) =>
    item.cd_tipo_sanguineo==("AB-")):filteredData}
        keyExtractor={(item) => item.id_paciente}
        renderItem={({ item }) => (
          <View style={[programStyle.row,{padding:"10%",marginBottom:10,width:'100%',borderWidth: 2,borderColor: 'black',borderRadius: 20,backgroundColor:'rgba(200,200,200,0.5)',}]}>
          <View style={programStyle.column}>
          <Image style={{width:"20%",height:50}} source={item.ic_genero_paciente.toLowerCase()=="m"?require('../assets/male.jpg'):item.ic_genero_paciente.toLowerCase()=="f"?require('../assets/female.jpg'):require('../assets/noId.jpg')}  />
            <Text style={programStyle.searchTitle}>{item.nm_paciente}</Text>
            <Text >Email: {item.nm_email_paciente}</Text>
            <Text >Número de celular: {item.nu_celular_paciente}</Text>
            <Text >Genero: {item.ic_genero_paciente.toLowerCase()=="m"?"Masculino":item.ic_genero_paciente.toLowerCase()=="f"?"Feminino":"Não informado."}</Text>
            <Text >Tipo sanguíneo: {item.cd_tipo_sanguineo}</Text>
            <Text >CPF: {item.nu_cpf_paciente}</Text>
            <Text>Data de nascimento: {item.dt_nascimento_paciente.substring(0,10)}</Text>
            <Text >Observações: {item.obs_paciente.trim()==""?"Sem observações.":item.obs_paciente}</Text>
            <Text >Data de cadastro: {item.dt_cadastro.substring(0,10)}</Text>
            {itemSelecionado?.id_paciente == item.id_paciente && 
           <View style={{backgroundColor:'red',marginTop:10,borderWidth:2,borderColor:'black',width:"40%",borderRadius:10}}>
           <Pressable style={[programStyle.row,{justifyContent:'center',width:"100%"}]} onPress={()=>{setItemSelecionado(null);navigation.navigate("Editar Paciente",{paciente: item})}}>
           <Text style={{textAlign:'center',color:'white'}}>Editar</Text>
            <MaterialIcons name="edit" size={20} color="white"/>
           </Pressable>
           </View> 
           }
          </View>
          <CheckBox
          checked={item.selected}
          onPress={() => toggleSelection(item.id_paciente)}
          container
           />
          </View>
        )}
        ListEmptyComponent={<Text >Nenhum resultado encontrado</Text>}
      />
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={{pgap:10}}>
          <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>A+</Text><Switch value={AMais} onValueChange={()=>disableSwitch(AMais,SetAM)}></Switch></View>
                    <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>A-</Text><Switch value={Amenos} onValueChange={()=>disableSwitch(Amenos,SetA)}></Switch></View>
          <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>B+</Text><Switch value={BMais} onValueChange={()=>disableSwitch(BMais,SetBM)}></Switch></View>
                    <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>B-</Text><Switch value={Bmenos} onValueChange={()=>disableSwitch(Bmenos,SetB)}></Switch></View>
          <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>O+</Text><Switch value={OMais} onValueChange={()=>disableSwitch(OMais,SetOM)}></Switch></View>
                    <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>O-</Text><Switch value={Omenos} onValueChange={()=>disableSwitch(Omenos,SetO)}></Switch></View>
          <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>AB+</Text><Switch value={AbMais} onValueChange={()=>disableSwitch(AbMais,SetABM)}></Switch></View>
          <View style={[programStyle.column,{margin:10}]}><Text style={{alignSelf:'center'}}>AB-</Text><Switch value={ABmenos} onValueChange={()=>disableSwitch(ABmenos,SetAB)}></Switch></View>
    </ScrollView>
    </View>
  );
}

  




