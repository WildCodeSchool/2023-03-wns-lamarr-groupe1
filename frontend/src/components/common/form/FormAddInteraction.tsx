import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { NEW_INTERACTION_MUTATION } from "graphql/mutations/NEW_INTERACTION_MUTATION";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { INewFileProps } from "utils/interface/INewFile";
interface IFileData {
	id?: number;
	interactions: Array<{
		type: string;
	}>;
	refetch: () => void;
}
const AddNewInteraction = (file: IFileData) => {
	const [interaction, setInteraction] = useState<string>("");
	const [addInteraction, { loading }] = useMutation(NEW_INTERACTION_MUTATION);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewFileProps>({ mode: "onBlur" });
	const onSubmit: SubmitHandler<INewFileProps> = async (data) => {
		try {
			await addInteraction({
				variables: {
					input: {
						fileId: file.id,
						type: "Dislike",
					},
				},
			});
			file.refetch();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div className="interaction-container">
			<input type="radio" value="Like" />
			<input type="radio" value="Dislike" />
			<button>
				<FontAwesomeIcon icon={faThumbsUp} size="lg" /> |
				{file.interactions.filter((i) => i.type === "Like").length}
			</button>
			<button>
				<FontAwesomeIcon icon={faThumbsDown} size="lg" /> |{" "}
				{file.interactions.filter((i) => i.type === "Dislike").length}
			</button>
		</div>
	);
};

export default AddNewInteraction;
