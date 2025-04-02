import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PostCreator.css';
import { useAppSelector } from '../../../hooks/reduxHooks';

const PostCreator: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const quillRef = useRef<ReactQuill>(null);
    const [tagInput, setTagInput] = useState<string>('');

    const _id = useAppSelector(state => state.user._id);
    
    // Обработчик добавления тега
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        if ((e as React.KeyboardEvent).key && (e as React.KeyboardEvent).key !== 'Enter') return;
        
        e.preventDefault();
        const newTag = tagInput.trim();
        
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setTagInput('');
        }
    };

    // Удаление тега
    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

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
        const plainTextContent = new DOMParser().parseFromString(content, 'text/html').body.textContent || "";

        const formData = new FormData();
        formData.append('_id', _id);
        formData.append('title', title);
        formData.append('content', plainTextContent);
        if (image) {
            formData.append('image', image);
        }
        formData.append('tags', JSON.stringify(tags));
        const formDataToObject = (formData: FormData) => {
            const obj: Record<string, any> = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            return obj;
        };
        
        // Использование:
        console.log('FormData as object:', formDataToObject(formData));
        try {
            const response = await fetch('http://localhost:5000/api/createPost', {
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
                {tags.length !== 0 && <div className="tags-input-container">
                    
                    {tags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                            <span>{tag}</span>
                            <button 
                                type="button" 
                                onClick={() => removeTag(index)}
                                className="tag-remove"
                            >×</button>
                        </div>
                    ))}
                    </div>}
                    <input
                        type="text"
                        placeholder="Добавьте теги (нажмите Enter)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="tag-input"
                    />
                    <button 
                        type="button" 
                        onClick={handleAddTag}
                        className="tag-add-button"
                    >Добавить</button>
                
            </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default PostCreator;