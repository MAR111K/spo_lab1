import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FileInput from "./FileInput";

function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result as string;
      console.log(data.split("\n"));
      data && resolve(data.split("\n"));
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
}

const SimpleMethod = () => {
  const [file, setFile] = useState<null | File>(null);
  const [listData, setListData] = useState<string[]>([]);

  //simple methods
  const [searchInput, setSearchInput] = useState("");
  const [addInput, setAddInput] = useState("");

  useEffect(() => {
    if (file) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readFile(file).then((file) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const list = file as unknown as string[];
        setListData(list);
      });
    }
  }, [file]);

  const addToList = () => {
    setListData((prev) => [...prev, addInput]);
    setAddInput("");
  };

  const searchElementInList = () => {
    let iterations = 0;

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
      <h1>Простой списк</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
        <DataTable data={listData} />
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <FileInput onFileSelect={setFile} />
          <form>
            <div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    value={searchInput}
                    placeholder="Поиск идентификатора"
                    onChange={(e) => setSearchInput(e.target.value)}
                  ></input>
                  <button type="button" onClick={searchElementInList}>
                    Найти
                  </button>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    value={addInput}
                    placeholder="Добавить идентификатор"
                    onChange={(e) => setAddInput(e.target.value)}
                  ></input>
                  <button type="button" onClick={addToList}>
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleMethod;
