import {useEffect, useState} from "react"
import './App.css';
import useSocket from "./useSocket";


function App() {

  const { salesRecords } = useSocket("salesrecords");

  const [records, setSalesRecords] = useState([]);

  useEffect(() => {
    setSalesRecords(salesRecords);
  }, [salesRecords])

  const updateChartData = (data) =>{
    console.log('Something');
    console.log(data)
  }


  return (
    <div className="App">
      <h1>Sales Realtime Charts</h1>
      {
        records.map((record)=> <p>{record.month} : {record.totalsales}</p>)
      }
    </div>
  );
}

export default App;
