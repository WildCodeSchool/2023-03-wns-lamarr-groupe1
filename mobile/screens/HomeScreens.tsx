import { StyleSheet, Text, ScrollView } from "react-native";
import AboutUs from "../components/common/AboutUs";
import HomePage from "../components/common/HomePage";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
	const navigation = useNavigation();
	return (
		<ScrollView style={{ flex: 1 }}>
			<HomePage navigation={navigation} />
			<AboutUs />
		</ScrollView>
	);
};

export default HomeScreen;
