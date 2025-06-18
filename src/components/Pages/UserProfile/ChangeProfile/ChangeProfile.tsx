import styles from './ChangeProfile.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/reduxHooks';

const ChangeProfile = () => {
    const defaultAvatar = 'src/foto/anonim.jpg';
    const user = useAppSelector(state => state.user);
    
    return (
        <div className={styles.userProfile}>
            <div className={styles.userProfileHeader}>
                <div className={styles.avatarSection}>
                    <img 
                        src={user.avatar ? `https://serverforum.onrender.com/${user.avatar}` : defaultAvatar} 
                        alt={`${user.userName}'s avatar`} 
                        className={styles.userAvatar}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultAvatar;
                        }}
                    />
                    <div className={styles.userMainInfo}>
                        <h2 className={styles.username}>{user.userName}</h2>
                        {/* <p className={styles.quote}>"{user.quote}"</p> */}
                    </div>
                </div>
            
                <div className={styles.userDetails}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Имя:</strong> {user.firstName}</p>
                    <p><strong>Фамилия:</strong> {user.lastName}</p>
                    <p><strong>Отчество:</strong> {user.middleName}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                    <p><strong>Город:</strong> {user.city}</p>
                    <p><strong>О себе:</strong> {user.about}</p>
                    
                    {user.tags && user.tags.length > 0 && (
                        <div className={styles.techTags}>
                            <p><strong>Теги:</strong></p>
                            <div className={styles.tagsContainer}>
                                {user.tags.map((tag, index) => (
                                    <span key={index} className={styles.techTag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Link to="/profileedit" className={styles.editProfileLink}>
                <button className={styles.editProfileButton}>Редактировать профиль</button>
            </Link>
        </div>
    );
};

export default ChangeProfile;