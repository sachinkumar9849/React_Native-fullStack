import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, Alert } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, showTime24Format, myPostScreen }) => {
  const navigation = useNavigation();
  const [post, setPost] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await axios.delete(`/post/delete-user-post/${id}`);
      const data = response.data;
      alert(data?.message);
      navigation.push("Myposts");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const renderItem = ({ item, id }) => (
    <View style={styles.postItem}>
      <View style={styles.itemTitleWrap}>
        {myPostScreen ? <Text style={styles.myPostTitle}>{item.title}</Text>:<Text style={styles.postTitle}>{item.title}</Text>}
        
        {myPostScreen && (
          <View style={styles.iconsContainer}>
            <Icon
              onPress={() => handleDeletePrompt(item?._id)}
              color={"red"}
              name="trash"
              style={styles.icons}
              size={24}
            />
            <Icon
              onPress={() => {
                setPost(item);
                setModalVisible(true);
              }}
              color={"green"}
              name="edit"
              size={24}
            />
          </View>
        )}
      </View>

      <Text>{item.description}</Text>
      <View style={styles.detailsContainer}>
        {item.postedBy && item.postedBy.name && (
          <View style={styles.userContainer}>
            <Icon name="user" style={styles.userIcon} />
            <Text style={styles.nameText}>{item.postedBy.name}</Text>
          </View>
        )}
        <View style={styles.dateContainer}>
          <Icon name="calendar" style={styles.calendarIcon} />
          <Text style={{ color: "red" }}>
            {moment(item.createdAt).format(`DD-MM-YYYY `)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.postCountContainer}>
        <Text style={styles.postCountText}>{`Total Posts: ${posts.length}`}</Text>
      </View>
      <View style={styles.postCardContainer}>
        {myPostScreen && (
          <EditModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            post={post}
          />
        )}
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => (item?._id ? item._id.toString() : "")}
        />
      </View>
    </>
  );
};






const styles = StyleSheet.create({
  postCardContainer: {
    flex: 1,
    padding: 10,
  },
  postItem: {
    padding: 10,
    backgroundColor: "#dedede",
    marginBottom: 20,
    borderRadius: 6,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    
  },
  myPostTitle:{
    fontSize: 18,
    fontWeight: "bold",
    width:"80%"
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
  itemTitleWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 10,
  },
  iconsDelete: {
    marginBottom: 11,
    display: "flex", // Change this line
  },
  nameText: {
    color: "gray",
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icons: {
    marginHorizontal: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    color: "gray",
    marginRight: 5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    color: "red",
    marginRight: 5,
  },
  nameText: {
    color: "gray",
    fontWeight: "bold",
  },
});

export default PostCard;
