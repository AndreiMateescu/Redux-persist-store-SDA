import React from "react";
import Employee from "../Employee/Employee";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import uuid4 from "uuid4";

//class components cannot use hooks
class ClassEmployees extends React.Component {
    constructor() {
        super();
        this.state = {
            initialEmployees: [],
            employees: [],
            name: '',
            email: '',
            city: '',
            street: ''
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => {
            this.setState({
                employees: data,
                initialEmployees: data
            })
          })
          .catch((e) => console.log(e));
    }

    //cleanup
    componentWillUnmount() {
        console.log('Destroying...');
    }
      
    handleEnable() {
        return this.state.name && this.state.email && this.state.city && this.state.street;
    }

    handleClick() {
        console.log(this);
        const employee = {
            id: uuid4(),
            name: this.state.name,
            email: this.state.email,
            address: {
              city: this.state.city,
              street: this.state.street,
            },
            image: `https://robohash.org/${this.state.name}`,
        };

        const newEmployees = [...this.state.employees];
        newEmployees.push(employee);
        this.setState({
            employees: newEmployees
        });
        this.reset();
    }

    reset() {
        this.setState({
            name: '',
            email: '',
            city: '',
            street: ''
        });
    }

    filterEmployees(value) {
        if (value) {
            const newEmployees = this.state.employees.filter((emp) => emp.name.toLowerCase().includes(value.toLowerCase()));
            this.setState({
                employees: newEmployees
            });
        } else {
            this.setState({
                employees: this.state.initialEmployees
            });
        }
    }

    handleDelete(event, id) {
        const filteredEmployees = this.state.employees.filter(
            (employee) => employee.id !== id
        );
        this.setState({
            employees: filteredEmployees
        });
        event.stopPropagation();
    }

    render() {
        console.log(this);
        return (
            <div>
              <TextField
                id="outlined-required"
                label="Search employee"
                defaultValue=""
                onChange={(e) => this.filterEmployees(e.target.value)}
              />
              <ul className="items">
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {this.state.employees.map((employee) => (
                    <Employee
                      key={employee.id}
                      id={employee.id}
                      name={employee.name}
                      email={employee.email}
                      city={employee.address.city}
                      street={employee.address.street}
                      deleteEmployee={(event) => this.handleDelete(event, employee.id)}
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
                      error={!this.state.name}
                      id="outlined-required"
                      label="Name"
                      defaultValue=""
                      value={this.state.name}
                      onChange={(e) => this.setState({name: e.target.value})}
                    />
                    {!this.state.name && <p className="red">Name is required</p>}
                  </div>
                  <div className="textContainer">
                    <TextField
                      required
                      error={!this.state.email}
                      id="outlined-required"
                      label="Email"
                      defaultValue=""
                      sx={{ marginLeft: 5 }}
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    {!this.state.email && <p className="red">Email is required</p>}
                  </div>
                  <div className="textContainer">
                    <TextField
                      required
                      error={!this.state.city}
                      id="outlined-required"
                      label="City"
                      defaultValue=""
                      sx={{ marginLeft: 5 }}
                      value={this.state.city}
                      onChange={(e) => this.setState({ city: e.target.value })}
                    />
                    {!this.state.city && <p className="red">City is required</p>}
                  </div>
                  <div className="textContainer">
                    <TextField
                      required
                      error={!this.state.street}
                      id="outlined-required"
                      label="Street"
                      defaultValue=""
                      sx={{ marginLeft: 5 }}
                      value={this.state.street}
                      onChange={(e) => this.setState({ street: e.target.value })}
                    />
                    {!this.state.street && <p className="red">Street is required</p>}
                  </div>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: 5 }}
                    disabled={!this.handleEnable()}
                    // onClick={this.handleClick.bind(this)}
                    onClick={() => this.handleClick()}
                  >
                    Add employee
                  </Button>
                </div>
              </div>
              <br />
              <br />
            </div>
          );
    }

}

export default ClassEmployees;