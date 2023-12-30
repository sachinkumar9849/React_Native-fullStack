import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/SubmitButton";

const RegisterForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "http://192.168.101.4:8080/api/v1/auth/register",
        { name, email, password }
      );
      alert(data && data.message);
      console.log("Register Data ==>", { name, email, password });
      setName("")
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <InputBox inputTitle={"Name"} value={name} setValue={setName} />
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          keyboardType="password"
          autoComplete="password"
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
        <SubmitButton
          btnTitle="Register"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text style={{ textAlign: "center", marginTop: 10, fontSize: 20 }}>
          Already Registered? Please
          <Text
            style={{ fontWeight: "bold", color: "red", paddingLeft: 8 }}
            onPress={() => navigation.navigate("Login")}
          >
            LOGIN
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",

    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "green",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterForm;
