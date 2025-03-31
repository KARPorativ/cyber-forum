import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PostCreator.css';

const PostCreator: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const quillRef = useRef<ReactQuill>(null);

    // Конфигурация редактора Quill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image', 'code-block'],
            ['clean']
        ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image', 'code-block'
    ];

    const handleEditorChange = (value: string) => {
        setContent(value);
    };

    // Остальные обработчики остаются без изменений
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, загрузите изображение');
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('Размер файла не должен превышать 5MB');
                return;
            }
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

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
                setTitle('');
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

                {/* Заменяем textarea на ReactQuill */}
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={formats}
                    ref={quillRef}
                    placeholder="Основная часть"
                    className="quill-editor"
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

export default PostCreator;