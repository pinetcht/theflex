
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './roots/Homepage';
import PropertyPage from './roots/PropertyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
