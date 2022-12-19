import React, { useState } from 'react';
import TimePicker from './components/TimePicker';

function App() {
  const [time, setTime] = useState('00:00');
  return (
    <div className="App" style={{marginLeft: '50%', marginTop:'10%'}}>
      <header className="App-header">
        <TimePicker minuteStep={1}
          disabledTimes={[{startTime:'13:00', endTime:'22:20'},
          {startTime:'07:30', endTime:'10:20'}]}
          setTime={setTime}
        />
        <TimePicker minuteStep={1}
          disabledTimes={[{startTime:'19:30', endTime:'22:20'},
          {startTime:'07:30', endTime:'10:20'}]}
          setTime={setTime}
        />
      </header>
      {time}
    </div>
  );
}

export default App;
