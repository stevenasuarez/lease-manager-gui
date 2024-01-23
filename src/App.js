import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateContractForm from './components/CreateContractForm';
import ViewContracts from './components/ViewContracts';
import ContractDetail from './components/ContractDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-contract" element={<CreateContractForm />} />
        <Route path="/view-contracts" element={<ViewContracts />} />
        <Route path="/contractDetails/:id" element={<ContractDetail />} />
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
