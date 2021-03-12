import {useEffect, useState} from "react"
import './App.css';
import useSanityListener from "./useSanityListener";
import { Bar } from 'react-chartjs-2';


function App() {

  const { salesRecords } = useSanityListener("z9l7ba4w");

  const [records, setSalesRecords] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {

    if(salesRecords && salesRecords.length > 0){
      console.log(salesRecords)
      let labels = ['January', 'February','March', 'April', 'May', 'June','July'];
    

      let salesData = labels.map(label=> {

        console.log(label);

        const monthData = salesRecords.filter(record => record.month === label);

        console.log(monthData);

        return monthData[0].totalsales
      })
      //let salesData = salesRecords.map(record => record.totalsales);

      console.log(labels);
      console.log(salesData)

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Sales Data Set',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: salesData
          }
        ]
      }

      setChartData(data)

      setSalesRecords(salesRecords);
    }

    
  }, [salesRecords])


  return (
    <div className="App">
      <h1>Sales Realtime Charts</h1>
      <Bar
        data={chartData}
        
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          },
        }}
      />
      
    </div>
  );
}

export default App;
