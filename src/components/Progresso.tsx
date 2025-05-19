const Progresso: React.FC<{ totalTarefas: number; tarefasConcluidas: number }> = ({ totalTarefas, tarefasConcluidas }) => {
  const progresso = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0;

  return (
    <div className="progress-container">
      <h3>Progresso de Conclusão</h3>
      <p>{tarefasConcluidas} de {totalTarefas} tarefas concluídas</p>
      <progress value={progresso} max={100}></progress>
      <p>{progresso.toFixed(2)}%</p>
    </div>
  );
};

export default Progresso;
