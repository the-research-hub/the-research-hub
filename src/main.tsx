import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { About } from './pages/About';
import { Submit } from './pages/Submit';
import { AuthorGuidelines } from './pages/AuthorGuidelines';
import './index.css';
import {Editorial} from './pages/Editorial';
import JournalPage from './pages/JournalPage';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="about" element={<About />} />
          <Route path="submit" element={<Submit />} />
          <Route path="author-guidelines" element={<AuthorGuidelines />} />
          <Route path="editorial" element={<Editorial />} />
          <Route path="journalpage" element={<JournalPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);