import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import styles from './employeeId.module.css'; //scoped css

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

function EmployeeId() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const [color, setColor] = useState("#37CD67");

    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     setError('Failed to load the user');
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 setEmployee(data);
    //                 setLoading(false);
    //             })
    // }, []);

    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    //         if (!response.ok) {
    //             setError('Failed to load the user');
    //         }
    //         const data = await response.json();
    //         setEmployee(data);
    //         setLoading(false);
    //     })();
    //   }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            if (!response.ok) {
                setError('Failed to load the user');
            }
            const data = await response.json();
            setEmployee(data);
            setLoading(false);
        }
        fetchData();
      }, []);

    if (error) {
        return <p>{error}</p>
    }

    if (loading) {
        return <MoonLoader 
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    }

    return <div className={styles.employee}>
        <p>Name: {employee.name}</p>
        <p>Username: {employee.username}</p>
        <p>Email: {employee.email}</p>
        <p>Address: {employee.address?.street}</p>
        <p>Phone: {employee.phone}</p>
    </div>;
}

export default EmployeeId;