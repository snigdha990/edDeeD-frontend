import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schools from './pages/Schools';
import SuggestSchoolForm from './components/SuggestSchoolForm'; 
import AdminApproval from './components/AdminApproval'; 
import Tuitions from './pages/Tuitions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path='/beyond-school' element={<Tuitions />}/>
        <Route path="/suggest-school" element={<SuggestSchoolForm />} /> 
        <Route path="/admin/suggestions" element={<AdminApproval />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
