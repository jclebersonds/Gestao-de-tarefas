import { useState, useEffect } from "react";
import AdicionarTarefa from "./AdicionarTarefa";
import Progresso from "./Progresso";

interface Tarefa {
  id: number;
  descricao: string;
  periodo: "Manhã" | "Tarde" | "Noite";
  concluida: boolean;
}


const carregarTarefasDoLocalStorage = (): Tarefa[] => {
  return JSON.parse(localStorage.getItem("tarefas") || "[]") as Tarefa[];
};

const salvarTarefasNoLocalStorage = (tarefas: Tarefa[]) => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
};

const Tarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  /* Carregar tarefas ao montar o componente */
  useEffect(() => {
    const tarefasSalvas = carregarTarefasDoLocalStorage();
    if (tarefasSalvas.length > 0) {
      setTarefas(tarefasSalvas);
    }
  }, []);

  
  useEffect(() => {
    if (tarefas.length > 0) {
      salvarTarefasNoLocalStorage(tarefas);
    }
  }, [tarefas]);

  
  const adicionarTarefa = (novaTarefa: Tarefa) => {
    setTarefas((prevTarefas) => {
      const novasTarefas = [...prevTarefas, novaTarefa];
      salvarTarefasNoLocalStorage(novasTarefas);
      return novasTarefas;
    });
  };

  
  const atualizarTarefa = (id: number) => {
    setTarefas((prevTarefas) => {
      const novasTarefas = prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      );
      salvarTarefasNoLocalStorage(novasTarefas);
      return novasTarefas;
    });
  };

  
  const removerTarefa = (id: number) => {
    setTarefas((prevTarefas) => {
      const novasTarefas = prevTarefas.filter((tarefa) => tarefa.id !== id);
      salvarTarefasNoLocalStorage(novasTarefas);
      return novasTarefas;
    });
  };


  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const totalTarefas = tarefas.length;

  return (
    <div>
      <Progresso totalTarefas={totalTarefas} tarefasConcluidas={tarefasConcluidas} />
      <AdicionarTarefa adicionarTarefa={adicionarTarefa} />
      <div className="task-list">
        {["Manhã", "Tarde", "Noite"].map((periodo) => (
          <div className="column" key={periodo}>
            <h3>{periodo}</h3>
            <ul>
              {tarefas
                .filter((tarefa) => tarefa.periodo === periodo)
                .map((tarefa) => (
                  <li key={tarefa.id} className={`task-item ${tarefa.concluida ? "completed" : ""}`}>
                    <input type="checkbox" checked={tarefa.concluida} onChange={() => atualizarTarefa(tarefa.id)} />
                    {tarefa.descricao}
                    <button onClick={() => removerTarefa(tarefa.id)} className="delete-button">🗑️</button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tarefas;
