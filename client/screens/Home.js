import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import { PostContext } from "../context/postContext";
import PostCard from "../components/PostCard";
const Home = () => {
  // global state
  const [state] = useContext(AuthContext);
  const [posts] = useContext(PostContext);
  return (
    <View style={styles.home_wrap}>
      <PostCard posts={posts} />
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
