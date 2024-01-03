import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import moment from "moment";

const PostCard = ({ posts, showTime24Format }) => {
  const renderItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={{ color: "green", fontWeight: "bold", marginTop: 11 }}>
        {item.postedBy.name}
      </Text>
      <Text style={{ color: "red" }}>
        {moment(item.createdAt).format(
          `DD-MM-YYYY`
        )}
      </Text>
    </View>
  );
  

  return (
    <View style={styles.postCardContainer}>
      <View style={styles.postCountContainer}>
        <Text
          style={styles.postCountText}
        >{`Total Posts: ${posts.length}`}</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postCardContainer: {
    flex: 1,
  },
  postItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postCountContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
  },
  postCountText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
  timeText: {
    color: "gray",
  },
});

export default PostCard;
