import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
const Home = () => {
  // global state
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.home_wrap}>
      <Text style={{ marginTop: 100 }}>{JSON.stringify(state, null, 4)}</Text>
      <FooterMenu />
    </View>
  );
};
const styles = StyleSheet.create({
  home_wrap: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default Home;
