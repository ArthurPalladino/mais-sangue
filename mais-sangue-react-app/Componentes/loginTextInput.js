import { View,TextInput, Icon} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import loginStyle from '../Estilos/loginStyles'

type LoginProps = {
  nmIcon : String,
  pcHolder: String,
  onChange: (String) => void,
  keyboardType : Boolean,
  textBox: String,
}

export default LoginInput = ({nmIcon, pcHolder, onChange, keyboardType = false, textBox} : LoginProps) => {
     return(
        <View style={[loginStyle.row,loginStyle.textInputStyle]}>
          <TextInput value={textBox} onChangeText={onChange} secureTextEntry= {keyboardType} placeholder={pcHolder} style={{fontSize: 20,fontWeight: 'bold',padding:10,opacity:0.65,width:'88%', color:'white',height:'100%'}}>
          </TextInput>
            <AntDesign name={nmIcon} size={30} color="white" />
        </View>
        )
}


