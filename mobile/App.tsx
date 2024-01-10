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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { REACT_APP_GRAPHQL_URI } from "@env";

const httpLink = createHttpLink({
	uri: REACT_APP_GRAPHQL_URI,
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
	uri: REACT_APP_GRAPHQL_URI,
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
			<Stack.Screen
				name="Home3"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Pricing" component={Pricing} />
			<Stack.Screen name="Sign-up" component={SignUp} />
		</Stack.Navigator>
	);

	return (
		<ApolloProvider client={apolloClient}>
			<authContext.Provider value={{ isAuthenticated, setIsAuth }}>
				<FileProvider>
					<NavigationContainer>
						<Tab.Navigator>
							{isAuthenticated ? (
								<>
									<Tab.Screen name="Home" component={HomeStack} />
									<Tab.Screen name="Search-files" component={SearchFiles} />
									<Tab.Screen name="FilePage" component={FileScreen} />
									<Tab.Screen name="Profile" component={Profile} />
								</>
							) : (
								<>
									<Tab.Screen name="Home" component={HomeStack} />
									<Tab.Screen name="Search-files" component={SearchFiles} />
									<Tab.Screen name="Sign-in" component={SignIn} />
								</>
							)}
						</Tab.Navigator>
					</NavigationContainer>
				</FileProvider>
			</authContext.Provider>
		</ApolloProvider>
	);
}

AppRegistry.registerComponent("App", () => App);
