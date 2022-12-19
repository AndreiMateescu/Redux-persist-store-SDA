import React, { useEffect, useState } from "react";
import "./App.css";
import Employees from "./components/Employees/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import Weather from "./components/Weather/Weather";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import FirebaseLogin from "./components/Login/FirebaseLogin";
import NoPage from "./components/NoPage/NoPage";
import firebase from "./services/firebase";
import Cart from "./components/Cart/Cart";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import EmployeeId from "./components/EmployeeId/EmployeeId";
import ClassEmployees from "./components/ClassEmployees/ClassEmployees";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Employees /> : <FirebaseLogin />}
              // element={user ? <ClassEmployees /> : <FirebaseLogin />}
              exact={true}
            />
            <Route
              path="/Employees"
              element={user ? <Employees /> : <FirebaseLogin />}
              // element={user ? <ClassEmployees /> : <FirebaseLogin />}
              exact={true}
            />
            <Route
              path="/Employees/:id"
              element={user ? <EmployeeId /> : <FirebaseLogin />}
              exact={true}
            />
            <Route
              path="/Products"
              element={user ? <Products /> : <FirebaseLogin />}
              exact={true}
            />
            <Route
              path="/Weather"
              element={user ? <Weather /> : <FirebaseLogin />}
              exact={true}
            />
            <Route path="/Login" element={<FirebaseLogin />} exact={true} />
            <Route
              path="/Cart"
              element={user ? <Cart /> : <FirebaseLogin />}
              exact={true}
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
