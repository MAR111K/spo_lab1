import { ChangeEvent } from "react";

const FileInput = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
  const handleFileSelect = (e: ChangeEvent) => {
    const files = (e.target as HTMLInputElement).files;

    const currentFile = files && files[0];
    currentFile && onFileSelect(currentFile);
  };

  return (
    <input type="file" placeholder="Выберите файл" onChange={handleFileSelect}></input>
  );
};

export default FileInput;
