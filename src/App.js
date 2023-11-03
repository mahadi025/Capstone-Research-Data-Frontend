import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import DataPage from "./pages/DataPage";
import DataListPage from './pages/DataListPage';


function App() {
  return (
    <Router>
      <div>
        <div>
          <Header />
          <Routes>
            <Route path="/" exact Component={DataListPage} />
            <Route path="/capstone-data/:id" Component={DataPage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
