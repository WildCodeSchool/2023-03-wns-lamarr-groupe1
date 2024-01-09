import { ListingFile } from "./ListingFile";
import { handleDate } from "../../utils/DateFormat";
import AddNewInteraction from "./form/FormAddInteraction";
import { useGetProfile } from "../../utils/hook/getProfile";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
// import FileActionMenu from "./dropdown/FileActionMenu";
import { useContext, useState } from "react";
import { fileContext } from "../../utils/context/FileContext";
import {
	Text,
	View,
	SafeAreaView,
	Button,
	TextInput,
	FlatList,
	StyleSheet,
} from "react-native";

type File = {
	id: number;
	filename: string;
	content?: string;
	createdAt: string;
	isPublic: boolean;
	language: {
		name: string;
	};
	interactions: Array<{
		type: string;
		user: { username: string };
	}>;
};

export type GridFileProps = {
	files: Array<{
		id: number;
		filename: string;
		content?: string;
		createdAt: string;
		isPublic: boolean;
		interactions: Array<{
			type: string;
			user: { username: string };
		}>;
		language: {
			name: string;
		};
	}>;
	value: string;
	valueFilter: string;
	refetch: () => void;
};
const GridFileSearch = ({
	files,
	value,
	valueFilter,
	refetch,
}: GridFileProps) => {
	const { setFileId } = useContext(fileContext);
	const profile = useGetProfile();

	const [isActionOpen, setIsActionOpen] = useState<number | null>(null);

	const HandleToggleAction = (id: number) => {
		if (isActionOpen === id) {
			setIsActionOpen(null);
			return;
		}
		setIsActionOpen(id);
		setFileId(id);
	};

	const handleString = (s: string) => {
		var r = s.toLowerCase();
		r = r.replace(new RegExp(/\s/g), "");
		r = r.replace(new RegExp(/[àáâãäå]/g), "a");
		r = r.replace(new RegExp(/æ/g), "ae");
		r = r.replace(new RegExp(/ç/g), "c");
		r = r.replace(new RegExp(/[èéêë]/g), "e");
		r = r.replace(new RegExp(/[ìíîï]/g), "i");
		r = r.replace(new RegExp(/ñ/g), "n");
		r = r.replace(new RegExp(/[òóôõö]/g), "o");
		r = r.replace(new RegExp(/œ/g), "oe");
		r = r.replace(new RegExp(/[ùúûü]/g), "u");
		r = r.replace(new RegExp(/[ýÿ]/g), "y");
		r = r.replace(new RegExp(/\W/g), "");
		r = r.replace(new RegExp(/\s/g), "");
		return r;
	};

	const FileItem = ({ file }) => {
		return (
			<View style={styles.item}>
				<View>
					{/* {isActionOpen === file.id ? <FileActionMenu /> : null} */}
				</View>
				<View>
					<ListingFile
						id={file.id}
						filename={file.filename}
						content={file.content}
						createdAt={handleDate(file.createdAt)}
						isPublic={file.isPublic}
						language={file?.language?.name}
					/>
				</View>
				<View>
					<AddNewInteraction
						id={file.id}
						interactions={file.interactions}
						refetch={refetch}
						username={profile?.username}
					/>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={[styles.app, styles.shadowProp]}>
			<FlatList
				data={files.filter((element: any) =>
					valueFilter
						? (handleString(element.filename).includes(handleString(value)) ||
								handleString(handleDate(element.createdAt)).includes(
									handleString(value)
								) ||
								handleString(element.language.name).includes(
									handleString(value)
								)) &&
						  handleString(element.language.name).includes(
								handleString(valueFilter)
						  )
						: handleString(element.filename).includes(handleString(value)) ||
						  handleString(handleDate(element.createdAt)).includes(
								handleString(value)
						  ) ||
						  handleString(element.language.name).includes(handleString(value))
				)}
				renderItem={({item}) => <FileItem file={item} />}
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	app: {
		marginHorizontal: "auto",
		width: "auto",
	},
	item: {
		flex: 1,
		backgroundColor: "white",
		borderRadius: 8,
		paddingHorizontal: 5,
		width: "100%",
		marginVertical: 10,
	},
	card: {
		backgroundColor: "white",
		borderRadius: 8,
		width: "100%",
		marginVertical: 10,
	},
	shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
});

export default GridFileSearch;
