import { View,Text,Pressable,Modal,SafeAreaView,SafeAreaProvider} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import loginStyle from '../Estilos/loginStyles'

type LoginProps = {
  fraseModal : String,
  isVisible : Boolean,
  setIsVisible : void
}
const DlgModal = ({fraseModal,isVisible,setIsVisible,backgroundColor="rgba(0,0,0,0.5)"} : LoginProps) => {

  return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}>
            <View style={[loginStyle.modalView,{backgroundColor: backgroundColor}]}>
              <Text style={loginStyle.modalText}>{fraseModal}</Text>
            <View style={[loginStyle.row,{width:"100%",justifyContent:"end"}]}>
          
          <View style={[loginStyle.loginButton,loginStyle.button,{width:'20%',marginLeft:'80%'}]}>
          <Pressable onPress={()=>setIsVisible(false)}>
          <Text style={[loginStyle.textStyle,{fontSize:10}]}>Entendi.</Text>
          </Pressable></View>
                
              
        </View>
          </View>
        </Modal>
  );
};
export default DlgModal
