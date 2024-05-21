// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StickyHeader from './components/StickyHeader';
import FeedbackForm from './components/FeedbackForm';
import Submissions from './components/submissions';
import SingleSubmission from './components/SingleSubmission';

function App() {
  return (
    <div className="App">
      <StickyHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="submission/:id" element={<SingleSubmission />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
