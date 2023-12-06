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

class Node {
  left = null;
  right = null;
  val = "";

  constructor(key: string) {
    this.val = key;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function insert(root: any, key: string) {
  if (!root) {
    return new Node(key);
  } else {
    if (root.val < key) {
      root.right = insert(root.right, key);
    } else {
      root.left = insert(root.left, key);
    }
    return root;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function inorderTraversal(root: any, traversalArray: string[]) {
  if (root) {
    inorderTraversal(root.left, traversalArray);
    traversalArray.push(root.val);
    inorderTraversal(root.right, traversalArray);
  }
}

// Функция для поиска элемента в бинарном дереве
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function search(root: any, key: string): any {
  if (!root || root.val === key) {
    return root;
  }

  if (root.val < key) {
    return search(root.right, key);
  }

  return search(root.left, key);
}

const BinaryMethod = () => {
  const [file, setFile] = useState<null | File>(null);

  const [searchInput, setSearchInput] = useState("");
  const [addInput, setAddInput] = useState("");
  //
  const [treeRoot, setTreeRoot] = useState(null);
  const [listData, setListData] = useState<string[]>([]);

  useEffect(() => {
    if (file) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readFile(file).then((file) => {
        const list = file as string[];
        let root = null;
        for (let i = 0; i < list.length; i++) {
          root = insert(root, list[i]);
        }
        setTreeRoot(root);
      });
    }
  }, [file]);

  useEffect(() => {
    console.log("isisiisi");
    if (treeRoot) {
      const traversalArray: string[] = [];
      inorderTraversal(treeRoot, traversalArray);
      setListData(traversalArray as string[]);
    }
  }, [treeRoot]);

  const addTolist = () => {
    if (treeRoot) {
      console.log(addInput);
      const newElement = addInput.trim();
      const newRoot = insert(treeRoot, newElement);
      setTreeRoot({ ...newRoot });
      setAddInput("");
    }
  };

  const searchElem = () => {
    if (treeRoot && searchInput.trim() !== "") {
      const searchResult = search(treeRoot, searchInput.trim());
      if (searchResult) {
        console.log("Найден элемент:", searchResult.val);
        // Действия с найденным элементом
      } else {
        console.log("Элемент не найден");
        // Действия, если элемент не найден
      }
    }
  };

  return (
    <div>
      <h1>Бинарный сука список</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
        <DataTable data={listData} />
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <FileInput onFileSelect={setFile} />
          <form>
            <div>
              <p>Простой список</p>
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
                  <button type="button" onClick={addTolist}>
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

export default BinaryMethod;