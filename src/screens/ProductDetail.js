import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { fetchProductById, deleteProduct } from "../api/api";

const { height, width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await fetchProductById(id);
    setProduct(data);
  };

  const handleDelete = async () => {
    await deleteProduct(id);
    navigation.navigate("ProductList"); // Pass refresh flag to re-fetch the product list
  };

  if (!product) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product?.image }} style={styles.image} />
      <Text style={styles.title}>{product?.title}</Text>
      <Text style={styles.price}>${product?.price}</Text>
      <Text style={styles.description}>{product?.description}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("ProductEdit", { id, handleEdit: route.params?.handleEdit })}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 15, alignItems: "center", justifyContent: 'flex-start'},
  image: { width: width * 0.6, height: height * 0.35, marginBottom: 10, resizeMode: 'cover' },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  price: { fontSize: 18, color: "green", marginBottom: 10 },
  description: { textAlign: "center", marginBottom: 20 },
  editButton: { backgroundColor: "blue", padding: 10, marginBottom: 10, width: "80%", alignItems: "center" },
  deleteButton: { backgroundColor: "red", padding: 10, width: "80%", alignItems: "center" },
  buttonText: { color: "white", fontSize: 16 }
});

export default ProductDetail;
