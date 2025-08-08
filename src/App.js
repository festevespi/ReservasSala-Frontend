import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReservasListagem from './components/ReservasListagem';
import ReservaForm from './components/ReservaForm';
import ReservaEditarForm from './components/ReservaEditarForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReservasListagem />} />
        <Route path="/reservas/inserir" element={<ReservaForm />} />
        <Route path="/reservas/editar/:id" element={<ReservaEditarForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;