import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FileInput from "./FileInput";
import { readFile } from "../utils/readFile";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// Класс Хэш-таблицы
class HashTable {
  table: (string | null)[];
  size: number;

  constructor(size: number) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  // Хэш функция
  hash(key: string, attempt: number): number {
    const A = 0.7; // Константа для метода произведения
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode += key.charCodeAt(i);
    }

    let hashValue = (hashCode * A) % this.size;
    hashValue = Math.floor(hashValue);
    return (hashValue * attempt) % this.size;
  }

  // Добавление в таблицу
  insert(key: string): void {
    if (this.table.includes(key)) {
      alert("Элемент есть");
      return;
    }
    // Кол-во проб
    let attempt = 1;
    let index = Math.ceil(this.hash(key, attempt));
    while (this.table[index] !== null) {
      attempt++;
      index = Math.ceil(this.hash(key, attempt));
      if (attempt >= this.size) {
        alert("Хеш-таблица заполнена");
        throw new Error("Хеш-таблица заполнена");
      }
    }

    this.table[index] = key;
  }
  // Поиск по таблице
  search(key: string): number | null {
    let attempt = 1;
    let index = Math.ceil(this.hash(key, attempt));
    while (this.table[index] !== key) {
      attempt++;
      index = Math.ceil(this.hash(key, attempt));
      if (this.table[index] === null || attempt >= this.size) {
        return null;
      }
    }

    return index;
  }
}

const HashPowMethod = () => {
  const [file, setFile] = useState<null | File>(null);
  const [searchInput, setSearchInput] = useState("");
  const [addInput, setAddInput] = useState("");
  const [hashTable, setHashTable] = useState<HashTable | null>(null);
  const [listData, setListData] = useState<string[]>([]);

  // При монтировании компонента создаем класс хэш таблицы
  useEffect(() => {
    const table = new HashTable(50);
    setHashTable(table);
  }, []);

  useEffect(() => {
    if (file) {
      readFile(file).then((file) => {
        const list = file as string[];
        for (let i = 0; i < list.length; i++) {
          hashTable?.insert(list[i]);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment
        //@ts-ignore
        hashTable && setListData([...hashTable.table]);
      });
    }
  }, [file]);

  // Добавление элемента
  const addToList = () => {
    if (hashTable && addInput.trim() !== "") {
      const newElement = addInput.trim();
      hashTable.insert(newElement);
      setAddInput("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setListData([...hashTable.table]);
    }
  };

  // Поиск элемента
  const searchElem = () => {
    if (hashTable && searchInput.trim() !== "") {
      const index = hashTable.search(searchInput.trim());
      if (index !== null) {
        alert(`Элемент найден по индексу ${index}`);
        // Действия с найденным элементом
      } else {
        alert(`Элемент не найден`);
      }
      setSearchInput("");
    }
  };

  return (
    <div>
      <h1>Хеш-таблица (Рехэширование методом произведения)</h1>
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

                <Button label="Найти" onClick={searchElem} />
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

export default HashPowMethod;
