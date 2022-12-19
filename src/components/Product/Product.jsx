import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { addProduct } from "../../store/action";

const Product = ({
  image,
  name,
  description,
  price,
  stock,
  deleteProduct,
  addProductToCart,
}) => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 345, height: 350 }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {stock}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={deleteProduct}>
            Delete
          </Button>
          <Button
            size="small"
            onClick={addProductToCart}
            disabled={stock === 0}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;

// () => deleteProduct() echivalent cu deleteProduct
