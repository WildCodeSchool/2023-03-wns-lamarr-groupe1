import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, SignIn } from "./screens/ExportPages";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AppRegistry } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
  uri: "http://192.168.1.4:5000",
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
  uri: "http://192.168.1.4:5000",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Sign-in" component={SignIn} />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("App", () => App);
