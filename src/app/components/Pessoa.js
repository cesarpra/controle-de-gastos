"use client";

import React, { useState, useEffect } from "react";

function Pessoa({ nome }) {
  const [gastos, setGastos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [pagamentos, setPagamentos] = useState([]); // Estado para armazenar pagamentos
  const [valorPago, setValorPago] = useState("");

  // Carregar dados do Local Storage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem(`gastos-${nome}`);
    const pagamentosSalvos = localStorage.getItem(`pagamentos-${nome}`);
    if (dadosSalvos) {
      setGastos(JSON.parse(dadosSalvos));
    }
    if (pagamentosSalvos) {
      setPagamentos(JSON.parse(pagamentosSalvos));
    }
  }, [nome]);

  // Salvar dados no Local Storage
  useEffect(() => {
    localStorage.setItem(`gastos-${nome}`, JSON.stringify(gastos));
  }, [gastos, nome]);

  useEffect(() => {
    localStorage.setItem(`pagamentos-${nome}`, JSON.stringify(pagamentos));
  }, [pagamentos, nome]);

  const adicionarGasto = () => {
    if (descricao && valor) {
      setGastos([...gastos, { descricao, valor: parseFloat(valor) }]);
      setDescricao("");
      setValor("");
    }
  };

  // Função para remover um gasto
  const removerGasto = (index) => {
    const novosGastos = gastos.filter((_, i) => i !== index);
    setGastos(novosGastos);
  };

  // Função para adicionar um pagamento
  const adicionarPagamento = () => {
    if (valorPago) {
      setPagamentos([...pagamentos, parseFloat(valorPago)]);
      setValorPago("");
    }
  };

  // Total de gastos
  const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  // Total de pagamentos
  const totalPagamentos = pagamentos.reduce((total, pagamento) => total + pagamento, 0);

  // Total restante após os pagamentos
  const totalRestante = totalGastos - totalPagamentos;

  return (
    <div className="bg-black/80 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{nome}</h2>

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

      <h3 className="text-lg font-medium mb-2">Gastos:</h3>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        {gastos.map((gasto, index) => (
          <li key={index} className="flex justify-between items-center">
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

      <h3 className="text-lg font-bold mb-2">Total de Gastos: R$ {totalGastos.toFixed(2)}</h3>

      <div className="mt-4">
        <input
          type="number"
          placeholder="Valor Pago"
          value={valorPago}
          onChange={(e) => setValorPago(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <button
          onClick={adicionarPagamento}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Registrar Pagamento
        </button>
      </div>

      <h3 className="text-lg font-medium mt-4 mb-2">Pagamentos:</h3>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        {pagamentos.map((pagamento, index) => (
          <li key={index}>R$ {pagamento.toFixed(2)}</li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-4">
        Total Restante: R$ {totalRestante.toFixed(2)}
      </h3>
    </div>
  );
}

export default Pessoa;
