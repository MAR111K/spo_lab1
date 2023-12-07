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

class HashTable {
  table: (string | null)[];
  size: number;

  constructor(size: number) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  hash(key: string): number {
    const A = 0.618033; // Константа для метода произведения
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += key.charCodeAt(i);
    }
    const hashValue = this.size * ((hashCode * A) % 1);
    const randomNumberFrom1To100 = Math.floor(Math.random() * 100) + 1;
    return Math.ceil(hashValue * randomNumberFrom1To100) % this.size;
  }

  insert(key: string): void {
    if (this.table.includes(key)) {
      alert("Элемент есть");
      return;
    }
    let attempt = 0;
    let index = Math.ceil(this.hash(key));
    console.log(index);
    while (this.table[index] !== null) {
      attempt++;
      index = Math.ceil(this.hash(key));
      if (attempt >= this.size) {
        alert("Хеш-таблица заполнена");
        throw new Error("Хеш-таблица заполнена");
      }
    }

    this.table[index] = key;
    console.log(this.table);
  }

  search(key: string): number | null {
    let attempt = 0;
    let index = Math.ceil(this.hash(key));
    console.log(this.table[index] !== key);
    while (this.table[index] !== key) {
      attempt++;
      index = Math.ceil(this.hash(key));
      if (this.table[index] === null || attempt >= this.size) {
        return null; // Если не найдено или все возможные индексы просмотрены
      }
    }

    return index;
  }
}

const HashRandomMethod = () => {
  const [file, setFile] = useState<null | File>(null);

  const [searchInput, setSearchInput] = useState("");
  const [addInput, setAddInput] = useState("");
  //
  const [hashTable, setHashTable] = useState<HashTable | null>(null);
  const [listData, setListData] = useState<string[]>([]);

  useEffect(() => {
    const table = new HashTable(20);
    setHashTable(table);
  }, []);

  useEffect(() => {
    if (file) {
      readFile(file).then((file) => {
        const list = file as string[];
        for (let i = 0; i < list.length; i++) {
          hashTable?.insert(list[i]);
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setListData([...hashTable.table]);
      });
    }
  }, [file]);

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
      <h1>Хеш-таблица (псевдослучайное)</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
        <DataTable data={listData} />
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <FileInput onFileSelect={setFile} />
          <form>
            <div>
              <p>Хеш-таблица</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    value={searchInput}
                    placeholder="Поиск идентификатора"
                    onChange={(e) => setSearchInput(e.target.value)}
                  ></input>
                  <button type="button" onClick={searchElem}>
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

export default HashRandomMethod;
