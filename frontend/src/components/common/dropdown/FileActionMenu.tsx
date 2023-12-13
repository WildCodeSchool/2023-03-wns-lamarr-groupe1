import "styles/components/fileActionMenu.scss";

const FileActionMenu = () => {
	return (
		<>
			<div className="action-main">
				<ul>
					<li>
						<span>Modifier</span>
					</li>
					<li>
						<span>Telecharger</span>
					</li>
					<div></div>
					<li>
						<span>Supprimer</span>
					</li>
				</ul>
			</div>
		</>
	);
};

export default FileActionMenu;
