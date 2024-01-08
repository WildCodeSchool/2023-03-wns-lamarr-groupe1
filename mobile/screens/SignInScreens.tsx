import FormSignIn from "../components/common/form/FormSignIn";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignInScreens = () => {
	const navigation = useNavigation();
	return (
		<>
			<View>
				<FormSignIn navigation={navigation} />
			</View>
		</>
	);
};

export default SignInScreens;
