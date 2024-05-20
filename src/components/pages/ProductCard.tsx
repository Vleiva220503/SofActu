import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

const ProductCard = ({ product, onStatusChange, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleDisable = async () => {
    try {
      const response = await fetch(`https://sofback-production.up.railway.app/api/products/${product.id}/toggle`, {
        method: 'PATCH',
      });
      const data = await response.json();
      setEditedProduct((prev) => ({
        ...prev,
        status: data.status,
      }));
      onStatusChange(product.id, data.status);
    } catch (error) {
      console.error('Error toggling product status:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://sofback-production.up.railway.app/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedProduct,
          image: product.image, // Ensure the image remains unchanged
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setEditedProduct(data);
        onUpdate(product.id, data);
        setIsEditing(false);
      } else {
        console.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        {product.status === 'Inhabilitado' && <Typography color="error">Producto Inhabilitado</Typography>}
        {isEditing ? (
          <>
            <TextField
              label="Nombre"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descripción"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={editedProduct.stock}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Precio"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {editedProduct.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {editedProduct.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock: {editedProduct.stock}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Precio: C${editedProduct.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estado: {product.status}
            </Typography>
          </>
        )}
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Button
          variant="contained"
          color={product.status === "Habilitado" ? "error" : "success"}
          onClick={handleDisable}
        >
          {product.status === "Habilitado" ? 'Dar de Baja' : 'Habilitar Producto'}
        </Button>
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        ) : (
          <Button variant="contained" onClick={handleEdit} disabled={product.status === 'Inhabilitado'}>
            Editar
          </Button>
        )}
      </Box>
    </StyledCard>
  );
};

export default ProductCard;
