import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

// ===================================================================
// [O QUE ESSE ARQUIVO FAZ]
// Um modal genérico de "pergunta com 2 botões", pra usar no lugar de
// Alert.alert(titulo, mensagem, [botao1, botao2]) — que não funciona
// no navegador quando tem mais de 1 botão customizado.
//
// Serve pros 3 casos que a gente precisa:
// 1. Cancelar aula (botão vermelho/laranja de "ação destrutiva")
// 2. Confirmar presença (botão verde normal)
// 3. Sucesso do agendamento (os dois botões são "positivos", sem nada destrutivo)
// ===================================================================

interface ModalConfirmacaoProps {
  visivel: boolean;               // controla se o modal aparece na tela ou não
  titulo: string;                 // texto grande, no topo (ex: "Cancelar aula")
  mensagem: string;                // texto menor, embaixo do título
  textoBotaoSecundario: string;    // botão da esquerda (ex: "Voltar", "Continuar buscando")
  textoBotaoPrimario: string;      // botão da direita (ex: "Confirmar", "Cancelar aula")
  corPrimaria: string;             // cor do tema (themeAluno.primary ou themeTutor.primary)
  destrutivo?: boolean;            // se true, o botão primário fica vermelho/laranja em vez da cor do tema
  aoFechar: () => void;            // o que fazer ao clicar no botão secundário (geralmente só fecha o modal)
  aoConfirmar: () => void;         // o que fazer ao clicar no botão primário (a ação de verdade)
}

export default function ModalConfirmacao({
  visivel,
  titulo,
  mensagem,
  textoBotaoSecundario,
  textoBotaoPrimario,
  corPrimaria,
  destrutivo = false,
  aoFechar,
  aoConfirmar,
}: ModalConfirmacaoProps) {

  // Cor do botão da direita: vermelho/laranja se for ação destrutiva, senão a cor do tema
  const corBotaoPrimario = destrutivo ? "#F57C00" : corPrimaria;

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={aoFechar}>

      {/* ===================================================================
          [FUNDO ESCURO] 
          Ocupa a tela inteira. Clicar nele fecha o modal (mesmo comportamento
          de clicar "fora" de um Alert nativo).
      =================================================================== */}
      <Pressable style={styles.fundo} onPress={aoFechar}>

        {/* ===================================================================
            [CAIXA BRANCA DO MEIO] 
            stopPropagation impede que o clique DENTRO da caixa feche o modal
            (senão, clicar em qualquer lugar dela, incluindo os botões, fecharia
            sem querer antes de processar o clique do botão em si).
        =================================================================== */}
        <Pressable style={styles.caixa} onPress={(e) => e.stopPropagation()}>

          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>

          <View style={styles.linhaBotoes}>

            {/* ===================================================================
                [BOTÃO SECUNDÁRIO — esquerda, neutro] 
            =================================================================== */}
            <Pressable style={styles.botaoSecundario} onPress={aoFechar}>
              <Text style={styles.textoBotaoSecundario}>{textoBotaoSecundario}</Text>
            </Pressable>

            {/* ===================================================================
                [BOTÃO PRIMÁRIO — direita, a ação principal] 
            =================================================================== */}
            <Pressable
              style={[styles.botaoPrimario, { backgroundColor: corBotaoPrimario }]}
              onPress={aoConfirmar}
            >
              <Text style={styles.textoBotaoPrimario}>{textoBotaoPrimario}</Text>
            </Pressable>

          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  caixa: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  mensagem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  linhaBotoes: {
    flexDirection: "row",
    gap: 10,
  },
  botaoSecundario: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  textoBotaoSecundario: {
    color: "#2b2b2b",
    fontWeight: "600",
    fontSize: 14,
  },
  botaoPrimario: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  textoBotaoPrimario: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
