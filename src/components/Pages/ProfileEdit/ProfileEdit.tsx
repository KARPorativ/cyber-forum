import React, { useState } from 'react';
import './ProfileEdit.css';

const ProfileEdit: React.FC = () => {
    const [avatar, setAvatar] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [quote, setQuote] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [email, setEmail] = useState<string>(''); // New state for email
    const [tags, setTags] = useState<string[]>([]);

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value && !tags.includes(value)) {
            setTags([...tags, value]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can add your logic to send data to the server.
        console.log({
            avatar,
            username,
            quote,
            firstName,
            lastName,
            middleName,
            phone,
            city,
            about,
            email, // Include email in the logged data
            tags,
        });
    };

    return (
        <div className="profile-edit">
            <h1>Редактировать профиль</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Аватарка:
                    <input type="file" onChange={(e) => setAvatar(URL.createObjectURL(e.target.files![0]))} />
                </label>
                {avatar && <img src={avatar} alt="Avatar Preview" className="avatar-preview" />}
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Email: {/* New Email label */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Handle email changes
                    />
                </label>
                <label>
                    Цитата:
                    <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} />
                </label>
                <label>
                    Имя:
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <label>
                    Фамилия:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <label>
                    Отчество:
                    <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                </label>
                <label>
                    Телефон:
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <label>
                    Город:
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <label>
                    О себе:
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label>
                    Теги технологий (введите и нажмите Enter):
                    <input type="text" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleTagsChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
                            (e.target as HTMLInputElement).value = '';
                        }
                    }} />
                </label>
                <div className="tags-list">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default ProfileEdit;