import {StyleSheet } from 'react-native';
const programStyle = StyleSheet.create({

  row : {
    display:'flex',
    flexDirection: 'row',

  },
  column : {
    display:'flex',
    flexDirection: 'column'
  },
  container: {
    backgroundColor:'red',

  },
  containerText:{
      color:'white',
      fontSize:20,
      textAlign:'center',
      fontFamily:'bold'
  },
  searchTitle:{
    fontSize:20,
    fontFamily:'bold'
  },
  sendButton:{
    alignSelf:'center',
    alignItems:'center',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal : 10,
    backgroundColor:'rgba(0,0,0,0.5)',
    width:'60%',
  },
  textInputStyle:{
    alignItems:'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor:'rgba(200,200,200,0.5)',
    width:'80%',
    height:45
  },
  addPacient:{
    alignContent:'center',
    gap:15,
    paddingTop:10,

  },
});
export default programStyle