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
		user: {
			username: string;
		};
	}>;
	refetch: () => void;
	username: string;
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
			<label
				className={
					file.interactions.find(
						(i) => i.type === "Like" && i.user.username === file.username
					)?.user.username === file.username
						? "button-clicked"
						: "button"
				}
				htmlFor="like"
			>
				<FontAwesomeIcon icon={faThumbsUp} size="sm" />
				<span>|</span>
				<span>
					{file.interactions.filter((i) => i.type === "Dislike").length}
				</span>
				<input className="like" id="like" type="radio" value="Like" />
			</label>

			<label
				className={
					file.interactions.find(
						(i) => i.type === "Dislike" && i.user.username === file.username
					)?.user.username === file.username
						? "button-clicked"
						: "button"
				}
				htmlFor="dislike"
			>
				<FontAwesomeIcon icon={faThumbsDown} size="sm" />
				<span>|</span>
				<span>
					{file.interactions.filter((i) => i.type === "Dislike").length}
				</span>
			</label>
			<input className="dislike" id="dislike" type="radio" value="Dislike" />
		</div>
	);
};

export default AddNewInteraction;
