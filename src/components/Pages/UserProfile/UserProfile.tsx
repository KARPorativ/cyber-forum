import React from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';

interface UserProfileProps {
    avatarUrl: string;
    username: string;
    quote: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    city: string;
    about: string;
    techTags: string[];
}

const UserProfile: React.FC<UserProfileProps> = ({
    avatarUrl,
    username,
    quote,
    firstName,
    lastName,
    middleName,
    phone,
    city,
    about,
    techTags
}) => {
    return (
        <div className="user-profile">
            <div className="user-profile-header">
<div className="user-profile-header">
    <img src={avatarUrl || 'path/to/default-avatar.jpg'} alt={`${username}'s avatar`} className="user-avatar" />
                <h2 className="username">{username}</h2>
            </div>
            <div className="user-details">
                <p><strong>Имя:</strong> {firstName}</p>
                <p><strong>Фамилия:</strong> {lastName}</p>
                <p><strong>Отчество:</strong> {middleName}</p>
                <p><strong>Телефон:</strong> {phone}</p>
                <p><strong>Город:</strong> {city}</p>
                <p><strong>О себе:</strong> {about}</p>
            </div>
            <div className="tech-tags">
                <strong>Технологии:</strong>
                {techTags.map((tag, index) => (
                    <span key={index} className="tech-tag">{tag}</span>
                ))}
            </div>
            <Link to={"/profileedit"}>
            <button className="edit-profile-button">Редактировать профиль</button>
            </Link>
        </div>
        </div>
    );
};

export default UserProfile;