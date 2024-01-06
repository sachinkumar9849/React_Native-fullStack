import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import { AuthContext } from "../context/authContext";
import { PostContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import PostCard from "../components/PostCard";


const Home = () => {
  // global state
  const [state] = useContext(AuthContext);
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  // refresh control

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.home_wrap}>
      <PostCard posts={posts} refreshing={refreshing} onRefresh={onRefresh} />
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
