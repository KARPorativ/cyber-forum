import React, { useState } from 'react';
import './PostCreator.css';

const PostCreator: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);

    const handleTagChange = (tag: string) => {
        if (tags.includes(tag)) {
            setTags(tags.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content', content);
        formData.append('image', image!);
        formData.append('tags', JSON.stringify(tags));

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                // Handle successful response
                alert('Пост успешно создан!');
            } else {
                // Handle error response
                alert('Произошла ошибка при создании поста.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при создании поста.');
        }
    };

    return (
        <div className="post-creator">
            <h1>Создать пост</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Заглавие"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Краткое описание (будет представленно в описание поста)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <textarea
                    className='textAr'
                    placeholder="Основная часть"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            setImage(e.target.files[0]);
                        }
                    }}
                    required
                />
                <div className="tags">
                    <label>
                        <input
                            type="checkbox"
                            checked={tags.includes('Tag1')}
                            onChange={() => handleTagChange('Tag1')}
                        />
                        Tag1
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={tags.includes('Tag2')}
                            onChange={() => handleTagChange('Tag2')}
                        />
                        Tag2
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={tags.includes('Tag3')}
                            onChange={() => handleTagChange('Tag3')}
                        />
                        Tag3
                    </label>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default PostCreator;