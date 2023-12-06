// import { useEffect, useState } from "react";
// import DataTable from "./DataTable";
// import FileInput from "./FileInput";

// function readFile(file: File) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = event.target?.result as string;
//       console.log(data.split("\n"));
//       data && resolve(data.split("\n"));
//     };

//     reader.onerror = (error) => {
//       reject(error);
//     };

//     reader.readAsText(file);
//   });
// }

// function bubbleSort(arr: string[]) {
//   const len = arr.length;
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         const temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }
//   return arr;
// }

// function binarySearch(array: string[], item: string) {
//   let start = 0;
//   let count = 0;
//   let end = array.length;
//   let middle;
//   let found = false;
//   let position = -1;
//   while (found === false && start <= end) {
//     count += 1;
//     middle = Math.floor((start + end) / 2);
//     if (array[middle] === item) {
//       found = true;
//       position = middle;
//       return { position, count };
//     }
//     if (item < array[middle]) {
//       end = middle - 1;
//     } else {
//       start = middle + 1;
//     }
//   }
//   return { position, count };
// }

// const HashPowMethod = () => {
//   const [file, setFile] = useState<null | File>(null);
//   const [listData, setListData] = useState<string[]>([]);

//   //simple methods
//   const [searchInput, setSearchInput] = useState("");
//   const [addInput, setAddInput] = useState("");

//   useEffect(() => {
//     if (file) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       readFile(file).then((file) => {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const list = file as unknown as string[];
//         setListData(bubbleSort(list));
//       });
//     }
//   }, [file]);

//   const addToList = () => {
//     setListData((prev) => bubbleSort([...prev, addInput]));
//     setAddInput("");
//   };

//   const searchElementInList = () => {
//     const result = binarySearch(listData, searchInput);
//     console.log(result);
//     alert(
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       `Элемент= ${searchInput}\nкол-во итераций:${result.count}\nиндекс:${result.position}`
//     );
//   };
//   return (
//     <div>
//       <h1>Рехэширование методом произведения</h1>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
//         <DataTable data={listData} />
//         <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
//           <FileInput onFileSelect={setFile} />
//           <form>
//             <div>
//               <div style={{ display: "flex", gap: "10px" }}>
//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <input
//                     value={searchInput}
//                     placeholder="Поиск идентификатора"
//                     onChange={(e) => setSearchInput(e.target.value)}
//                   ></input>
//                   <button type="button" onClick={searchElementInList}>
//                     Найти
//                   </button>
//                 </div>
//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <input
//                     value={addInput}
//                     placeholder="Добавить идентификатор"
//                     onChange={(e) => setAddInput(e.target.value)}
//                   ></input>
//                   <button type="button" onClick={addToList}>
//                     Добавить
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HashPowMethod;
