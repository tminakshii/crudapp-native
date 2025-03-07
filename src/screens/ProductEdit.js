import React, { useEffect, useState } from "react";
import { 
  View, TextInput, Button, Alert, ActivityIndicator, StyleSheet 
} from "react-native";
import { addProduct, updateProduct, fetchProductById } from "../api/api";
import { useNavigation } from "@react-navigation/native";

const ProductEdit = ({ route }) => {
  const navigation = useNavigation();
  const productId = route?.params?.id;
  const handleEdit = route?.params?.handleEdit; // Receive handleEdit function passed from ProductList
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const product = await fetchProductById(productId);
      if (product) {
        setTitle(product.title);
        setPrice(product.price.toString());
        setDescription(product.description);
      } else {
        Alert.alert("Error", "Product not found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !price.trim() || !description.trim()) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
  
    const productData = { id: productId, title, price: parseFloat(price), description };
  
    try {
      if (productId) {
        const updatedProduct = await updateProduct(productId, productData);
        if (updatedProduct) {
          // Pass the updated product back to the ProductList
          if (handleEdit) {
            handleEdit(updatedProduct); 
         
          }
        } else {
          Alert.alert("Error", "Failed to update product.");
        }
      } else {
        // Add a new product
        const newProduct = await addProduct(productData);
        if (handleEdit) {
          handleEdit(newProduct);  // Update the list with the newly added product
        }
        Alert.alert("Success", "Product added successfully!");
      }

      navigation.goBack();  // Go back to the ProductList screen after success
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      <Button title={productId ? "Update Product" : "Add Product"} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductEdit;
