// ProductList.jsx
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Button, Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import ProductForm from './ProductForm';
import { useCart } from '../config/CartContext'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const { addToCart } = useCart(); 

  const methods = useForm();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
        Add Product
      </Button>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <Box display="flex" alignItems="center">
              {product.images && product.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Product Preview ${index}`}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                />
              ))}
              <ListItemText
                primary={product.name}
                secondary={`Price: $${product.price} | Quantity: ${product.quantity} | Category: ${product.category} | Brand: ${product.brand}`}
              />
            </Box>
            <Button onClick={() => handleAddToCart(product)} color="primary">
              Add to Cart
            </Button>
          </ListItem>
        ))}
      </List>
      {openForm && (
        <FormProvider {...methods}>
          <ProductForm product={editProduct} onClose={() => setOpenForm(false)} />
        </FormProvider>
      )}
    </Container>
  );
};

export default ProductList;
