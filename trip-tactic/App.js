import React, { useEffect, useMemo, useReducer } from 'react';
import 'react-native-gesture-handler';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Login from './screens/Login';
import Signin from './screens/Signin';
import Home from './screens/Home';
import Places from './screens/Places';
import CreateTrip from './screens/CreateTrip';
import Country from './screens/Countries';
import CreateEvent from './screens/CreateEvent';
import CreatePlan from './screens/CreatePlan';
import Plans from './screens/Plans';
import Events from './screens/Events';
import City from './screens/Cities'
import CreatePlace from './screens/CreatePlace';
import Comments from './screens/Comments';
import CreateComment from './screens/CreateComment';
import RefreshToken from './components/RefreshToken';

import { AuthContext } from './context'


import * as selectors from './reducers';
import * as actions from './actions/auth';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

const { store, persistor } = configureStore();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home}/>
    <HomeStack.Screen name="CreateEvent" component={CreateEvent}/>
    <HomeStack.Screen name="CreatePlan" component={CreatePlan}/>
    <HomeStack.Screen name="Plans" component={Plans}/>
    <HomeStack.Screen name="Events" component={Events}/>
  </HomeStack.Navigator>
);

const ExploreStack = createStackNavigator()

const ExploreStackScreen = () => (
  <ExploreStack.Navigator>
    <ExploreStack.Screen name ="Countries" component ={Country}/>
    <ExploreStack.Screen name ="Cities" component ={City}/>
    <ExploreStack.Screen name ="Places" component ={Places}/>
    <ExploreStack.Screen name ="CreatePlace" component ={CreatePlace}/>
    <ExploreStack.Screen name ="Comments" component ={Comments}/>
    <ExploreStack.Screen name ="Add Comment" component ={CreateComment}/>
  </ExploreStack.Navigator>
)


const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Welcome" component={Login} />
    <AuthStack.Screen name="Register" component={Signin} />
  </AuthStack.Navigator>
);

function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'START_LOGIN': {
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
      case 'LOGOUT': {
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
    signIn: async (userName, password) => {
      dispatch({ type: 'START_LOGIN' })
      let userToken;
      userToken = null;
      let credentials = null;
      try {
        await store.dispatch(actions.startLogin(userName, password));
      } catch (e) {
        console.log(e)
      }

      setTimeout(async () => {
        credentials = await selectors.getAuthToken(store.getState());
        console.log("Ya te esperoe 5 seg", credentials)
        await dispatch({ type: 'LOGIN', id: userName, token: credentials })
      }
        , 5000)

    },
    signOut: () => {
      store.dispatch(actions.logout());
      dispatch({ type: 'LOGOUT' });

    },
    signUp: () => {
      setIsLoading(false);
      setUserToken('asdf');
    },
  }), [loginState.userToken]);

  useEffect(() => {
    setTimeout(async () => {

      let userToken = null;
      try {
        userToken = await selectors.getAuthToken(store.getState());
        console.log("estes es el token", userToken);
      } catch (error) {
        console.log("Hubo error en el fetch App.js")
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 3000);
  }, []);

  if (loginState.isLoading) {
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
            ) : (
              <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeStackScreen}  />
                <Drawer.Screen name="Places" component={Places} />
                <Drawer.Screen name="CreateTrip" component={CreateTrip} />
                <Drawer.Screen name ="Explore" component={ExploreStackScreen}/>
              </Drawer.Navigator>
              )}
              <RefreshToken reviewTime={60000} />
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
