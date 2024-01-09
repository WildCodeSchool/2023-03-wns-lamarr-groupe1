import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NEW_INTERACTION_MUTATION } from "../../../graphql/mutations/NEW_INTERACTION_MUTATION";
import { useMutation } from "@apollo/client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { INewInteractionProps } from "../../../utils/interface/INewInteraction";
import { Text, View, Image, Button, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import { useState } from "react";

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

	const { register, handleSubmit, control } = useForm<INewInteractionProps>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<INewInteractionProps> = async (data) => {
		try {
			await addInteraction({
				variables: {
					input: {
						fileId: file.id,
						type: data.type,
					},
				},
			});
			file.refetch();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<View>
			{/* <Text
				// className={
				// 	file.interactions.find(
				// 		(i) => i.type === "Like" && i.user.username === file.username
				// 	)?.user.username === file.username
				// 		? "button-clicked"
				// 		: "button"
				// }
				// htmlFor={`like${file.id}`}
				onPress={() => setTimeout(handleSubmit(onSubmit), 500)}
			>
				<View>
				</View>
				<Text>{file.interactions.filter((i) => i.type === "Like").length}</Text>
			</Text> */}

			<RadioButton
				value="Like"
				status={checked === "Like" ? "checked" : "unchecked"}
				onPress={() => setChecked("Like")}
			/>

			{/* <Text
				// className={
				// 	file.interactions.find(
				// 		(i) => i.type === "Dislike" && i.user.username === file.username
				// 	)?.user.username === file.username
				// 		? "button-clicked"
				// 		: "button"
				// }
				// htmlFor={`dislike${file.id}`}
				onPress={() => setTimeout(handleSubmit(onSubmit), 500)}
			>
				<View>
					{file.interactions.filter((i) => i.type === "Dislike").length}
				</View>
			</Text> */}
			<RadioButton
				value="Dislike"
				status={checked === "Dislike" ? "checked" : "unchecked"}
				onPress={() => setChecked("Dislike")}
			/>
		</View>
	);
};

export default AddNewInteraction;
