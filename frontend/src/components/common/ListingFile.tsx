import React from "react";
import ImageCode from "assets/img/our_project.png";
import "styles/components/ListingFile.scss";
import { handleDate } from "utils/DateFormat";
import { useNavigate } from "react-router-dom";
import { NEW_FILE_MUTATION } from "graphql/mutations/NEW_FILE_MUTATION";

interface IFileData {
	id?: number;
	filename: string;
	content?: string;
	createdAt: string;
	isPublic: boolean;
	language: string;
}

export const ListingFile = (fileInfo: IFileData) => {
	
	const navigate = useNavigate();
	const handleClick = (id?: number) => {
		navigate(`/coding/${id}`);
	};
	return (
		<div
			className="content-listing"
			onClick={() => {
				handleClick(fileInfo?.id);
			}}
		>
			<div className="content-img-listing">
				<img src={ImageCode} alt="Preview du fichier" />
				
			</div>
			<div className="content-info-listing">
				<h4>{fileInfo.filename}</h4>
				<p>{fileInfo.createdAt}</p>
				<p className="language">{fileInfo.language}</p>
			</div>
		</div>
	);
};
