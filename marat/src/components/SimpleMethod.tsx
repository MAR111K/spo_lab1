import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FileInput from "./FileInput";
import { readFile } from "../utils/readFile";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const SimpleMethod = () => {
  const [file, setFile] = useState<null | File>(null);
  const [listData, setListData] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [addInput, setAddInput] = useState("");

  useEffect(() => {
    if (file) {
      readFile(file).then((file) => {
        //чтение из файла
        const list = file as unknown as string[];
        setListData(list);
      });
    }
  }, [file]);

  const addToList = () => {
    //Добавление в конец массива нового элемента
    setListData((prev) => [...prev, addInput]);
    setAddInput("");
  };

  const searchElementInList = () => {
    let iterations = 0;
    //Проостой цикл и метод перебора с начального элемента
    for (let i = 0; i < listData.length; i++) {
      iterations++;
      if (listData[i] === searchInput) {
        alert(
          `Элемент = ${searchInput}\nКоличество итераций = ${iterations}\nИндекс=${i}`
        );
        setSearchInput("");
        return;
      }
    }

    alert(`Элемент = ${searchInput} не найден\nКоличество итераций = ${iterations}`);
    setSearchInput("");
  };
  return (
    <div>
      <h1>Простой список</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
        <DataTable data={listData} />
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <FileInput onFileSelect={setFile} />
          <div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <InputText
                  width={300}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Поиск идентификатора"
                />

                <Button label="Найти" onClick={searchElementInList} />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <InputText
                  width={300}
                  value={addInput}
                  onChange={(e) => setAddInput(e.target.value)}
                  placeholder="Добавить идентификатор"
                />

                <Button label="Добавить" onClick={addToList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMethod;
