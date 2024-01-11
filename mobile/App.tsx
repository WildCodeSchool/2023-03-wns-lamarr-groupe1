import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  SignIn,
  Profile,
  FileScreen,
  Pricing,
  SignUp,
  SearchFiles,
} from "./screens/ExportPages";
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
import {
  faFile,
  faHouse,
  faKey,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const httpLink = createHttpLink({
  //uri: "http://192.168.1.35:5000", //Gautier
  // uri: "http://192.168.1.12:5000", //Christopher
  uri: "http://192.168.1.119:5000", //Flora
  //uri: "http://192.168.1.4:5000", //Khemis
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
  //uri: "http://192.168.1.35:5000", //Gautier
  // uri: "http://192.168.1.12:5000", //Christopher
  uri: "http://192.168.1.119:5000", //Flora
  //uri: "http://192.168.1.4:5000", //Khemis
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setIsAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pricing" component={Pricing} />
      <Stack.Screen name="S'inscrire" component={SignUp} />
    </Stack.Navigator>
  );

  return (
    <ApolloProvider client={apolloClient}>
      <authContext.Provider value={{ isAuthenticated, setIsAuth }}>
        <FileProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Accueil"
                component={HomeStack}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesomeIcon icon={faHouse} color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Parcourir"
                component={SearchFiles}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      color={color}
                      size={size}
                    />
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
                <>
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
                  <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                          icon={faUser}
                          color={color}
                          size={size}
                        />
                      ),
                    }}
                  />
                </>
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
