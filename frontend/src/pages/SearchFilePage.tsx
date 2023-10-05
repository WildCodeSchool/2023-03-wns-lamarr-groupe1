import React, { useEffect, useState } from "react";
import Layout from "components/common/layouts/Layout";
import SearchBar from "components/common/SearchBar";
import "styles/SearchFilePage.scss";
import GridFileSearch from "components/common/GridFileSearch";
import { GET_FILES_QUERY } from "graphql/queries/GET_FILES_QUERY";
import { useLazyQuery, useQuery } from "@apollo/client";

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

const SearchFilePage = () => {
  const { data: getFilesData } = useQuery(GET_FILES_QUERY, {
    variables: { filter: { isPublic: false } },
  });

  console.log(getFilesData);
  const [value, setValue] = useState<string>("");

  const [filteredTextValue, setFilteredTextValue] = useState(
    "choisir un language"
  );

  const OnchangeFilterValue = (filterValue: any) => {
    setFilteredTextValue(filterValue);
  };

  return (
    <Layout>
      <div className="container-global">
        <div className="container-search">
          <SearchBar
            value={value}
            setValue={setValue}
            filterValueSelected={OnchangeFilterValue}
          />
        </div>
        <div className="container-listing-files">
          <GridFileSearch
            files={getFilesData?.getFiles || []}
            value={value}
            filterValueSelected={OnchangeFilterValue}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SearchFilePage;
