import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

const fotos = [
  require("../imagens/exemplo.jpeg"),
  require("../imagens/exemplo.jpeg"),
  require("../imagens/exemplo.jpeg"),
];

const artes = [
  require("../imagens/exemplo.jpeg"),
  require("../imagens/exemplo.jpeg"),
  require("../imagens/exemplo.jpeg"),
];

function Carrossel({ imagens, titulo }) {
  const [indice, setIndice] = useState(0);
  const { width } = useWindowDimensions();
  const compact = width < 600;

  function avancar() {
    setIndice((anterior) => (anterior + 1) % imagens.length);
  }

  function voltar() {
    setIndice(
      (anterior) => (anterior - 1 + imagens.length) % imagens.length
    );
  }

  return (
    <View style={styles.secao}>
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}

      <View style={styles.conteudo}>
        <TouchableOpacity
          style={styles.botaoSeta}
          onPress={voltar}
          accessibilityLabel="Imagens anteriores"
          accessibilityRole="button"
        >
          <Image
            source={require("../imagens/seta-esquerda.png")}
            style={styles.imagemSeta}
          />
        </TouchableOpacity>

        <View style={styles.imagens}>
          <Image source={imagens[indice]} style={styles.imagem} />

          {!compact && <Image
            source={imagens[(indice + 1) % imagens.length]}
            style={styles.imagem}
          />}
        </View>

        <TouchableOpacity
          style={styles.botaoSeta}
          onPress={avancar}
          accessibilityLabel="Próximas imagens"
          accessibilityRole="button"
        >
          <Image
            source={require("../imagens/seta-direita.png")}
            style={styles.imagemSeta}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.contador}>
        {indice + 1}{!compact && ` e ${((indice + 1) % imagens.length) + 1}`} /{" "}
        {imagens.length}
      </Text>
    </View>
  );
}

export default function Sobre() {

  return (
    <Screen
      style={styles.container}
      contentContainerStyle={styles.areaRolagem}
    >
      <PageHeader />

      <Carrossel imagens={fotos} titulo="Jogo" />

      <Carrossel imagens={artes} titulo="Fanarts" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f7ff",
  },

  areaRolagem: {
    paddingBottom: 24,
  },





  secao: {
    paddingTop: 24,
  },

  titulo: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1b4656",
    marginBottom: 16,
  },

  conteudo: {
    width: "100%",
    maxWidth: 940,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 8,
  },

  imagens: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },

  imagem: {
    flex: 1,
    minWidth: 0,
    aspectRatio: 1,
    borderRadius: 10,
    resizeMode: "cover",
    borderWidth: 4,
    borderColor: "#1b4656",
  },

  botaoSeta: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  imagemSeta: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  contador: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
    marginTop: 12,
    marginBottom: 16,
  },
});