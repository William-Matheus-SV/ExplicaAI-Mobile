import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";

interface FotoPerfilProps {
    theme: any;
    fotoAtual?: string;
    tipo: "aluno" | "tutor";
}

export default function FotoPerfil({
    theme,
    fotoAtual,
    tipo,
}: FotoPerfilProps) {

    const [fotoUri, setFotoUri] = useState<string | null>(
        fotoAtual ?? null
    );

    async function escolherFoto() {

        const permissao =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissao.granted) {
            alert("Precisamos de permissão para acessar suas fotos.");
            return;
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });

        if (!resultado.canceled) {

            const uriEscolhida = resultado.assets[0].uri;

            setFotoUri(uriEscolhida);

            // TODO:
            // enviar uriEscolhida para o backend
            // quando a rota de upload existir

            console.log("Foto escolhida:", uriEscolhida);
        }
    }

    const moldura =
        tipo === "aluno"
            ? require("../../../assets/profile/moldura-aluno.png")
            : require("../../../assets/profile/moldura-tutor.png");

    return (
        <View style={styles.container}>

            {/* FOTO DO USUÁRIO */}
            <View style={styles.avatar}>

                {fotoUri ? (
                    <Image
                        source={{ uri: fotoUri }}
                        style={styles.imagem}
                        resizeMode="cover"
                    />
                ) : (
                    <Ionicons
                        name="person"
                        size={70}
                        color="#d9d9e8"
                    />
                )}

            </View>

            {/* MOLDURA DO PERFIL */}
            <Image
                source={moldura}
                style={styles.moldura}
                resizeMode="contain"
            />

            {/* BOTÃO DA CÂMERA */}
            <Pressable
                style={[
                    styles.cameraBadge,
                    {
                        backgroundColor: theme.primary,
                    },
                ]}
                onPress={escolherFoto}
            >
                <Ionicons
                    name="camera"
                    size={16}
                    color="white"
                />
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: 170,
        height: 170,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    avatar: {
        width: 125,
        height: 125,
        borderRadius: 70,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },

        elevation: 5,
    },

    imagem: {
        width: "100%",
        height: "100%",
    },

    moldura: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    cameraBadge: {
        position: "absolute",
        left: -6,
        bottom: 5,

        width: 36,
        height: 36,
        borderRadius: 36,

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 3,
        borderColor: "white",

        zIndex: 10,
    },

});