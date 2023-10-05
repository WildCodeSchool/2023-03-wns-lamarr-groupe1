import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import "styles/components/SearchBar.scss";
import { fileContext } from "utils/context/FileContext";
import { ILanguageProps } from "utils/interface/ILanguage";

const SearchBar = ({
  value,
  setValue,
  filterValueSelected,
}: {
  filterValueSelected: any;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { Languages, handleCloseModal } = useContext(fileContext);

  const filter = (e: any) => {
    return (filterValueSelected = e.target.value);
  };
  return (
    <div className="content-search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="icon-search">
        <FontAwesomeIcon className="icon" icon={faSearch} size="xl" />
      </div>
      <select name="language" id="language-select" onChange={filter}>
        <option value="Choisir un Language">Choisir un Language</option>

        {Languages.map((language: ILanguageProps) => {
          return (
            <option value={language.name} key={language.id}>
              {language.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchBar;
