import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${formData.email}\nPassword: ${formData.password}`);
  };

  return (
    <main className="container mt-5">
      <section className="row justify-content-center">
        <article className="col-md-6">
          <header className="text-center mb-4">
            <h2>Sign In</h2>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <footer className="d-grid">
              <button type="submit" className="btn btn-primary">Sign In</button>
            </footer>
          </form>
        </article>
      </section>
    </main>
  );
};

export default SignIn;
