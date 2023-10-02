import { ListingFile } from "./ListingFile";
import { handleDate } from "utils/DateFormat";
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
  value: string;
};
const GridFileSearch = ({ files, value }: GridFileProps) => {
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

  return (
    <>
      {files
        .filter(
          (element: any) =>
            handleString(element.filename).includes(handleString(value)) ||
            handleString(handleDate(element.createdAt)).includes(
              handleString(value)
            )
        )
        .map((file) => (
          <ListingFile
            key={file.id}
            filename={file.filename}
            content={file.content}
            createdAt={handleDate(file.createdAt)}
            isPublic={file.isPublic}
            language={file.language.name}
          />
        ))}
    </>
  );
};

export default GridFileSearch;
