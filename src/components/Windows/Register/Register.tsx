import React, { useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';


const Register: React.FC = () => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    

    const handleSubmit = async  (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName || !email || !password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            // Здесь отправляем данные на сервер
            const response = await axios.post('http://localhost:5000/api/register', {
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
    };

    return (
        <div className={styles.container}>
            <h1>Регистрация</h1>
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
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
            </form>
        </div>
    );
};

export default Register;