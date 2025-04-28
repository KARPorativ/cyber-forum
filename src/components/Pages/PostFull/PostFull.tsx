import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { useAppSelector } from "../../../hooks/reduxHooks";
import defaultAvatar from "../../../foto/Никита.jpg";
import CommentItem from "../CommentItem/CommentItem";

// Импортируем CSS Module
import styles from "./PostPage.module.css";

interface Comment {
  _id: number;
  author: {
    avatar?: string | File;
    userName: string;
  };
  text: string;
  datePublication: string;
  likesCount: number;
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
  const userState = useAppSelector((state) => state.user);
  const { _id } = useParams<{ _id: string }>();
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/post/${_id}`);
      setPost(response.data);
      setLikeCount(response.data.likes || 0);
    } catch (err: any) {
      setError(err.message || "Ошибка при загрузке поста");
    } finally {
      setLoading(false);
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/post/${_id}/getLikePost`
      );
      setLikeCount(response.data);
    } catch (err) {
      // можно оставить пустым или логировать
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/api/post/${_id}/comment`,
        { text: newComment, idUser: userState._id }
      );
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
      setNewComment("");
    } catch (err) {
      console.error("Ошибка при добавлении комментария", err);
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/post/${_id}/likePost`,
        { idUser: userState._id }
      );
      setLikeCount(response.data);
    } catch (err) {
      console.error("Ошибка при добавлении лайка", err);
    }
  };

  const handleLikeCommentClick = async (commentId: string | number) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/post/${_id}/likeComment`,
        {
          idUser: userState._id,
          idComment: commentId,
        }
      );
      setLikeCount(response.data);
    } catch (err) {
      console.error("Ошибка при добавлении лайка", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
    <div className={styles.postContainer}>
      <div className={styles.header}>
        <img
          src={
            post.author.avatar
              ? `http://localhost:5000/${post.author.avatar}`
              : defaultAvatar
          }
          alt={`${post.author.userName}'s avatar`}
          className={styles.postAvatar}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultAvatar;
          }}
        />
        <h2 className={styles.userName}>{post.author.userName}</h2>
      </div>
      <p>{userState.isAdmin && 'Вы админ'}</p>
      <div className={styles.body}>
        <h1 className={styles.title}>{post.title}</h1>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: post.description || "Нет описания" }}
        ></p>
        <p className={styles.date}>Опубликовано: {post.datePublication}</p>
        {/* Лайк и счетчик */}
        <div className={styles.container}>
          <p className={styles.likes}>Лайков {likeCount}</p>
          <button onClick={handleLikeClick} className={styles.likeButton}>
            👍
          </button>
        </div>

        <div className={styles.tagsContainer}>
          {post.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag.tag}
            </span>
          ))}
        </div>
      </div>

      {/* Комментарии */}
      <div className={styles.commentsContainer}>
        <h3>Комментарии ({post.comments.length}):</h3>
        {post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={_id}
            user={userState}
            handleLikeComment={handleLikeCommentClick}
            styles={styles}
          />
        ))}

        {/* Форма для добавления комментария */}
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Оставьте комментарий..."
            className={styles.textArea}
          />
          <button type="submit" className={styles.submitButton}>
            Добавить комментарий
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
