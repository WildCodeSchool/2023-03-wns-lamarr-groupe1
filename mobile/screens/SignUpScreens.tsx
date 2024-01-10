import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormSignUp from "../components/common/form/FormSignUp";

const SignUpScreens = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <FormSignUp navigation={navigation} />
      </View>
    </>
  );
};

export default SignUpScreens;
