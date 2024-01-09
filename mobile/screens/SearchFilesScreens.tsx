import React, { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import GridFileSearch from "../components/common/GridFileSearch";
import { GET_FILES_QUERY } from "../graphql/queries/GET_FILES_QUERY";
import { useQuery } from "@apollo/client";
import { Text, View, Button, TextInput, ScrollView, StyleSheet } from "react-native";

type File = {
	id: number;
	filename: string;
	content?: string;
	createdAt: string;
	isPublic: boolean;
	language: {
		name: string;
	};
};

const SearchFileScreens = () => {
	const { data: getFilesData, refetch } = useQuery(GET_FILES_QUERY, {
		variables: { filter: { isPublic: false } },
	});

	const [value, setValue] = useState<string>("");

	const [filteredTextValue, setFilteredTextValue] = useState<string>("");

	return (
		<View style={styles.app}>
			<View>
				<SearchBar
					value={value}
					setValue={setValue}
					setFilterValue={setFilteredTextValue}
					valueFilter={filteredTextValue}
				/>
			</View>
			<View>
				<GridFileSearch
					files={getFilesData?.getFiles || []}
					value={value}
					valueFilter={filteredTextValue}
					refetch={refetch}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	app: {
		flex: 1,
	},
});

export default SearchFileScreens;
