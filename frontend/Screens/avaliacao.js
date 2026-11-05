import { useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function VerAvaliacoes({ navigation }) {
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const overrides = { card: { paddingHorizontal: compact ? 16 : 22 } };
  const styles = Object.fromEntries(Object.entries(baseStyles).map(([key, value]) => [key, [value, overrides[key]]]));
  const [avaliacoes, setAvaliacoes] = useState([]);

  const [carregando, setCarregando] = useState(true);

  // ========================================
  // BUSCAR AVALIAÇÕES
  // ========================================

  async function buscarAvaliacoes() {
    try {
      setCarregando(true);

      const resposta = await fetch("http://localhost:3000/VerAvaliacoes");

      const dados = await resposta.json();

      if (resposta.ok) {
        setAvaliacoes(dados);
      } else {
        Alert.alert("Erro", dados.mensagem || "Erro ao buscar avaliações.");
      }
    } catch (erro) {
      console.log("Erro ao buscar avaliações:", erro);

      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  // ========================================
  // CARREGA QUANDO ABRIR A TELA
  // ========================================

  useEffect(() => {
    buscarAvaliacoes();
  }, []);

  // ========================================
  // TRANSFORMA A NOTA EM ESTRELAS
  // ========================================

  function mostrarEstrelas(nota) {
    let estrelas = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= nota) {
        estrelas += "★";
      } else {
        estrelas += "☆";
      }
    }

    return estrelas;
  }

  // ========================================
  // TELA
  // ========================================

  return (
    <Screen contentContainerStyle={styles.container}>
      <PageHeader />
      <View style={styles.caixaPrincipal}>
        <Text style={styles.titulo}>Avaliações do LOOM</Text>

        <Text style={styles.subtitulo}>
          Veja o que outras pessoas acharam do jogo.
        </Text>

        {/* CARREGANDO */}

        {carregando ? (
          <ActivityIndicator size="large" color="#F5A9B8" />
        ) : avaliacoes.length === 0 ? (
          // NENHUMA AVALIAÇÃO

          <Text style={styles.semAvaliacoes}>
            Nenhuma avaliação encontrada.
          </Text>
        ) : (
          // MOSTRA AS AVALIAÇÕES

          avaliacoes.map((avaliacao) => (
            <View key={avaliacao.id_postagem} style={styles.card}>
              <View style={styles.topoCard}>
                <Text style={styles.estrelas}>
                  {mostrarEstrelas(avaliacao.nota)}
                </Text>

                <Text style={styles.nota}>{avaliacao.nota}/5</Text>
              </View>

              <Text style={styles.comentario}>{avaliacao.comentario}</Text>

              {avaliacao.data_postagem && (
                <Text style={styles.data}>
                  {new Date(avaliacao.data_postagem).toLocaleDateString(
                    "pt-BR",
                  )}
                </Text>
              )}
            </View>
          ))
        )}

        {/* FAZER AVALIAÇÃO */}

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("FazerAvaliacao")}
        >
          <Text style={styles.botaoTexto}>Fazer uma avaliação</Text>
        </TouchableOpacity>

        {/* ATUALIZAR */}

        <TouchableOpacity
          style={styles.botaoAtualizar}
          onPress={buscarAvaliacoes}
        >
          <Text style={styles.botaoAtualizarTexto}>Atualizar avaliações</Text>
        </TouchableOpacity>

        {/* VOLTAR */}

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate("avaliacao")}
        >
          <Text style={styles.botaoVoltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
const baseStyles = StyleSheet.create({
  // =========================
  // PÁGINA
  // =========================

  container: {
    flexGrow: 1,
    backgroundColor: "#F5FBFF",
    alignItems: "center",
    paddingBottom: 50,
  },

  // =========================
  // HEADER
  // =========================




  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },

  // =========================
  // CONTEÚDO PRINCIPAL
  // =========================

  caixaPrincipal: {
    width: "90%",
    maxWidth: 750,

    alignItems: "center",

    paddingTop: 45,
  },

  // =========================
  // TÍTULO
  // =========================

  titulo: {
    fontSize: 34,
    fontWeight: "900",
    color: "#292929",

    textAlign: "center",

    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: "#777",

    lineHeight: 24,
    textAlign: "center",

    maxWidth: 450,

    marginBottom: 35,
  },

  // =========================
  // CARD DE AVALIAÇÃO
  // =========================

  card: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 20,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: "#DCEFF7",

    // sombra Android
    elevation: 3,

    // sombra Web / iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  // =========================
  // TOPO DO CARD
  // =========================

  topoCard: {
    flexWrap: "wrap",
    gap: 8,
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingBottom: 14,

    marginBottom: 14,

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  estrelas: {
    fontSize: 25,
    color: "#F5A9B8",

    letterSpacing: 2,
  },

  nota: {
    backgroundColor: "#EAF8FF",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,

    fontSize: 14,
    fontWeight: "800",

    color: "#2796C4",
  },

  // =========================
  // COMENTÁRIO
  // =========================

  comentario: {
    width: "100%",

    fontSize: 16,
    color: "#3D3D3D",

    lineHeight: 24,
  },

  // =========================
  // DATA
  // =========================

  data: {
    width: "100%",

    marginTop: 15,

    fontSize: 12,
    color: "#999",

    textAlign: "right",
  },

  // =========================
  // SEM AVALIAÇÕES
  // =========================

  semAvaliacoes: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    padding: 30,

    borderRadius: 18,

    fontSize: 16,
    color: "#777",

    textAlign: "center",

    marginVertical: 30,

    borderWidth: 1,
    borderColor: "#DCEFF7",
  },

  // =========================
  // BOTÃO PRINCIPAL
  // =========================

  botao: {
    width: "100%",

    backgroundColor: "#F5A9B8",

    paddingVertical: 16,

    borderRadius: 14,

    alignItems: "center",

    marginTop: 20,

    shadowColor: "#F5A9B8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    elevation: 3,
  },

  botaoTexto: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "800",

    letterSpacing: 0.3,
  },

  // =========================
  // ATUALIZAR
  // =========================

  botaoAtualizar: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderWidth: 2,
    borderColor: "#5BCEFA",

    paddingVertical: 14,

    borderRadius: 14,

    alignItems: "center",

    marginTop: 12,
  },

  botaoAtualizarTexto: {
    color: "#2796C4",

    fontSize: 15,
    fontWeight: "700",
  },

  // =========================
  // VOLTAR
  // =========================

  botaoVoltar: {
    paddingHorizontal: 25,
    paddingVertical: 12,

    marginTop: 12,
    marginBottom: 20,
  },

  botaoVoltarTexto: {
    color: "#777",

    fontSize: 14,
    fontWeight: "600",
  },
});
