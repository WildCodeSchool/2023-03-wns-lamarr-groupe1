import React from "react";
import { Text, View, Image, Button } from "react-native";



const HomePage = ({navigation}) => {

	return (
		<View >
			<Text>CreativeCode</Text>
			<View id="Accueil" >
				<View >
					<Image
						source={require("../../assets/img/illustration-home.png")}
						alt="Illustration page d'accueil"
					/>
				</View>
				<View >
					<View >
						<Text >
							Le code a du style avec CreativeCode !
						</Text>
						<Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Vestibulum rhoncus.commodo velit. Vivamus iaculis varius accumsan.
							Nunc
						</Text>
						<View >
							<Button
								title={`Go to File`}
								onPress={() => navigation.navigate('File')}
							/>
							{/* <Linking className="learn-more" to="#Pricing">
								En savoir plus
							</Linking> */}
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default HomePage;
