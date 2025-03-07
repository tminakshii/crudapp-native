import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProductCard = ({ product, onView, onEdit, onDelete }) => {
    // console.log(product,'detail=============>')
  return (
    <View style={styles.card}>
      <Image source={{ uri: product?.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{product?.title}</Text>
      <Text style={styles.price}>${product?.price}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={onView}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    margin: 8,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: "#3498db",
    padding: 5,
    margin: 3,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#f1c40f",
    padding: 5,
    margin: 3,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 5,
    margin: 3,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProductCard;
