import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "./Post/Post";
import { useAppSelector } from "../../hooks/reduxHooks";

interface Comment {
  _id: number;
  author: {
    avatar?: string | File;
    userName: string; 
  }
  text: string;
  datePublication: string;
  likes: number;
}

interface PostProps {
  title: string;
  description: string;
  datePublication: string;
  likesCount: number;
  tags: [
    _id: string,
    tag: string,
  ];
  comments: Comment[];
  author: {
    avatar?: string | File;
    userName: string;
  };
}

const App: React.FC = () => {
  const defaultAvatar = 'src/foto/Никита.jpg';
  // Получаем _id из URL
  const userState = useAppSelector(state => state.user);
  const { _id } = useParams<{ _id: string }>();
  const [post, setPost] = useState<PostProps | null>(null); // Храним данные полученного поста
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");

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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;
    console.log(userState._id,"userState._id");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/post/${_id}/comment`,
        { text: newComment, idUser: userState._id }
      );
      // Добавление нового комментария в состояние
      // setPost((prevPost) =>
      //   prevPost
      //     ? { ...prevPost, comments: [...prevPost.comments, response.data] }
      //     : null
      // );
      setPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              comments: [
                ...prevPost.comments,
                {
                  ...response.data,
                  likes: response.data.likes || 0,
                  datePublication: response.data.datePublication || new Date().toISOString(),
                },
              ],
            }
          : null
      );
      setNewComment(""); // Очистка поля ввода
    } catch (err) {
      console.error("Ошибка при добавлении комментария", err);
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

    <div style={styles.postContainer}>
      <div style={styles.header}>
        {/* <img
        src={
          typeof post.author.avatar === "string"
            ? post.author.avatar
            : post.author.avatar ? URL.createObjectURL(post.author.avatar) : "src/foto/Никита.jpg" // Заглушка для аватара
        }
        alt={`${post.author.userName}'s avatar`}
        style={styles.avatar}
      /> */}
        <img
          src={post.author.avatar ? `http://localhost:5000/${post.author.avatar}` : defaultAvatar}
          alt={`${post.author.userName}'s avatar`}
          className="user-avatar"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultAvatar;
          }}
        />
        <h2 style={styles.userName}>{post.author.userName}</h2>
      </div>

      <div style={styles.body}>
        <h1 style={styles.title}>{post.title}</h1>
        <p style={styles.description}>{post.description}</p>
        <p style={styles.date}>Опубликовано: {post.datePublication}</p>
        <p style={styles.likes}>👍 {post.likesCount} лайков</p>

        <div style={styles.tagsContainer}>
          {post.tags.map((tag, index) => (
            <span key={index} style={styles.tag}>
              #{tag.tag}
            </span>
          ))}
        </div>
      </div>

      {/* <div style={styles.commentsContainer}>
        <h3>Комментарии ({post.comments.length}):</h3>
        {post.comments.map((comment) => (
          <div key={comment.id} style={styles.comment}>
            <strong>{comment.author}</strong>: <span>{comment.text}</span>
          </div>
        ))}
      </div> */}
      <div style={styles.commentsContainer}>
        <h3>Комментарии ({post.comments.length}):</h3>
        {post.comments.map((comment) => (
          // <div key={comment._id} style={styles.comment}>
          //   <strong>{comment.author.userName}</strong>: <span>{comment.text}</span>
          // </div>
          <div key={comment._id} style={styles.comment}>
  {/* <img
    src={comment.author.avatar ? `http://localhost:5000/${comment.author.avatar}` : defaultAvatar}
    alt={`${comment.author.userName}'s avatar`}
    className="user-avatar"
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = defaultAvatar;
    }}
  /> */}
  <img 
                        src={comment.author.avatar ? `http://localhost:5000/${comment.author.avatar}` : defaultAvatar} 
                        alt={`${comment.author.userName}'s avatar`} 
                        style={styles.userAvatar}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultAvatar;
                        }}
                    />
  
  <strong>{comment.author.userName}</strong>: <span>{comment.text}</span>
  <p>Likes: {comment.likes}</p>
  
  <p>Published: {comment.datePublication}</p>
</div>
        ))}

        {/* Форма для добавления нового комментария */}
        <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Оставьте комментарий..."
            style={styles.textArea}
          />
          <button type="submit" style={styles.submitButton}>
            Добавить комментарий
          </button>
        </form>
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
  userAvatar:{
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    objectFit: "cover",
    marginLeft: "10px",
    marginBottom: "5px",
  },
};

export default App;