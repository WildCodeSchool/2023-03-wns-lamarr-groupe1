import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, SignIn, FileScreen } from "./screens/ExportPages";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AppRegistry } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authContext } from "./utils/context/AuthContext";
import { FileProvider } from "./utils/context/FileContext";
import { useContext, useState } from "react";

const httpLink = createHttpLink({
<<<<<<< HEAD
  uri: "http://192.168.1.119:5000",
=======
  uri: "http://192.168.1.4:5000",
>>>>>>> dev
  fetchOptions: {
    mode: "no-cors",
  },
});
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = await AsyncStorage?.getItem("token");

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
<<<<<<< HEAD
  uri: "http://192.168.1.119:5000",
=======
  uri: "http://192.168.1.4:5000",
>>>>>>> dev
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();
export default function App() {
<<<<<<< HEAD
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setIsAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <authContext.Provider value={{ isAuthenticated, setIsAuth }}>
        <FileProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Sign-in" component={SignIn} />
              {isAuthenticated ? (
                <Tab.Screen name="FilePage" component={FileScreen} />
              ) : null}
            </Tab.Navigator>
            <StatusBar style="light" />
          </NavigationContainer>
        </FileProvider>
      </authContext.Provider>
=======
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Sign-in" component={SignIn} />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
>>>>>>> dev
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("App", () => App);
