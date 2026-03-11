import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Health from './screens/Health';
import Settings from './screens/Settings';
import Journal from './screens/Journal';
import JournalList from './screens/JournalList';
import Audio from './screens/Audio';
import Gratitude from './screens/Gratitude';
import Grounding from './screens/Grounding';
import Contact from './screens/Contact';

// Global context for mood state
export const AppContext = createContext();

function App() {
  const [currentMood, setCurrentMood] = useState('calm'); // 'calm' or 'stressed'

  const toggleMood = () => {
    setCurrentMood((prev) => (prev === 'calm' ? 'stressed' : 'calm'));
  };

  return (
    <AppContext.Provider value={{ currentMood, setCurrentMood, toggleMood }}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/health" element={<Health />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal-list" element={<JournalList />} />
            <Route path="/audio" element={<Audio />} />
            <Route path="/gratitude" element={<Gratitude />} />
            <Route path="/grounding" element={<Grounding />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
