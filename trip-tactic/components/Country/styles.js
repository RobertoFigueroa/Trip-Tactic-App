import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    image: { 
      width:300,
      height: 100,
    },
    cardNotSelected: {
      width: 320,
      height: 200,
      alignItems: "center",
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
    cardSelected: {
      width:120,
      height: 120,
      alignItems: "center",
      borderRadius: 6,
      elevation: 3,
      backgroundColor: 'green',
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
    text:{
      alignContent:"center",
    }
  });
  
  export default styles;