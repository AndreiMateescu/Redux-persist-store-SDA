import { useState } from "react";
import uuid4 from "uuid4";
import { connect, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { removeProductFromCart, incrementQuantityProduct, decrementQuantityProduct } from "../../store/action";

function Cart(props) {
  const dispatch = useDispatch();

  const columns = [
    { field: "name", headerName: "Name", width: 70 },
    { field: "price", headerName: "Price", width: 70 },
    { field: "quantity", headerName: "Quantity", width: 70 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (element) => {
        return (
          <Button onClick={() => dispatch(removeProductFromCart(element.id))}>
            <ClearIcon />
          </Button>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (element) => {
        return (
          <>
          <Button disabled={element.row.quantity === element.row.stock}>
            <AddIcon onClick={() => dispatch(incrementQuantityProduct(element.id))}/>
          </Button>
          <Button disabled={element.row.quantity === 1}>
            <RemoveIcon onClick={() => dispatch(decrementQuantityProduct(element.id))}/>
          </Button>
          </>
        );
      },
    },
  ];

  return (
    <div
        style={{
          height: 400,
          width: "60%",
          marginTop: 10,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {props.cartProducts.length === 0 ? (
          <p>No products in cart</p>
        ) : (
          <DataGrid
            rows={props.cartProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        )}
      </div>
  );
}
// export default Cart;
const mapStateToProps = function (state) {
  return {
    cartProducts: state.cartProducts,
  };
};

export default connect(mapStateToProps)(Cart); //higher order component / function
