import { colors } from '../components/theme';
import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function VerAvaliacoes({ navigation }) {
  const [avaliacoes, setAvaliacoes] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function buscarAvaliacoes() {
    try {
      setCarregando(true);
      setErro(null);

      const resposta = await fetch("http://localhost:3000/VerAvaliacoes");

      const dados = await resposta.json();

      if (resposta.ok) {
        setAvaliacoes(dados);
      } else {
        setErro(dados.mensagem || "Erro ao buscar avaliações.");
      }
    } catch (erro) {
      console.log("Erro ao buscar avaliações:", erro);

      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarAvaliacoes();
  }, []);

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

  return (
    <Screen contentContainerStyle={styles.container}>
      <PageHeader />
      <View style={styles.content}>
        <View style={styles.intro}>
          <Text style={styles.kicker}>COMUNIDADE LOOM</Text>
          <Text accessibilityRole="header" style={styles.title}>Avaliações</Text>
          <Text style={styles.subtitle}>Veja o que outras pessoas acharam do jogo.</Text>
          <View style={styles.actions}>
            <TouchableOpacity accessibilityRole="button" style={[styles.button, styles.primary]}
              onPress={() => navigation.navigate("FazerAvaliacao")}>
              <Text style={styles.primaryLabel}>Fazer uma avaliação</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: carregando }}
              disabled={carregando} style={[styles.button, styles.secondary, carregando && styles.disabled]}
              onPress={buscarAvaliacoes}>
              <Text style={styles.secondaryLabel}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {carregando || erro || avaliacoes.length === 0 ? (
          <View style={[styles.card, styles.status]} accessibilityLiveRegion="polite">
            {carregando && <ActivityIndicator color={colors.primary} />}
            <Text style={styles.subtitle}>
              {carregando ? "Carregando avaliações…" : erro || "Ainda não há avaliações."}
            </Text>
          </View>
        ) : (
          avaliacoes.map((avaliacao) => (
            <View key={avaliacao.id_postagem} style={styles.card}>
              <View style={styles.rating}>
                <Text style={styles.stars} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                  {mostrarEstrelas(avaliacao.nota)}
                </Text>
                <Text style={styles.score} accessibilityLabel={avaliacao.nota + " de 5"}>{avaliacao.nota}/5</Text>
              </View>
              <Text style={styles.comment}>{avaliacao.comentario}</Text>
              {avaliacao.data_postagem && (
                <Text style={styles.date}>{new Date(avaliacao.data_postagem).toLocaleDateString("pt-BR")}</Text>
              )}
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.canvas },
  content: { width: "100%", maxWidth: 800, alignSelf: "center", padding: 16, paddingBottom: 48, gap: 16 },
  intro: { backgroundColor: colors.tint, borderRadius: 20, padding: 20, gap: 8 },
  kicker: { color: colors.accent, fontWeight: "800", fontSize: 12, letterSpacing: 2 },
  title: { color: colors.ink, fontSize: 34, fontWeight: "900" },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  button: { minHeight: 44, maxWidth: "100%", justifyContent: "center", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  disabled: { opacity: 0.65 },
  primaryLabel: { color: colors.surface, fontSize: 15, fontWeight: "800" },
  secondaryLabel: { color: colors.primary, fontSize: 15, fontWeight: "700" },
  card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.line, padding: 16, gap: 12 },
  status: { alignItems: "center", paddingVertical: 24 },
  rating: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 },
  stars: { color: colors.accent, fontSize: 22, letterSpacing: 2 },
  score: { color: colors.accent, backgroundColor: colors.tint, fontWeight: "800", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  comment: { color: colors.corTexto, fontSize: 16, lineHeight: 24 },
  date: { color: colors.muted, fontSize: 13 },
});
