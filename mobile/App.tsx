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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFile, faHouse, faKey } from "@fortawesome/free-solid-svg-icons";

const httpLink = createHttpLink({
  uri: "http://192.168.1.119:5000",
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
  uri: "http://192.168.1.119:5000",

  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();
export default function App() {
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
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesomeIcon icon={faHouse} color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Connexion"
                component={SignIn}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesomeIcon icon={faKey} color={color} size={size} />
                  ),
                }}
              />
              {isAuthenticated ? (
                <Tab.Screen
                  name="Mes fichiers"
                  component={FileScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesomeIcon
                        icon={faFile}
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              ) : null}
            </Tab.Navigator>
            <StatusBar style="light" />
          </NavigationContainer>
        </FileProvider>
      </authContext.Provider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("App", () => App);
