"use client"
import Pessoa from "./components/Pessoa";

export default function App() {
  return (
    <div className="container mx-auto p-4 space-y-4  bg-gradient-to-r from-blue-700 to-red-700">
      {/* Seção "Eu" com largura limitada e rolagem */}
      <div className="bg-black/30 rounded-lg shadow-md p-4 h-64 overflow-y-auto max-w-md mx-auto">
        <Pessoa nome="Eu" />
      </div>

      {/* Seção "Pai" com largura limitada e rolagem */}
      <div className="bg-black/30 rounded-lg shadow-md p-4 h-64 overflow-y-auto max-w-md mx-auto">
        <Pessoa nome="Pai" />
      </div>

      {/* Seção "Mãe" com largura limitada e rolagem */}
      <div className="bg-black/30 rounded-lg shadow-md p-4 h-64 overflow-y-auto max-w-md mx-auto">
        <Pessoa nome="Mãe" />
      </div>
    </div>
  );
}
