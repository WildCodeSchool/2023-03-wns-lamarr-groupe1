
import { Text, View, Image } from "react-native";
const AboutUs = () => {
  return (
		<View id="aboutUs">
			<Text>About us</Text>
			<View>
				<Text>Our Project</Text>

				<View>
					<View>
						<Image
							source={require("../../assets/img/our_project.png")}
							alt="photos avec les membres de l'équipe"
						/>
					</View>

					<Text>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui a
						iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
						commodi quia ipsum tempore laboriosam quos architecto odit non
						ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
						a iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
						commodi quia ipsum tempore laboriosam quos architecto odit non ipsam
					</Text>
				</View>
			</View>
			<View>
				<Text>Our Project</Text>
				<View>
					<Text>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui a
						iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
						commodi quia ipsum tempore laboriosam quos architecto odit non
						ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
						a iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
						commodi quia ipsum tempore laboriosam quos architecto odit non ipsam
					</Text>
					<View>
						<Image
							source={require("../../assets/img/our_team.png")}
							alt="photos avec les membres de l'équipe"
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default AboutUs;
