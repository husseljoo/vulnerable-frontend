import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add CSRF token if needed (assuming you're using Laravel)
    // const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': csrfToken, // Add CSRF token if necessary
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
      } else {
        console.log('Registration successful!', data);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength={3}
                maxLength={50}
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                minLength={5}
                maxLength={20}
              />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </td>
          </tr>
          <tr>
            <td>Confirm password</td>
            <td>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <input type="submit" value="Register" />
            </td>
          </tr>
        </table>
      </form>

      {errors && (
        <div className="error-messages">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key].join(', ')}</p>
          ))}
        </div>
      )}

      <button onClick={() => window.location.href = '/'}>Back to Homepage</button>
    </div>
  );
}

export default Registration;
