import React from 'react';
import TimePicker from './components/TimePicker';
import logo from './logo.svg';

function App() {
  return (
    <div className="App" style={{marginLeft: '50%', marginTop:'10%'}}>
      <header className="App-header">
        <TimePicker minuteStep={1}
          disabledTimes={[{startTime:'07:30', endTime:'08:20'}]}
        />
      </header>
    </div>
  );
}

export default App;
