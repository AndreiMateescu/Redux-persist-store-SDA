import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

//presentational | UI component
const Employee = ({ id, name, email, city, street, deleteEmployee }) => {

  const navigate = useNavigate();

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 345, height: 350, cursor: 'pointer' }} onClick={() => navigate(`/Employees/${id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={`https://robohash.org/${name}`}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            City: {city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Street: {street}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={deleteEmployee}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Employee;
