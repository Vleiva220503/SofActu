import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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

const ProductCard2 = ({ product }) => {
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
        {product.status === 'Inhabilitado' ? (
          <Typography color="error">Producto no disponible</Typography>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock: {product.stock}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Precio: C${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estado: {product.status}
            </Typography>
          </>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard2;
