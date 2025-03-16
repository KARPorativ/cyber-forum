import React from 'react';
import Post from './Post/Post';

const App: React.FC = () => {
  const postData = {
    title: "Заголовок поста",
    shortDescription: "Краткое описание поста",
    fullDescription: "Полное описание поста с подробностями и дополнительными сведениями.",
    images: ["url1.jpg", "url2.jpg", "url3.jpg"],
    userIcon: "userIcon.jpg",
    username: "Имя пользователя",
    publicationDate: "01.01.2024",
    comments: [
      { id: 1, text: "Первый комментарий" },
      { id: 2, text: "Второй комментарий" },
    ],
    likes: 23,
  };

  return (
    <div>
      <Post {...postData} />
    </div>
  );
};

export default App;