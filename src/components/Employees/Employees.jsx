import { useState, useEffect } from "react";
import Employee from "../Employee/Employee";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import uuid4 from "uuid4";

const Employees = (props) => {
  const [initialEmployees, setInitialEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setInitialEmployees(data);
      })
      .catch((e) => console.log(e));

      //cleanup
      return () => {
        console.log('Destroying...');
      }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  function handleEnable() {
    return name && email && city && street;
  }

  const handleClick = () => {
    const employee = {
      id: uuid4(),
      name: name,
      email: email,
      address: {
        city: city,
        street: street,
      },
      image: `https://robohash.org/${name}`,
    };

    const newEmployees = [...employees];
    newEmployees.push(employee);
    console.log(newEmployees);
    setEmployees(newEmployees);
    reset();
  };

  const reset = () => {
    setName("");
    setEmail("");
    setCity("");
    setStreet("");
  };

  const filterEmployees = (value) => {
    if (value) {
      const newEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(value.toLowerCase())
      );
      setEmployees(newEmployees);
    } else {
      setEmployees(initialEmployees);
    }
  };

  const handleDelete = (event, id) => {
    const filteredEmployees = employees.filter(
      (employee) => employee.id !== id
    );
    setEmployees(filteredEmployees);
    event.stopPropagation();
  };

  return (
    <div>
      <TextField
        id="outlined-required"
        label="Search employee"
        defaultValue=""
        onChange={(e) => filterEmployees(e.target.value)}
      />
      <ul className="items">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {employees.map((employee) => (
            <Employee
              key={employee.id}
              id={employee.id}
              name={employee.name}
              email={employee.email}
              city={employee.address.city}
              street={employee.address.street}
              deleteEmployee={(event) => handleDelete(event, employee.id)}
            />
          ))}
        </Grid>
      </ul>

      <br />

      <div style={{ marginLeft: 40 }}>
        <h4>Add Employee</h4>
        <div className="container">
          <div className="textContainer">
            <TextField
              required
              error={!name}
              id="outlined-required"
              label="Name"
              defaultValue=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!name && <p className="red">Name is required</p>}
          </div>
          <div className="textContainer">
            <TextField
              required
              error={!email}
              id="outlined-required"
              label="Email"
              defaultValue=""
              sx={{ marginLeft: 5 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!email && <p className="red">Email is required</p>}
          </div>
          <div className="textContainer">
            <TextField
              required
              error={!city}
              id="outlined-required"
              label="City"
              defaultValue=""
              sx={{ marginLeft: 5 }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {!email && <p className="red">City is required</p>}
          </div>
          <div className="textContainer">
            <TextField
              required
              error={!street}
              id="outlined-required"
              label="Street"
              defaultValue=""
              sx={{ marginLeft: 5 }}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            {!email && <p className="red">Street is required</p>}
          </div>
          <Button
            variant="contained"
            sx={{ marginLeft: 5 }}
            disabled={!handleEnable()}
            onClick={handleClick}
          >
            Add employee
          </Button>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Employees;
