import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    notCofirmedYet: {
      opacity: 0.5,
    },

    text : {
      borderStyle: 'solid',
      borderColor:'black',
      borderRadius: 10,
      fontSize: 16,
      fontWeight:"bold",
      marginVertical:10,

    },

    image: {
      width:300,
      height:100,
    },

    card: {
      borderRadius: 6,
      elevation: 3,
      backgroundColor: '#fff',
      shadowOffset: {width:1, height:1},
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 16,
      marginVertical: 6,
    },

    cardContent: {
      flex: 1,
      marginHorizontal:18,
      marginVertical:10,

    },

    buttons: {
      flex:1,
      flexDirection:'row',
      justifyContent: 'space-between'
    },

  });
  
  export default styles;