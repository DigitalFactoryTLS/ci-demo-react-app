import React from 'react';
import CSS from 'csstype';
import Counter from './Counter';
import './App.css';

function App() {
  const AppStyles: CSS.Properties = {
    margin: '10px'
}
  return (
    <div style={AppStyles}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"/>
      <Counter/>
    </div>
  );
}

export default App;
