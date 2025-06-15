import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import defaultAvatar from "../../../foto/anonim.jpg";
import CommentItem from "../CommentItem/CommentItem";
import { Trash } from 'react-bootstrap-icons';

// Импортируем CSS Module
import styles from "./PostPage.module.css";
import { convertDate } from "../../../utils/convertDate";
import List from "../../List/List";
import { IPost } from "../../../types/Post";
import UserPostItem from "../UserProfile/UserPostItem/UserPostItem";

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
    t:{
    _id: string,
    tag: string,
    }
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
  const [simularPosts, setSimularPosts] = useState<IPost[]>([]);

  const navigate = useNavigate();

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
      console.log('привет')
      const response = await axios.get(
        `http://localhost:5000/api/post/${_id}/getSimularPosts`
      );
      // console.log('привет2');
      setSimularPosts(response.data);
      console.log("Похожие посты: ", response.data);
    } catch (err) {
      console.error("Ошибка при загрузке похожих постов:", err);
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

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/deletePost/${_id}`);
      navigate("/");
    } catch (err) {
      console.error("Ошибка при удалении поста", err);
    }
  };

  useEffect(() => {
    fetchPost();
    // getSimularPosts();
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
      <div className={styles.leftSide}>
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
        {/* <p className={styles.deletePost}>{userState.isAdmin && 'Вы админ'}</p> */}
        {userState.isAdmin && <Trash className={styles.deletePost} color="red" size={24} onClick={deletePost} />}
      </div>
      
      <div className={styles.body}>
        <h1 className={styles.title}>{post.title}</h1>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: post.description || "Нет описания" }}
        ></p>
        <p className={styles.date}>Опубликовано: {convertDate(post.datePublication)}</p>
        {/* Лайк и счетчик */}
        <div className={styles.container}>
          <p className={styles.likes}>Лайков {likeCount}</p>
          <button onClick={handleLikeClick} className={styles.likeButton}>
            👍
          </button>
        </div>

        <div className={styles.tagsContainer}>
          {post.tags.map((tagg, index) => (
            <span key={index} className={styles.tag}>
              
              <span style={{color: "red"}}># </span>{tagg.tag}
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
            // @ts-ignore
            comment={comment}
            // @ts-ignore
            postId={_id}
            // @ts-ignore
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
      <div className={styles.rightSide}>
        <h2>Похожие посты</h2>
        <hr/>
        <List items={simularPosts} renderItem={(post: IPost) => <UserPostItem key={post._id} post={post} />} />
      </div>
    </div>
  );
};

export default App;
