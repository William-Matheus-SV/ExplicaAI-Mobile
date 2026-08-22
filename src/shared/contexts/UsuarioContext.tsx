import { createContext, useContext, useState, ReactNode } from 'react';

interface SlotHorario {
  dia: 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX';
  horario: string;
  duracao: 1 | 2;
}

interface DadosAluno {
  tipo: 'aluno';
  nome: string;
  idade: string;
  matricula: string;
  bio: string;
  materiasDificuldade: string[];
}

interface DadosTutor {
  tipo: 'tutor';
  nome: string;
  idade: string;
  matricula: string;
  bio: string;
  materiasLecionadas: string[];
  horariosDisponiveis: SlotHorario[];
}

type DadosUsuario = DadosAluno | DadosTutor;

interface UsuarioContextType {
  usuario: DadosUsuario | null;
  salvarUsuario: (dados: DadosUsuario) => void;
  sair: () => void;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<DadosUsuario | null>(null);

  function salvarUsuario(dados: DadosUsuario) {
    setUsuario(dados);
  }

  function sair() {
    setUsuario(null);
  }

  return (
    <UsuarioContext.Provider value={{ usuario, salvarUsuario, sair }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuario precisa ser usado dentro de um UsuarioProvider');
  }
  return context;
}