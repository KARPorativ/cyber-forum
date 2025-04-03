import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "./Post/Post";

interface Comment {
  id: number;
  author: string;
  text: string;
}

interface PostProps {
  title: string;
  description: string;
  datePublication: string;
  likesCount: number;
  tags: string[];
  comments: Comment[];
  user: {
    avatar?: string | File;
    userName: string;
  };
}

const App: React.FC = () => {
  // Получаем _id из URL
  const { _id } = useParams<{ _id: string }>();
  const [post, setPost] = useState<PostProps | null>(null); // Храним данные полученного поста
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
console.log(_id,"dgg");
  // Функция для загрузки поста с сервера
  const fetchPost = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(_id);
      // Выполняем запрос на сервер
      const response = await axios.get(`http://localhost:5000/api/post/${_id}`);
      console.log(response.data);
      setPost(response.data);
      setLikeCount(response.data.likes || 0); // Устанавливаем количество лайков
    } catch (err: any) {
      setError(err.message || "Ошибка при загрузке поста");
    } finally {
      setLoading(false);
    }
  };

  // Загружаем пост при монтировании компонента
  // useEffect(() => {
  //   if (_id) {
  //     console.log("uw");
  //     fetchPost();
  //   }
  // }, [_id]);
  useEffect(() => {
    
      console.log("uw");
      fetchPost();
    
  }, []);

  // Лайк-функция
  const handleLikeClick = async () => {
    try {
      await axios.post(`/api/post/${_id}/like`); // Запрос на увеличение лайков
      setLikeCount((prev) => prev + 1);
    } catch (err) {
      console.error("Ошибка при добавлении лайка", err);
    }
  };

  if (loading) {
    return <div>Загрузка поста...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!post) {
    return <div>Пост не найден</div>;
  }

  return (
    // <div>
    //   <div className="post">
    //     <h1 className="post-title">{post.title}</h1>
    //     <p className="post-description">{post.description}</p>
    //     <p className="post-date">Дата публикации: {post.datePublication}</p>
    //     <div className="post-user-info">
    //       {/* <img
    //         src={post.user.avatar}
    //         alt="user-icon"
    //         className="user-icon"
    //       /> */}
    //       {/* <span className="username">{post.user.userName}</span> */}
    //     </div>
    //     <div className="post-likes">
    //       <button onClick={handleLikeClick} className="like-button">
    //         👍 {likeCount}
    //       </button>
    //     </div>
    //     <div className="post-tags">
    //       {post.tags.map((tag, index) => (
    //         <span key={index} className="tag">
    //           #{tag}
    //         </span>
    //       ))}
    //     </div>
    //     <div className="post-comments">
    //       {post.comments.length ? (
    //         post.comments.map((comment) => (
    //           <div key={comment.id} className="comment">
    //             {comment.text}
    //           </div>
    //         ))
    //       ) : (
    //         <div>Комментариев пока нет</div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div style={styles.postContainer}>
    <div style={styles.header}>
      {/* <img
        src={
          typeof post.user.avatar === "string"
            ? post.user.avatar
            : post.user.avatar ? URL.createObjectURL(post.user.avatar) : "https://via.placeholder.com/50" // Заглушка для аватара
        }
        alt={`${post.user.userName}'s avatar`}
        style={styles.avatar}
      /> */}
      <h2 style={styles.userName}>{post.user.userName}</h2>
    </div>

    <div style={styles.body}>
      <h1 style={styles.title}>{post.title}</h1>
      <p style={styles.description}>{post.description}</p>
      <p style={styles.date}>Опубликовано: {post.datePublication}</p>
      <p style={styles.likes}>👍 {post.likesCount} лайков</p>

      <div style={styles.tagsContainer}>
        {post.tags.map((tag, index) => (
          <span key={index} style={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
    </div>

    <div style={styles.commentsContainer}>
      <h3>Комментарии ({post.comments.length}):</h3>
      {post.comments.map((comment) => (
        <div key={comment.id} style={styles.comment}>
          <strong>{comment.author}</strong>: <span>{comment.text}</span>
        </div>
      ))}
    </div>
  </div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
  postContainer: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px 0",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  userName: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },
  body: {
    marginBottom: "16px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  description: {
    fontSize: "16px",
    marginBottom: "8px",
  },
  date: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: "8px",
  },
  likes: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  tag: {
    backgroundColor: "#e0e0e0",
    borderRadius: "12px",
    padding: "4px 8px",
    fontSize: "14px",
  },
  commentsContainer: {
    marginTop: "16px",
  },
  comment: {
    marginBottom: "8px",
    padding: "8px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
};

export default App;