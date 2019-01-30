import * as React from 'react';
import { render } from 'react-dom';

const App = () => (
  <div style={{display: "flex"}}> {/*never ever do inline styles*/}
  <div style={{flex: 1}}>
<h2>Create user</h2>
  </div>
  <div style={{flex: 1}}>
  <h2>Signin user</h2>
  </div>
  <div style={{flex: 1}}>
  <h2>User api</h2>
  </div>
  </div>
);

render(<App />, document.getElementById('root'));
