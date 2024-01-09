// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Console } from "console";
import React, { useContext, useState } from "react";
import { fileContext } from "../../utils/context/FileContext";
import { ILanguageProps } from "../../utils/interface/ILanguage";
import {
	Text,
	View,
	Button,
	TextInput,
	FlatList,
} from "react-native";

export type GridFileProps = {
  files: Array<{
    id: number;
    filename: string;
    content?: string;
    createdAt: string;
    isPublic: boolean;
    language: {
      name: string;
    };
  }>;
};
const SearchBar = ({
  value,
  setValue,
  setFilterValue,
  valueFilter,
}: {
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  valueFilter: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { Languages } = useContext(fileContext);
  return (
		<View >
			<TextInput
				value={value}
				onChangeText={(value) => setValue(value)}
			/>
			<View>
				{/* <FontAwesomeIcon className="icon" icon={faSearch} size="xl" /> */}
			</View>
			{/* <select
        name="language"
        id="language-select"
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="">Choisir un Language</option>

        {Languages.map((language: ILanguageProps) => {
          return (
            <option value={language.name} key={language.name}>
              {language.name}
            </option>
          );
        })}
      </select> */}
		</View>
	);
};

export default SearchBar;
