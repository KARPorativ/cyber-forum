import React, { useState, useEffect } from 'react';
import './ProfileEdit.css';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setUser } from '../../../store/Slice/UserSlice';
interface User {
    _id?: string;
    avatar?: string | File;
    username: string;
    quote?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    city?: string;
    about?: string;
    email?: string;
}
    const ProfileEdit: React.FC<{  }> = ({  }) => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.user);
    const [userData, setUserData] = useState<User>({
        _id: userState._id || '',
        username: userState.userName || '',
        email: userState.email || '',
        quote: userState.quote || '',
        firstName: userState.firstName || '',
        lastName: userState.lastName || '',
        middleName: userState.middleName || '',
        phone: userState.phone || '',
        city: userState.city || '',
        about: userState.about || '',
    });
    useEffect(() => {
        setUserData({
            _id: userState._id,
            username: userState.userName,
            email: userState.email,
            quote: userState.quote,
            firstName: userState.firstName,
            lastName: userState.lastName,
            middleName: userState.middleName,
            phone: userState.phone,
            city: userState.city,
            about: userState.about,
        });
    }, [userState]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        // Validate avatar file if present
        if (userData.avatar instanceof File) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(userData.avatar.type)) {
                alert('Пожалуйста, загрузите изображение в формате JPEG, PNG или GIF');
                return;
            }
            const MAX_SIZE = 5 * 1024 * 1024; // 5MB
            if (userData.avatar.size > MAX_SIZE) {
                alert('Размер файла не должен превышать 5MB');
                return;
            }
        }
            const formData = new FormData();

            // Append all user data to FormData
            Object.keys(userData).forEach(key => {
                if (key === 'avatar' && userData.avatar instanceof File) {
                    formData.append('avatar', userData.avatar);
                } else {
                    formData.append(key, userData[key as keyof User]?.toString() || '');
                }
            });
            const response = await axios.patch(
                `http://localhost:5000/api/changeuser/${userState._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            if (response.status === 200) {
                dispatch(setUser(response.data));
                alert('Профиль успешно обновлен');
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            alert('Произошла ошибка при обновлении профиля');
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUserData(prev => ({
                ...prev,
                avatar: file
            }));
        }
    };
    return (
        <div className="profile-edit">
            <h1>Редактирование профиля</h1>
            <form onSubmit={handleSubmit}>

                <label>
                    Аватар:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <label>
                    <input type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        placeholder="Фамилия" />
                </label>
                <label>
                    Отчество:
                    <input type="text"
                        name="middleName"
                        value={userData.middleName}
                        onChange={handleChange}
                        placeholder="Отчество" />
                </label>
                <label>
                    Цитата:
                    <input type="text"
                        name="quote"
                        value={userData.quote}
                        onChange={handleChange}
                        placeholder="quote" />
                </label>
                <label>
                    Телефон:
                    <input type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="Телефон" />
                </label>
                <label>
                    Город:
                    <input type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                        placeholder="Город" />
                </label>
                <label>
                    О себе:
                    <textarea name="about"
                        value={userData.about}
                        onChange={handleChange}
                        placeholder="О себе"></textarea>
                </label>
                {/* <label>
                    Теги технологий (введите и нажмите Enter):
                    <input type="text" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleTagsChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
                            (e.target as HTMLInputElement).value = '';
                        }
                    }} />
                </label> */}
                {/* <div className="tags-list">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div> */}
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default ProfileEdit;