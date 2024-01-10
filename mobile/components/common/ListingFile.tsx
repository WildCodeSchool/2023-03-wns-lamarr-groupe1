import React from "react";
import { Text, View, Image } from "react-native";
import searchFiles from "../../styles/SearchFiles";


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
					style={searchFiles.cardImg}
					source={require("../../assets/img/our_project.png")}
					alt="Illustration page d'accueil"
				/>
			</View>
			<View style={searchFiles.fileInfo}>
				<Text style={searchFiles.filename}>{fileInfo.filename}</Text>
				<Text style={searchFiles.date}>{fileInfo.createdAt}</Text>
				<Text style={searchFiles.language}>{fileInfo.language}</Text>
			</View>
		</View>
	);
};
