import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FileInput from "./FileInput";
import { readFile } from "../utils/readFile";

// Класс Бинарного дерева
// левый узел
// правый узел
// значение
class Node {
  left = null;
  right = null;
  val = "";

  constructor(key: string) {
    this.val = key;
  }
}

//Метод вставки элемента в дерево
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

// Метод для обхода бинарного дерева в порядке возрастания
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
  let iterations = 0;

  while (root !== null && root.val !== key) {
    iterations++;
    if (root.val < key) {
      root = root.right;
    } else {
      root = root.left;
    }
  }

  if (root && root.val === key) {
    return { node: root, iterations };
  }

  return { node: null, iterations };
}

const BinaryMethod = () => {
  const [file, setFile] = useState<null | File>(null);
  const [searchInput, setSearchInput] = useState("");
  const [addInput, setAddInput] = useState("");
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
    //При первичном запуске создаем дерево и помещаем туда наш массив значений
    if (treeRoot) {
      const traversalArray: string[] = [];
      inorderTraversal(treeRoot, traversalArray);
      setListData(traversalArray as string[]);
    }
  }, [treeRoot]);

  const addTolist = () => {
    // Добавляем новый элемент в дерево
    if (treeRoot) {
      const newElement = addInput.trim();
      const newRoot = insert(treeRoot, newElement);
      setTreeRoot({ ...newRoot });
      setAddInput("");
    }
  };

  const searchElem = () => {
    // Поиск элемента в дереве
    if (treeRoot && searchInput.trim() !== "") {
      const { node, iterations } = search(treeRoot, searchInput.trim());
      if (node) {
        alert(
          `Элемент = ${
            node.val
          }\nКоличество итераций = ${iterations}\nИндекс=${listData.indexOf(searchInput)}`
        );
        // Действия с найденным элементом
      } else {
        alert(`Элемент не найден\nКоличество итераций = ${iterations}`);
      }
      setSearchInput("");
    }
  };

  return (
    <div>
      <h1>Бинарное дерево</h1>
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
