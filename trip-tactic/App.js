import React, { useEffect, useMemo, useReducer } from 'react';
import 'react-native-gesture-handler';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Signin from './screens/Signin';
import Home from './screens/Home';

import { AuthContext } from './context'


import * as selectors from './reducers';
import * as actions from './actions/auth';

const { store, persistor } = configureStore();
const token = selectors.getAuthToken(store.getState()) != null;
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();



const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);


const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Welcome" component={Login} />
    <AuthStack.Screen name="Register" component={Signin} />
  </AuthStack.Navigator>
);

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'START_LOGIN' : {
        return {
          ...prevState,
          isLoading: true
        }
      }

      case 'RETRIEVE_TOKEN': {
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      }
      case 'LOGIN': {
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      }
      case 'LOGOUT':{
        return {
          ...prevState,
          userToken: null,
          userName: null,
          isLoading: false,
        };
      }
      case 'REGISTER': {
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      }
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  

  const authContext = useMemo(() => ({
    signIn: async(userName, password) => {
      // setIsLoading(false);
      // setUserToken('asdf');
      dispatch({type:'START_LOGIN'})
      let userToken;
      userToken = null;
      let credentials = null;
        try {
          await store.dispatch(actions.startLogin(userName, password));
        } catch(e) {
          console.log(e)
        }
          
        setTimeout(async() => 
        {
          credentials = await selectors.getAuthToken(store.getState());
          console.log("Ya te esperoe 5 seg", credentials)
          await dispatch({type: 'LOGIN', id: userName, token:credentials})
        }
        , 5000)
        
    },
    signOut: () => {
      // setIsLoading(false);
      // setUserToken(null);
      dispatch({type: 'LOGOUT'});

    },
    signUp: () => {
      setIsLoading(false);
      setUserToken('asdf');
    },
  }), [loginState.userToken]);

  useEffect(() => {
    setTimeout(async() => {

      let userToken = null;
      try {
        userToken = await selectors.getAuthToken(store.getState());
        console.log("estes es el token", userToken);
      }catch(error){
        console.log("Hubo error en el fetch App.js")
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 3000);
  }, []);

  if ( loginState.isLoading ) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              {loginState.userToken === null ? (
                <AuthStackScreen />
              ):(
                <HomeStackScreen />
              )}

          </PersistGate>
        </Provider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
