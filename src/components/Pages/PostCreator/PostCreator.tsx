import React, { useEffect, useState } from 'react';
import './PostCreator.css';

const PostCreator: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
const PostCreator: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Проверка типа файла
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, загрузите изображение');
                return;
        }

            // Проверка размера файла (5MB максимум)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('Размер файла не должен превышать 5MB');
                return;
            }
            setImage(file);
            // Создаем URL для предпросмотра
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };
    // Очистка URL при размонтировании компонента
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        formData.append('tags', JSON.stringify(tags));
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Пост успешно создан!');
                // Очистка формы
                setTitle('');
                setDescription('');
                setContent('');
                setTags([]);
                setImage(null);
                setImagePreview('');
            } else {
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
                    placeholder="Краткое описание"
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
                <div className="image-upload-container">
                <input
                    type="file"
                    accept="image/*"
                        onChange={handleImageChange}
                    required
                />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>
                <div className="tags">
                    {/* Теги остаются без изменений */}
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};
//                 <div className="tags">
//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={tags.includes('Tag1')}
//                             onChange={() => handleTagChange('Tag1')}
//                         />
//                         Tag1
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={tags.includes('Tag2')}
//                             onChange={() => handleTagChange('Tag2')}
//                         />
//                         Tag2
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={tags.includes('Tag3')}
//                             onChange={() => handleTagChange('Tag3')}
//                         />
//                         Tag3
//                     </label>
//                 </div>
//                 <button type="submit">Отправить</button>
//             </form>
//         </div>
//     );
};

export default PostCreator;