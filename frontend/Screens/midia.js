import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

import { colors } from "../components/theme";
import Screen from "../components/Screen";
import PageHeader from "../components/PageHeader";

const ESPESSURA_BORDA = 4;
const ALTURA_MAXIMA = 460;

const fotos = [
  require("../imagens/telaEscolha.png"),
  require("../imagens/TelaSala.png"),
  require("../imagens/TelaFSala.png"),
  require("../imagens/TelaCorredor.png"),
  require("../imagens/TelaQuarto.png"),
];


function FotoComBorda({ source }) {
  const [larguraColuna, setLarguraColuna] = useState(0);
  const [fotoCarregada, setFotoCarregada] = useState(null);

  const dimensoes =
    fotoCarregada?.source === source ? fotoCarregada : null;

  const larguraDisponivel = Math.max(
    1,
    larguraColuna - ESPESSURA_BORDA * 2
  );

  let largura = larguraDisponivel;
  let altura = Math.min(larguraDisponivel, ALTURA_MAXIMA);

  if (dimensoes) {
    const escala = Math.min(
      larguraDisponivel / dimensoes.width,
      ALTURA_MAXIMA / dimensoes.height
    );

    largura = dimensoes.width * escala;
    altura = dimensoes.height * escala;
  }

  function aoCarregar(evento) {
    const arquivo = evento.nativeEvent?.source;
    const width = arquivo?.width ?? evento.target?.naturalWidth;
    const height = arquivo?.height ?? evento.target?.naturalHeight;

    if (width > 0 && height > 0) {
      setFotoCarregada({ source, width, height });
    }
  }

  return (
    <View
      style={styles.colunaImagem}
      onLayout={({ nativeEvent }) => {
        setLarguraColuna(nativeEvent.layout.width);
      }}
    >
      <View
        style={[
          styles.moldura,
          { borderWidth: dimensoes && larguraColuna > 0 ? ESPESSURA_BORDA : 0 },
        ]}
      >
        <Image
          source={source}
          resizeMode="contain"
          onLoad={aoCarregar}
          style={{ width: largura, height: altura }}
        />
      </View>
    </View>
  );
}

function Carrossel({ imagens, titulo }) {
  const [indice, setIndice] = useState(0);
  const { width } = useWindowDimensions();
  const compact = width < 600;
  const proximoIndice = (indice + 1) % imagens.length;

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
          <FotoComBorda source={imagens[indice]} />

          {!compact && <FotoComBorda source={imagens[proximoIndice]} />}
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
        {indice + 1}{!compact && ` e ${proximoIndice + 1}`} / {imagens.length}
      </Text>
    </View>
  );
}

export default function Midia() {
  return (
    <Screen
      style={styles.container}
      contentContainerStyle={styles.areaRolagem}
    >
      <PageHeader />
      <Carrossel imagens={fotos} titulo="Jogo" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  areaRolagem: {
    paddingBottom: 24,
  },

  secao: {
    width: "96%",
    maxWidth: 940,
    alignSelf: "center",
    backgroundColor: colors.surface,
    paddingVertical: 16,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.ink,
    marginTop: 24,
  },

  titulo: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.ink,
    marginBottom: 16,
  },

  conteudo: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 8,
  },

  imagens: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  colunaImagem: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    alignItems: "center",
  },

  moldura: {
    backgroundColor: colors.surface,
    borderColor: colors.ink,
    borderRadius: 8,
    overflow: "hidden",
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
    color: colors.ink,
    marginTop: 12,
    marginBottom: 16,
  },
});
