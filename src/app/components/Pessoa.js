"use client";

import React, { useState, useEffect } from 'react';

function Pessoa({ nome }) {
  const [gastos, setGastos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  // Carregar dados do Local Storage quando o componente for montado
  useEffect(() => {
    const dadosSalvos = localStorage.getItem(`gastos-${nome}`);
    if (dadosSalvos) {
      setGastos(JSON.parse(dadosSalvos));
    }
  }, [nome]);

  // Salvar dados no Local Storage sempre que os gastos forem atualizados
  useEffect(() => {
    localStorage.setItem(`gastos-${nome}`, JSON.stringify(gastos));
  }, [gastos, nome]);

  const adicionarGasto = () => {
    if (descricao && valor) {
      setGastos([...gastos, { descricao, valor: parseFloat(valor) }]);
      setDescricao('');
      setValor('');
    }
  };

  // Função para remover um gasto pelo índice
  const removerGasto = (index) => {
    const novosGastos = gastos.filter((_, i) => i !== index);
    setGastos(novosGastos);
  };

  const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  return (
    <div className="bg-black/70 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-white font-semibold mb-4">{nome}</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <button
          onClick={adicionarGasto}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Adicionar Gasto
        </button>
      </div>
      <h3 className="text-lg font-medium mb-2 text-white">Gastos:</h3>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        {gastos.map((gasto, index) => (
          <li key={index} className="flex justify-between items-center text-white">
            <span>
              {gasto.descricao}: R$ {gasto.valor.toFixed(2)}
            </span>
            <button
              onClick={() => removerGasto(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-bold text-white">Total: R$ {totalGastos.toFixed(2)}</h3>
    </div>
  );
}

export default Pessoa;
