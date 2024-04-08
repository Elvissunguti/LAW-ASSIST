import './App.css';
import ChatPage from './Components/ChatPage/ChatPage';
import Home from './Components/Home';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/c' element={<Home />} />
          <Route path="/home" element={<ChatPage />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
