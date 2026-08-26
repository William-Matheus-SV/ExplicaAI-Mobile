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
  materias: string[];
}

interface DadosTutor {
  tipo: 'tutor';
  nome: string;
  idade: string;
  matricula: string;
  bio: string;
  materiasLecionadas: string[];
  agendaDisponivel: SlotHorario[];
}

type DadosUsuario = DadosAluno | DadosTutor;

interface UsuarioContextType {
  usuario: DadosUsuario | null;
  token: string | null;
  salvarUsuario: (dados: DadosUsuario, token: string) => void;
  sair: () => void;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<DadosUsuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  function salvarUsuario(dados: DadosUsuario, novoToken: string) {
    setUsuario(dados);
    setToken(novoToken);
  }

  function sair() {
    setUsuario(null);
    setToken(null);
  }

  return (
    <UsuarioContext.Provider value={{ usuario, token, salvarUsuario, sair }}>
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