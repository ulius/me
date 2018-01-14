import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from './components/App'


const router = (
  <Router>
    <App/>
  </Router>
);

// export
export { router };
