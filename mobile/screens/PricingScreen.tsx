import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardPricing from "../components/common/CardPricing";

const PricingScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
      <CardPricing navigation={navigation} />
    </ScrollView>
  );
};
export default PricingScreen;
