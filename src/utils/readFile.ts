export function readFile(file: File) {
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
