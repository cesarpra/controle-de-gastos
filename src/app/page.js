"use client"

import React from 'react';
import Pessoa from './components/Pessoa';

function App() {
  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-700 to-red-700 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 bg-white/50 rounded max-w-2xl mx-auto">Gastos da Família</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Pessoa nome="Eu" />
        <Pessoa nome="Pai" />
        <Pessoa nome="Mãe" />
      </div>
    </div>
  );
}

export default App;
