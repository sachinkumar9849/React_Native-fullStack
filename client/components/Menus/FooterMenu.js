import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.menuItem}
      >
        <View style={styles.iconContainer}>
          <Icon
            color={route.name === "Home" && "orange"}
            name="home"
            size={24}
          />
        </View>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Myposts")}
        style={styles.menuItem}
      >
        <View style={styles.iconContainer}>
          <Icon
            color={route.name === "Myposts" && "orange"}
            name="list"
            size={24}
          />
        </View>
        <Text style={styles.text}>Myposts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Post")}
        style={styles.menuItem}
      >
        <View style={styles.iconContainer}>
          <Icon
            color={route.name === "Post" && "orange"}
            name="plus"
            size={24}
          />
        </View>
        <Text style={styles.text}>Post</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Account")}
        style={styles.menuItem}
      >
        <View style={styles.iconContainer}>
          <Icon
            color={route.name === "Account" && "orange"}
            name="user"
            size={24}
          />
        </View>
        <Text style={styles.text}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff", // Adjust background color as needed
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  iconContainer: {
    // Background color for icon container
    padding: 10,
    borderRadius: 15,
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
  },
});

export default FooterMenu;
