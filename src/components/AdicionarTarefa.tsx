import { useState } from "react";

interface Tarefa {
  id: number;
  descricao: string;
  periodo: "Manhã" | "Tarde" | "Noite";
  concluida: boolean;
}

interface AdicionarTarefaProps {
  adicionarTarefa: (tarefa: Tarefa) => void;
}

const AdicionarTarefa: React.FC<AdicionarTarefaProps> = ({ adicionarTarefa }) => {
  const [descricao, setDescricao] = useState<string>("");
  const [periodo, setPeriodo] = useState<"Manhã" | "Tarde" | "Noite">("Manhã");

  const handleSubmit = () => {
    if (!descricao.trim()) return;

    const novaTarefa: Tarefa = {
      id: Date.now(), 
      descricao,
      periodo,
      concluida: false,
    };

    adicionarTarefa(novaTarefa);
    setDescricao("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Descrição da tarefa"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <select value={periodo} onChange={(e) => setPeriodo(e.target.value as "Manhã" | "Tarde" | "Noite")}>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
        <option value="Noite">Noite</option>
      </select>
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
};

export default AdicionarTarefa;
