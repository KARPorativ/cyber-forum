import React from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
interface UserProfileProps {
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
    // const defaultAvatar = '/default-avatar.jpg';
    const defaultAvatar = 'src/foto/Никита.jpg';
    const userAvatar = useAppSelector(state => state.user.avatar);
    
    return (
        <div className="user-profile">
            <div className="user-profile-header">
<div className="user-profile-header">
                    <img 
                        src={userAvatar ? `http://localhost:5000/${userAvatar}` : defaultAvatar} 
                        alt={`${username}'s avatar`} 
                        className="user-avatar"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultAvatar;
                        }}
                    />
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
        </div>
    );
};
export default UserProfile;