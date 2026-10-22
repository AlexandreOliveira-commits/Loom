import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

          <Image
            source={imagens[(indice + 1) % imagens.length]}
            style={styles.imagem}
          />
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
        {indice + 1} e {((indice + 1) % imagens.length) + 1} /{" "}
        {imagens.length}
      </Text>
    </View>
  );
}

export default function Sobre() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.areaRolagem}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>LOOM</Text>

        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate("Sobre")}>
            <Text style={styles.subtitle}>Sobre</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Baixar")}>
            <Text style={styles.subtitle}>Baixar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("avaliacao")}>
            <Text style={styles.subtitle}>Avaliações</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("midia")}>
            <Text style={styles.subtitle}>Mídia</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Text style={styles.subtitle}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Carrossel imagens={fotos} />

      <Carrossel imagens={artes} titulo="Fanarts" />
    </ScrollView>
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

  header: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingVertical: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 4,
    borderBottomColor: "#F5A9B8",
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5BCEFA",
  },

  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 20,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
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