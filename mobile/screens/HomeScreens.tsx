import { StyleSheet, Text, ScrollView } from "react-native";
import AboutUs from "../components/common/AboutUs";
import HomePage from "../components/common/HomePage";
import { useNavigation } from "@react-navigation/native";
import CardPricing from "../components/common/CardPricing";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
      <HomePage navigation={navigation} />
      <CardPricing navigation={navigation} />
      <AboutUs />
    </ScrollView>
  );
};

export default HomeScreen;
