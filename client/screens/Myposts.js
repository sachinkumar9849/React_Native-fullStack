import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import PostCard from "../components/PostCard";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
const Myposts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  // get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  //   initial
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.home_wrap}>
      <PostCard posts={posts} />
      
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
export default Myposts;
