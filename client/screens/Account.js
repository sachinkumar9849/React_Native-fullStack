import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

import { Input, Button } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  // global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const [name, setName] = useState(user?.name);
  const [email] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [loading, setLoading] = useState(false);

  // handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth//update-user", {
        name,
        password,
        email,
      });
      setLoading(true);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.home_wrap}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
              }}
              style={styles.image}
            />
            <View style={{ marginBottom: 10 }}>
              <Text>Currently You Can Only Update Your Name and Password</Text>
            </View>
          </View>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input} // Add this line
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={state?.user.email}
            editable={false}
            keyboardType="email-address"
            style={styles.input} // Add this line
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input} // Add this line
          />
          <TextInput
            label="Role"
            placeholder="Enter your role"
            value={state?.user.role}
            editable={false}
            style={styles.input} // Add this line
          />

          <TouchableOpacity onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? "Please Wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ justifyContent: "flex-end" }}>
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
    marginBottom: 22,
    padding: 20,
   
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    
    marginTop: 10,
    width: "100%",
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  inputContainer: {
    paddingLeft: 0, // Set the left padding to 0
  },
  input: {
    height: 40,
    borderColor: "#ddd", // Set border color
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff", // Set background color
  },
});

export default Account;
