import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NEW_INTERACTION_MUTATION } from "../../../graphql/mutations/NEW_INTERACTION_MUTATION";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { INewInteractionProps } from "../../../utils/interface/INewInteraction";
import { Text, View, TouchableOpacity, Button, TextInput } from "react-native";
import { useEffect, useState } from "react";
import searchFiles from "../../../styles/SearchFiles";
import { LinearGradient } from "expo-linear-gradient";

export interface interactionsInterface {
	type: string;
	user: {
		username: string;
	};
}
interface IFileData {
	id: number | null;
	interactions: interactionsInterface[];
	refetch: () => void;
	username: string;
}
const AddNewInteraction = (file: IFileData) => {
	const [addInteraction] = useMutation(NEW_INTERACTION_MUTATION);
	const [checked, setChecked] = useState("");
	let interactionValue = checked;

	useEffect(() => {
		setChecked(
			file.interactions.find(
				(i) => i.user.username === file.username
			)?.type
		);
	});

	const handleSetChecked = (value: string) => {
		setChecked(value);
		interactionValue = value;
		setTimeout(handleSubmit(onSubmit), 500);
	};

	const { handleSubmit, control } = useForm<INewInteractionProps>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<INewInteractionProps> = async () => {
		try {
			await addInteraction({
				variables: {
					input: {
						fileId: file.id,
						type: interactionValue,
					},
				},
			});
			file.refetch();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<View style={searchFiles.interactionsContainer}>
			<TouchableOpacity onPress={() => handleSetChecked("Like")}>
				<LinearGradient
					colors={
						checked === "Like"
							? [
									"rgba(133, 115, 215, 0.85)",
									"#6351b4",
									"#5340a9",
									"#6351b4",
									"rgba(133, 115, 215, 0.85)",
							  ]
							: ["white", "white"]
					}
					style={
						checked === "Like"
							? searchFiles.activeInterationContainer
							: searchFiles.interactionContainer
					}
				>
					<Text
						style={
							checked === "Like" ? searchFiles.active : searchFiles.inactive
						}
					>
						<FontAwesomeIcon
							style={
								checked === "Like"
									? searchFiles.iconActive
									: searchFiles.iconInactive
							}
							icon={faThumbsUp}
							size={20}
						/>
					</Text>
					<Text
						style={
							checked === "Like"
								? searchFiles.iconActive
								: searchFiles.iconInactive
						}
					>
						{file.interactions.filter((i) => i.type === "Like").length}
					</Text>
				</LinearGradient>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => handleSetChecked("Dislike")}>
				<LinearGradient
					colors={
						checked === "Dislike"
							? [
									"rgba(133, 115, 215, 0.85)",
									"#6351b4",
									"#5340a9",
									"#6351b4",
									"rgba(133, 115, 215, 0.85)",
							  ]
							: ["white", "white"]
					}
					style={
						checked === "Dislike"
							? searchFiles.activeInterationContainer
							: searchFiles.interactionContainer
					}
				>
					<Text
						style={
							checked === "Dislike" ? searchFiles.active : searchFiles.inactive
						}
					>
						<FontAwesomeIcon
							style={
								checked === "Dislike"
									? searchFiles.iconActive
									: searchFiles.iconInactive
							}
							icon={faThumbsDown}
							size={20}
						/>
					</Text>
					<Text
						style={
							checked === "Dislike"
								? searchFiles.iconActive
								: searchFiles.iconInactive
						}
					>
						{file.interactions.filter((i) => i.type === "Dislike").length}
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

export default AddNewInteraction;
