import './App.css';
import * as XLSX from "xlsx";

const readExcel = (event) => {
  const { target: { files = [] } = {} } = event;
  console.log("files", files);
  const file = files[0];
  console.log("file", file);
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const workBook = XLSX.read(bufferArray, { type: "buffer" });
      const sheetName = workBook.SheetNames[1];
      const workSheet = workBook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      resolve(data); 
    };
    fileReader.onerror = (error) => {
      reject(error);
    }
  });
  promise.then(d => console.log("data", d));
}

const App = () => {
  return (
    <div>
      <input type="file" onChange={readExcel} />
    </div>
  )
}

export default App;
