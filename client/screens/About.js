import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
const Post = () => {
  // global state
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.home_wrap}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  home_wrap: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default Post;
