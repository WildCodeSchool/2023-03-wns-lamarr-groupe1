import React from "react";
import { Text, View, Image, Button } from "react-native";


interface IFileData {
	id?: number;
	filename: string;
	content?: string;
	createdAt: string;
	isPublic: boolean;
	language: string;
}

export const ListingFile = (fileInfo: IFileData, {navigation}) => {
	const handleClick = (id?: number) => {
		navigation.navigate(`/coding/${id}`);
	};
	return (
		<View>
			<View>
				<Image
					style={{
						resizeMode: "contain",
						maxWidth: "100%",
					}}
					source={require("../../assets/img/our_project.png")}
					alt="Illustration page d'accueil"
				/>
			</View>
			<View>
				<Text>{fileInfo.filename}</Text>
				<Text>{fileInfo.createdAt}</Text>
				<Text>{fileInfo.language}</Text>
			</View>
		</View>
	);
};
