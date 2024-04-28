import "./App.css";
import React, { useState } from "react";
import MyModal from "./MyModal";
import HistoryTable from "./HistoryTable";
import OrderEditor from "./OrderEditor";

const App = () => {
  const [data, setData] = useState([
    ["name1", "city1", "some other info"],
    ["name2", "city2", "more info"],
  ]);

  const handleFileChange = (e) => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      setData(
        reader.result.split("\r\n").map((row) =>
          row.split(",").reduce((acc, cell) => {
            acc.push(cell);
            return acc;
          }, [])
        )
      );
    };
  };

  let csvContent = data.map((e) => e.join(",")).join("\n");
  let file = new File([csvContent], "filename.csv", { type: "text/csv" });
  let exportUrl = URL.createObjectURL(file);

  return (
    <div className="App">
      <header className="App-header">
        <MyModal
          title="Order History"
          child={
            <>
              <input type="file" onChange={handleFileChange} />
              <div style={{ height: "2rem" }}></div>
              <a href={encodeURI(exportUrl)} download="my_data.csv">
                Export CSV File
              </a>
              <div style={{ height: "2rem" }}></div>
              <HistoryTable data={data} />
            </>
          }
        />
        <div style={{ height: "2rem" }}></div>
        <OrderEditor />
      </header>
    </div>
  );
};

export default App;
