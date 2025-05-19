import React from "react";
import Tarefas from "./components/Tarefas";
import "./app.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Gestão de Tarefas</h1>
      <Tarefas />
    </div>
  );
};

export default App;
