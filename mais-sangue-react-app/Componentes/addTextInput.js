import { View,TextInput,Text, Icon} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import programStyle from '../Estilos/programStyles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type LoginProps = {
  nmIcon : String,
  pcHolder: String,
  onChange: (String) => void,
  textOutside: String,
  inputValue:String,
  isCpf:Boolean,
  isPhone : Boolean,
  isDate:Boolean,
  isPassword:Boolean
}

export default AddTextInput = ({nmIcon, pcHolder, onChange, inputValue, textOutside,isCpf=false,isPhone=false,isDate=false,isPassword=false} : LoginProps) => {
  const [value, setValue] = React.useState()

const cpfFormat = (event) => {
  let data = event.replace(/\D/g, "");
  data = data.substring(0, 11);
  let cpf = "";
  let parts = Math.ceil(data.length / 3);
  for (let i = 0; i < parts; i++) {
    if (i === 3) {
      cpf += `-${data.substr(i * 3)}`;
      break;
    }
    cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
  }
  onChange(cpf);
};

const phoneFormat = (event) => {
  let data = event.replace(/\D/g, "");
  data = data.substring(0, 11);
  let phone = "";
  if (data.length > 2) {
    phone += `(${data.substr(0, 2)}) `;
    if (data.length > 7) {
      phone += `${data.substr(2, 5)}-${data.substr(7)}`; 
    } else {
      phone += data.substr(2); 
    }
  } else {
    phone += `(${data}`;
  }
  onChange(phone);
};


const dateFormat = (event) => {
  let data = event.replace(/\D/g, "");
  data = data.substring(0, 8);
  let date = "";
  if (data.length > 4) {
    date += `${data.substr(0, 2)}/${data.substr(2, 2)}/${data.substr(4)}`;
  } else if (data.length > 2) {
    date += `${data.substr(0, 2)}/${data.substr(2)}`;
  } else {
    date += data;
  }
  onChange(date);
};


     return(
       <View style={{marginLeft:"10%",justifyContent:'center',width:"80%"}}>
       <Text>{textOutside}</Text>
        <View style={[programStyle.row,programStyle.textInputStyle,{width:"100%"}]}>
          <TextInput secureTextEntry={isPassword} value={inputValue} onChangeText={isCpf?(value)=>cpfFormat(value): isPhone? (value)=>phoneFormat(value): isDate? (value)=>dateFormat(value):(value)=>onChange(value)} placeholder={pcHolder} placeholderTextColor='rgba(52, 52, 52, 0.2)' style={{fontSize: 18,fontWeight: 'thin',opacity:0.8,padding:10,width:'88%', color:'black',height:'100%'}}>
          </TextInput>
            <MaterialIcons name={nmIcon} size={30} color="black" />        
            </View>
            </View>
        )
}


