import React, { useState } from 'react';
import classes from './Login.module.css';
import axios from 'axios';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../store/Slice/UserSlice';
const Login: React.FC = () => {
    const [formData, setFormData] = useState<{ userName: string; password: string; message: string }>({
        userName: '',
        password: '',
        message: '',
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://serverforum.onrender.com/api/login', {
                userName: formData.userName,
                password: formData.password,
            });
            console.log("log");
            // Dispatch action to save user data in Redux store
            console.log(response.data);
            dispatch(setUser(response.data)); // Assuming response.data contains user information
            // Optionally, set the message from the server response
            setFormData((prevData) => ({
                ...prevData,
                message: response.data.message,
            }));
            console.log("Response:", response.data);
            navigate('/'); // Redirect after successful login
        } catch (error) {
            console.log("err");
            setFormData((prevData) => ({
                ...prevData,
                message: "Ошибка авторизации", // Authorization error message
            }));
        }
        console.log('Login:', { userName: formData.userName, password: formData.password });
    };
    return (
        <div className={classes.loginWrapper}>
            <div className={classes.loginContainer}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.formGroup}>
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        name="userName" // Use name attribute to match state
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password" // Use name attribute to match state
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
                {formData.message && <p className={classes.errorMessage}>{formData.message}</p>}
                <p className={classes.textLink}>Еще нет аккаунта? <a href="/register">Зарегистрируйтесь здесь</a></p>
            </form>
            </div>
        </div>
    );
};
export default Login;

// import React, { useState } from 'react';
// import classes from './Login.module.css';
// import axios from 'axios';
// import { useAppDispatch } from '../../../hooks/reduxHooks';
// import { useNavigate } from 'react-router-dom';
// import { setUser } from '../../../store/Slice/UserSlice';

// const Login: React.FC = () => {
//     const [userName, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [message, setMessage] = useState<string>('');
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         // Логика авторизации (например, отправка данных на сервер)
//         try {
//             const response = await axios.post('http://localhost:5000/api/login', { userName, password });
//             setMessage(response.data.message);
//             console.log("yyy",response.data);
//             dispatch(setUser(response.data));
//             navigate('/');
//         } catch {
//             setMessage("Ошибка авторизации")
//         }
//         console.log('Вход:', { userName, password });
//     };

//     return (
//         <div className={classes.loginContainer}>
//             <h2>Авторизация</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className={classes.formGroup}>
//                     <label htmlFor="username">Имя пользователя</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={userName}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className={classes.formGroup}>
//                     <label htmlFor="password">Пароль</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Войти</button>
//                 <p className={classes.textLink}>Еще нет аккаунта? <a href="/register">Зарегистрируйтесь здесь</a></p>
//             </form>
//         </div>
//     );
// };

// export default Login;