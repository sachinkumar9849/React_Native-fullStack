import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import FooterMenu from "../components/Menus/FooterMenu";
import { PostContext } from "../context/postContext";

const Post = ({ navigation }) => {
  // global state
  const [state] = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useContext(PostContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Ensure title and description are not empty
      if (!title || !description) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        console.log("Title and description are required.");
        return;
      }

      // Prepare the data for the POST request
      const postData = {
        title: title,
        description: description,
      };

      // Send a POST request to your API
      const response = await axios.post("/post/create-post", postData);
      setLoading(false);
      setPosts([...posts, response.data?.post]); // Update this line
      Alert.alert("Post created successfully");
      // Handle the response from the API
      console.log("Post created successfully:", response.data);

      // Clear the form fields after successful submission
      navigation.navigate("Home");
      setTitle("");
      setDescription("");
    } catch (error) {
      setLoading(false);
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <View style={styles.home_wrap}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.createPostTitle}>Create Post</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]} // Apply additional styles for multiline input
            placeholder="Enter description"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Button pressed");
              handleSubmit();
            }}
          >
            <Text style={styles.buttonText}>
              {loading ? "Please wait.." : "Post create"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createPostTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  multilineInput: {
    height: 100, // Set the desired height for multiline input
  },
});

export default Post;
