import React, { useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Register: React.FC = () => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async  (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName || !email || !password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            // Здесь отправляем данные на сервер
            const response = await axios.post('https://serverforum.onrender.com/api/register', {
                userName,
                email,
                password
            });

            // Если регистрация прошла успешно
            if (response.status === 201) {
                // setSuccess('Регистрация прошла успешно!');
                
                setError('');
                // Очистка полей после успешной отправки
                setUsername('');
                setEmail('');
                setPassword('');
                
            }
        } catch (err: any) {
            // Обработка ошибок во время запроса
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Произошла ошибка при регистрации. Попробуйте еще раз.');
            } else {
                setError('Неизвестная ошибка. Попробуйте позже.');
            }
        }

        // Здесь может быть логика отправки данных на сервер
        

        console.log('Регистрация успешна:', { userName, email, password });
        setError('');
        // Очистка полей после успешной отправки
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/login');
    };

    return (
        <div className={styles.registerWrapper}>
        <div className={styles.container}>
            <h1>Регистрация</h1>
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="userName">Имя пользователя</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="email">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Зарегистрироваться</button>
                <span className={styles.login}>Уже есть аккаунт? &nbsp;<Link to="/login" > Войти</Link></span>
            </form>
        </div>
        </div>
    );
};

export default Register;