
import './App.css';

import { Event } from 'react-socket-io';

function App() {

  const updateChartData = (data) =>{
    console.log('Something');
    console.log(data)
  }


  return (
    <div className="App">
      <h1>Sales Realtime Charts</h1>

      <Event event='newData' handler={updateChartData} />
    </div>
  );
}

export default App;
