import { View,Pressable, Text,Icon} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import loginStyle from '../Estilos/loginStyles'

type ButtonProps = {
  nmIcon : String,
  textButton: String,
  pressAction: (void) => void;
}

const LoginButton = ({nmIcon, textButton, pressAction} : ButtonProps ) => {
     return(
            <View style={loginStyle.loginButton}>
              <Pressable onPress={pressAction} style={[loginStyle.row,{fontSize: 20,gap:10,alignItems:'center'}]}>
                <Text style={{fontSize: 15,fontWeight:'bold',opacity:1,color:'white'}}>{textButton}</Text>
                <AntDesign name={nmIcon} size={30} color="white" />
              </Pressable> 
            </View>
        )
}
export default LoginButton


