import FormSignIn from "../components/common/form/FormSignIn";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignInScreens = ({route}) => {
	const navigation = useNavigation();
	const {type} = route.params;
	console.log(type);
	return (
		<>
			<View>
				<FormSignIn navigation={navigation} />
			</View>
		</>
	);
};

export default SignInScreens;
