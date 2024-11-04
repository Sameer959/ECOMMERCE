import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '../config/firebase';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCart } from '../config/CartContext'; // Import useCart

const ProductForm = ({ product, onClose }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      price: '',
      quantity: '',
      description: '',
      category: '',
      sku: '',
      brand: '',
      status: 'in stock',
      discount: 0,
    },
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { addToCart } = useCart(); // Destructure addToCart from CartContext

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('quantity', product.quantity || '');
      setValue('description', product.description || '');
      setValue('category', product.category || '');
      setValue('sku', product.sku || '');
      setValue('brand', product.brand || '');
      setValue('status', product.status || 'in stock');
      setValue('discount', product.discount || 0);
      setImageUrls(product.images || []);
    }
  }, [product, setValue]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const storage = getStorage();
    for (const file of files) {
      try {
        setUploading(true);
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    setImageUrls((prevUrls) => prevUrls.filter((url) => url !== imageUrl));
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [],
      images: imageUrls,
    };

    let productId;
    if (product) {
      productId = product.id;
      await setDoc(doc(db, 'products', productId), productData);
    } else {
      const newProductRef = doc(db, 'products', Date.now().toString());
      productId = newProductRef.id;
      await setDoc(newProductRef, productData);
    }

    // Add to cart after saving
    addToCart({ id: productId, ...productData });

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} autoFocus margin="dense" label="Product Name" type="text" fullWidth />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Price" type="number" fullWidth />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Quantity" type="number" fullWidth />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Description" type="text" fullWidth multiline rows={3} />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Category" type="text" fullWidth />
            )}
          />
          <Controller
            name="sku"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="SKU" type="text" fullWidth />
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Brand" type="text" fullWidth />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Status" type="text" fullWidth />
            )}
          />
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Discount (%)" type="number" fullWidth />
            )}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ marginTop: '10px' }}
          />
          {uploading && <CircularProgress />}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
            {imageUrls.map((url, index) => (
              <div key={index} style={{ position: 'relative', margin: '10px' }}>
                <img
                  src={url}
                  alt={`Product Preview ${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <Button
                  onClick={() => handleDeleteImage(url)}
                  color="error"
                  style={{ position: 'absolute', top: '0', right: '0' }}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
