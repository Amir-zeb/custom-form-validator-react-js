// src/App.jsx
import * as React from 'react';
import './App.css';
import InputField from "./components/InputField";
import { formValidator } from './formValidator';

function App() {
  const [formData, setFormData] = React.useState({});
  const [formErrors, setFormError] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = formValidator(formData, schema);
    if (Object.keys(errors).length) {
      setFormError(errors);
    } else {
      setFormError({});
      alert("Thank you for watching.");
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <h4 className="text-center mt-3 fw-bold">Registration Form</h4>
          <form novalidate autoComplete='off' onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-6">
                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} errorMessage={formErrors.firstName} />
              </div>
              <div className="col-6">
                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} errorMessage={formErrors.lastName} />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <InputField label="Email" name="email" value={formData.email} onChange={handleChange} errorMessage={formErrors.email} />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} errorMessage={formErrors.phone} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <InputField label="Password" name="password" value={formData.password} onChange={handleChange} errorMessage={formErrors.password} />
              </div>
              <div className="col-6">
                <InputField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} errorMessage={formErrors.confirmPassword} />
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const schema = {
  firstName: [
    { type: 'required' }
  ],
  lastName: [
    { type: 'required' }
  ],
  email: [
    { type: 'required' },
    { type: 'regex', regex: emailRegex }
  ],
  phone: [
    { type: 'required' },
    { type: 'length', length: { min: 11, max: 11 } }
  ],
  password: [
    { type: 'required' },
    { type: 'length', length: { min: 8, max: 16 } }
  ],
  confirmPassword: [
    { type: 'required' },
    { type: 'length', length: { min: 8, max: 16 } },
    { type: 'match', matchTo: 'password' }
  ],
}