import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "styles/components/SearchBar.scss";

const SearchBar = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
    </div>
  );
};

export default SearchBar;
