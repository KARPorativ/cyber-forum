import React from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
interface UserProfileProps {
    _id: string;
    userName: string;
    email: string;
    quote: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    city: string;
    about: string;
    avatar: string;
    tags?: string[];
    loading?: boolean;
    error?: string | null;
}
const UserProfile: React.FC = () => {
    const defaultAvatar = 'src/foto/Никита.jpg';
    const user = useAppSelector(state => state.user);
    
    return (
        <div className="user-profile">
            <div className="user-profile-header">
                <div className="avatar-section">
                    <img 
                        src={user.avatar ? `http://localhost:5000/${user.avatar}` : defaultAvatar} 
                        alt={`${user.userName}'s avatar`} 
                        className="user-avatar"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultAvatar;
                        }}
                    />
                    <div className="user-main-info">
                        <h2 className="username">{user.userName}</h2>
                        <p className="quote">"{user.quote}"</p>
                </div>
                </div>
            <div className="user-details">
                    <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Имя:</strong> {user.firstName}</p>
                <p><strong>Фамилия:</strong> {user.lastName}</p>
                <p><strong>Отчество:</strong> {user.middleName}</p>
                <p><strong>Телефон:</strong> {user.phone}</p>
                <p><strong>Город:</strong> {user.city}</p>
                <p><strong>О себе:</strong> {user.about}</p>
                
                {user.tags && user.tags.length > 0 && (
                    <div className="tech-tags">
                        <p><strong>Теги:</strong></p>
                        {user.tags.map((tag, index) => (
                            <span key={index} className="tech-tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
            </div>
            <Link to="/profileedit" className="edit-profile-link">
            <button className="edit-profile-button">Редактировать профиль</button>
            </Link>
        </div>
    );
};
export default UserProfile;
