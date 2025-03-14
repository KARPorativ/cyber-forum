import React, { useState } from 'react';
import classes from './Login.module.css';
import axios from 'axios';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserName } from '../../../store/Slice/UserSlice';

const Login: React.FC = () => {
    const [userName, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Логика авторизации (например, отправка данных на сервер)
        try {
            const response = await axios.post('http://localhost:5000/api/login', { userName, password });
            setMessage(response.data.message);
            console.log("yyy",response.data);
            dispatch(setUser(response.data));
            navigate('/');
        } catch {
            setMessage("Ошибка авторизации")
        }
        console.log('Вход:', { userName, password });
    };

    return (
        <div className={classes.loginContainer}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.formGroup}>
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
                <p className={classes.textLink}>Еще нет аккаунта? <a href="/register">Зарегистрируйтесь здесь</a></p>
            </form>
        </div>
    );
};

export default Login;