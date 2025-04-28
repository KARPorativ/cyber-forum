import React, { useState, useEffect } from 'react';
import './ProfileEdit.css';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setUser } from '../../../store/Slice/UserSlice';
import { useNavigate } from 'react-router-dom';
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
    tags?: string[];
}

const ProfileEdit: React.FC<{ }> = ({ }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userState = useAppSelector(state => state.user);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState<string>('');
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
        tags: userState.tags || [],
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
            tags: userState.tags || [], // Ensure tags are included in the update
        });
    }, [userState]);
    // Очистка URL при размонтировании компонента
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);
const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
        e.preventDefault();
        if (!userData.tags?.includes(tagInput.trim())) {
        setUserData(prev => ({
            ...prev,
                tags: [...(prev.tags || []), tagInput.trim()]
            }));
        }
        setTagInput('');
    }
};
const handleRemoveTag = (tagToRemove: string) => {
    setUserData(prev => ({
        ...prev,
        tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
        }));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('Пожалуйста, загрузите изображение в формате JPEG, PNG или GIF');
                return;
            }
            // Validate file size (5MB max)
            const MAX_SIZE = 5 * 1024 * 1024;
            if (file.size > MAX_SIZE) {
                alert('Размер файла не должен превышать 5MB');
                return;
            }
            
            // Очищаем предыдущий URL, если он существует
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            
            // Создаем новый URL для предпросмотра
            const newPreviewUrl = URL.createObjectURL(file);
            setPreviewUrl(newPreviewUrl);
            
            // Сохраняем файл в состоянии
            setUserData(prev => ({
                ...prev,
                avatar: file
            }));
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
        // Базовая валидация
        if (!userData.username.trim()) {
            alert('Имя пользователя обязательно');
            return;
        }
            const formData = new FormData();
            
        // Добавляем все данные пользователя в FormData
            Object.keys(userData).forEach(key => {
                if (key === 'avatar' && userData.avatar instanceof File) {
                    formData.append('avatar', userData.avatar);
                } else if (userData[key as keyof User]) {
                    formData.append(key, userData[key as keyof User]?.toString() || '');
                }
            });
            const response = await axios.patch(
                `http://localhost:5000/api/changeuser/${userState._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                },
                }
            );
            if (response.status === 200) {
                console.log('cazan', response.data)
            // Обновляем Redux store с новыми данными пользователя
                dispatch(setUser({
                    ...response.data,
                avatar: response.data.avatar
                }));
                
            // Очищаем URL предпросмотра
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                }
                
                navigate('/profile');
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            alert('Произошла ошибка при обновлении профиля');
        }
    };
    return (
        <div className="profile-edit">
            <h1>Редактирование профиля</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Аватар:
                    <div className="avatar-preview-container">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="avatar-preview"
                            />
                        )}
                    </div>
                </label>
                {/* Остальные поля формы остаются без изменений */}
                <label>
                Имя:
                    <input type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        placeholder="имя" />
                </label>
                <label>
                Фамилия:
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
                <label>
                    Теги:
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInput}
                        placeholder="Введите тег и нажмите Enter"
                    />
                </label>
                <div className="tags-container">
                    {userData.tags?.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                            <button
                                type="button"
                                className="tag-remove"
                                onClick={() => handleRemoveTag(tag)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};
                
                
            

export default ProfileEdit;