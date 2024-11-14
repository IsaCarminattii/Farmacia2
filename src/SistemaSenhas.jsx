import React, { useState } from 'react';
import './SistemaSenhas.css';

const SistemaSenhas = () => {
  const [fila, setFila] = useState([]);
  const [senhaAtual, setSenhaAtual] = useState(null);
  const [contadorNormal, setContadorNormal] = useState(1);
  const [contadorPreferencial, setContadorPreferencial] = useState(1);

 
  const gerarSenha = (tipo) => {
    const novaSenha = {
      tipo,
      numero: tipo === 'Normal' ? contadorNormal : contadorPreferencial,
    };

    setFila((prevFila) => [...prevFila, novaSenha]);
    tipo === 'Normal' ? setContadorNormal(contadorNormal + 1) : setContadorPreferencial(contadorPreferencial + 1);
  };


  const chamarSenha = () => {
    if (fila.length === 0) {
      setSenhaAtual('Fila Vazia');
      return;
    }

    const filaPreferencial = fila.filter((senha) => senha.tipo === 'Preferencial');
    const filaNormal = fila.filter((senha) => senha.tipo === 'Normal');

    const proximaSenha = filaPreferencial.length > 0
      ? filaPreferencial.reduce((menor, atual) => (atual.numero < menor.numero ? atual : menor))
      : filaNormal.reduce((menor, atual) => (atual.numero < menor.numero ? atual : menor));

    setSenhaAtual(`${proximaSenha.tipo} ${proximaSenha.numero}`);
    setFila((prevFila) => prevFila.filter((senha) => senha !== proximaSenha));
  };

  return (
    <div className="sistema-senhas">
      <h1>Gestão de Senhas de Atendimento</h1>
      <button className="btn-normal" onClick={() => gerarSenha('Normal')}>Gerar Senha Normal</button>
      <button className="btn-preferencial" onClick={() => gerarSenha('Preferencial')}>Gerar Senha Preferencial</button>
      <button className="btn-chamar" onClick={chamarSenha}>Chamar Próxima Senha</button>
      <div className="senha-atual">
        Senha Atual: {senhaAtual || 'Nenhuma senha chamada'}
      </div>
      <div className="fila-status">
        Fila: {fila.length > 0 ? fila.map(s => `${s.tipo} ${s.numero}`).join(', ') : 'Fila Vazia'}
      </div>
    </div>
  );
};

export default SistemaSenhas;
