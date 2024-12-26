import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Asset } from "expo-asset";
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    const loadAsset = async () => {
      const asset = Asset.fromModule(require("./../../assets/images/image.jpg"));
      await asset.downloadAsync();
      setImageUri(asset.localUri || null);
    };

    loadAsset();
  }, []);

  const shareImage = async () => {
    try {
      if (imageUri) { // Correct case usage
        await Sharing.shareAsync(imageUri);
      } else {
        console.log("Image URI is not set");
      }
    } catch (error) {
      console.error("Oops, failed to share image", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image source={require("./../../assets/images/image.jpg")} style={styles.img} />
      </View>

      <Text style={styles.desc}>
        Share the image and also subscribe to this channel, so that you can encourage me to drop videos on features in React Native /Expo that may be difficult for you to handle
      </Text>

      <TouchableOpacity onPress={shareImage} style={styles.btn}>
        <FontAwesome name="share" size={24} color="white" />
        <Text style={styles.btnText}> Share Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  img: {
    width: 300,
    height: 200,
  },
  iconWrapper: {
    marginBottom: 15,
  },
  desc: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});
