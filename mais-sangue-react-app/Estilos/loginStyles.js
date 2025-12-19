import {StyleSheet } from 'react-native';


const loginStyle = StyleSheet.create({

  row : {
    display:'flex',
    flexDirection: 'row',

  },
  column : {
    display:'flex',
    flexDirection: 'column'
  },
  fontInputStyle: {
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginButton:{
    alignItems:'center',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal : 10,
    backgroundColor:'rgba(200,200,200,0.5)',
    width:'60%',
  },
  textInputStyle:{
    alignItems:'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor:'rgba(200,200,200,0.5)',
    width:'80%',
    height:45
  },
  mainMenubackgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  loginPrincipalDiv: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',


  },
  backGroundDiv: {
    alignSelf:'center',
    gap:22,
    width: '80%',
    height: '90%',
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    display:'flex',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:'rgba(200,200,200,1)',

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color:'white',
    fontFamily:'bold',
    fontSize:20,
    marginBottom: 15,
  },
  
});
export default loginStyle