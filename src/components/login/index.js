import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className='container'>
            <div className="form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-gruop'>
                        <TextField
                            label="Login"
                            value={formData.login}
                            name='login'
                            required
                            onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <TextField
                            label="Password"
                            value={formData.password}
                            type='password'
                            name='password'
                            required

                            onChange={handleChange} />
                    </div>
                    <Button
                        variant="contained"
                        type='submit'
                        onClick={() => handleSubmit}>Logar</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
