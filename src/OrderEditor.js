import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const OrderEditor = () => {
  const order_id = "243";
  const drinks = [
    ["拿鐵", 140],
    ["可麗露", 100],
    ["閃電泡芙", 262],
    ["可頌", 305],
    ["Gingerbread", 356],
  ].map(([name, price]) => ({ name, price }));

  const [selected, setSelected] = useState({});

  const modifySelected = (num) => (name) => {
    const newSelected = { ...selected };
    if (newSelected[name]) {
      newSelected[name] += num;
    } else {
      newSelected[name] = 1;
    }
    if (newSelected[name] <= 0) {
      delete newSelected[name];
    }
    setSelected(newSelected);
  };
  const increase = modifySelected(1);
  const decrease = modifySelected(-1);
  const onClickAdd = ({ name }) => increase(name);
  const onClickRemove = ({ name }) => decrease(name);
  
  const dataPresenter = (selected) => {
    let presentingData = [];
    for (const key in selected) {
      const name = key;
      const price = drinks.find((drink) => drink.name === name).price;
      const amount = selected[name];
      const totalPrice = amount * price;
      presentingData.push({ name, price, amount, totalPrice });
    }
    if (presentingData.length > 0) {
      presentingData.push({
        totalPrice: presentingData.reduce(
          (acc, { totalPrice }) => acc + totalPrice,
          0
        ),
      });
    }
    return presentingData;
  };

  return (
    <>
      <Typography variant="h4">order_id: {order_id}</Typography>
      <div style={{ display: "flex" }}>
        <div style={{ display: "inline-block", padding: "0 0.5rem" }}>
          {drinks.map((drink) => (
            <Button
              style={{ display: "block", marginBottom: "0.5rem" }}
              variant="contained"
              key={drink.name}
              onClick={() => onClickAdd(drink)}
            >
              {`${drink.name}  $${drink.price}`}
            </Button>
          ))}
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>品項</TableCell>
                <TableCell align="right">數量</TableCell>
                <TableCell align="right">單價</TableCell>
                <TableCell align="right">總價</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPresenter(selected).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.totalPrice}</TableCell>
                  <TableCell align="right">
                    {row.name && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => onClickRemove(row)}
                      >
                        -1
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default OrderEditor;
