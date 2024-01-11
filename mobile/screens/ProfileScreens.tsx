import FormProfile from "../components/common/form/FormProfile";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const navigation = useNavigation();
	return (
		<>
			<ScrollView> 
				<FormProfile />
			</ScrollView>
		</>
	);
};

export default ProfileScreen;