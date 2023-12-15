import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
 import CustomerDashboard from './components/CustomerDashboard';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';


function App() {
  const authToken = localStorage.getItem('authToken');
  return (
    <div className="App">
  
     <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
