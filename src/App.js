import React, { useState } from "react";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [person, setPerson] = useState([]);
  const [formerror, setFormError] = useState({});
  const [issubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(data));
    setIsSubmit(true);
    const newData = { ...data, id: new Date().getTime().toString() };
    setPerson([...person, newData]);
    // setData({ name: "", email: "", password: "", phone: "" });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 6) {
      errors.name = "Name should be at least 6 characters long";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.phone) {
      errors.phone = "Phone is required";
    } else if (!values.phone.match(/^[0-9]{10}$/)) {
      errors.phone = "Invalid Phone Number";
    }

    return errors;
  };

  const handleClick = () => {
    setIsSubmit(false);
    setData({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  return (
    <div className="form-content">
      {Object.keys(formerror).length === 0 && issubmit ? (
        <div className="sucess">
          <p>
            Signed in sucessfully <button onClick={handleClick}>X</button>
          </p>
        </div>
      ) : null}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-name">
          <label>Name :</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <p>{formerror.name}</p>
        <div className="form-email">
          <label>Email :</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <p>{formerror.email}</p>
        <div className="form-password">
          <label>password :</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <p>{formerror.password}</p>
        <div className="form-phone">
          <label>Phone Number :</label>
          <br />
          <input
            type="text"
            name="phone"
            id="phone"
            autoComplete="off"
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <p>{formerror.phone}</p>
        <div className="form-button">
          <button>Sign Up</button>
        </div>
      </form>
      {/* {person.map((data, index) => {
        const { name, email, password, phone } = data;
        return (
          <div className="form-data" key={index}>
            <h4>name: {name}</h4>
            <h4>email: {email}</h4>
            <h4>password: {password}</h4>
            <h4>phone:{phone}</h4>
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
