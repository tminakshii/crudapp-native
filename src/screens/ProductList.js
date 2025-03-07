import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Dimensions, TextInput, Modal, Button } from "react-native";
import { fetchProducts, deleteProduct, updateProduct } from "../api/api";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ProductCard from "../commonComponent/ProductCard";

const { width, height } = Dimensions.get('window');

const ProductList = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Fetch products when the screen is focused or when the 'refresh' flag is passed
  useEffect(() => {
    if (isFocused || route?.params?.refresh) {
      fetchProducts().then(setProducts);
    }
  }, [isFocused, route?.params?.refresh]);

  // Handle product deletion
  const handleDelete = async (id) => {
    console.log(id, 'deleting product');

    // Optimistically update the UI by removing the product from the state
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));

    // Call delete API and handle any errors
    const deleted = await deleteProduct(id);

    if (!deleted) {
      // If deletion fails, re-fetch products (or you can revert state here if needed)
      fetchProducts().then(setProducts);
    }
  };

  // Handle product editing
  const handleEdit = (product) => {
    setCurrentProduct(product);  // Set the current product to be edited
    setTitle(product.title);
    setPrice(product.price.toString());
    setDescription(product.description);
    setModalVisible(true);  // Open the modal for editing
  };

  // Handle save changes to the product
  const handleSaveChanges = async () => {
    if (!title.trim() || !price.trim() || !description.trim()) {
      alert("All fields are required!");
      return;
    }

    const updatedProduct = { ...currentProduct, title, price: parseFloat(price), description };

    try {
      // Update the product via the API
      const result = await updateProduct(currentProduct.id, updatedProduct);
      if (result) {
        // Optimistically update the UI by modifying the product in the list
        setProducts((prevProducts) => 
          prevProducts.map((product) => 
            product.id === currentProduct.id ? updatedProduct : product
          )
        );
        alert("Product updated successfully!");
        setModalVisible(false);  // Close the modal
      }
    } catch (error) {
      alert("Failed to update product");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Two columns for grid layout
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onView={() => navigation.navigate("ProductDetail", { id: item.id })}
            onEdit={() => handleEdit(item)} // Open modal for editing
            onDelete={() => handleDelete(item.id)} // Delete function passed to ProductCard
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("ProductEdit")}>
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>

      {/* Modal for editing product */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ""))}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TouchableOpacity  onPress={handleSaveChanges}  style={{backgroundColor:'green',borderRadius:5,marginVertical:5,marginBottom:15}}> 
                <Text style={{color:'white',padding:8}}>save changes</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  addButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for modal
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: width,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default ProductList;
