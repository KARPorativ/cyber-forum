import  { FC, useState } from 'react';
import { IComment, IUser } from '../../../types/Post';
import defaultAvatar from "../../../foto/anime4.gif";
import styles from './CommentItem.module.css';
import { Card, Image, Button } from 'react-bootstrap';
import axios from 'axios';

interface CommentItemProps {
  comment: IComment;
  user: IUser;
  postId: string;
  // handleLikeCommentClick?: (commentId: string) => void;
}

const CommentItem: FC<CommentItemProps> = ({ comment, user, postId }) => {
  
  const [likeCount, setLikeCount] = useState<number>(comment.likesCount);
  
  const handleLikeCommentClick = async (commentId: string | number) => {
      try {
        console.log("Executing handleLikeCommentClick...");
          console.log("Comment ID:", commentId);
        // console.log(userState._id, "user");
        
        const response = await axios.post(
          `http://localhost:5000/api/post/${postId}/likeComment`, {
          idUser: user._id,
          idComment: commentId,
        }
        );
        setLikeCount(response.data.comment.likesCount);
        console.log('karp', response.data)
        // await axios.post(`/api/post/${_id}/like`); // Запрос на увеличение лайков
        // setLikeCount((prev) => prev + 1);
      } catch (err) {
        console.error("Ошибка при добавлении лайка", err);
      }
    };
  return (
    <Card className={styles.comment}>
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <Image
            src={comment.author.avatar ? `https://serverforum.onrender.com/${comment.author.avatar}` : defaultAvatar}
            alt={`${comment.author.userName}'s avatar`}
            roundedCircle
            className={styles.userAvatar}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultAvatar;
            }}
          />
          <Card.Title className="mb-0 ms-2">
            {comment.author.userName}
          </Card.Title>
        </div>

        <Card.Text className="mb-3">{comment.text}</Card.Text>

        <div className={styles.container}>
          <p className={styles.likes}>Лайков {likeCount}</p>
          <Button 
            // variant="link" 
            onClick={() => handleLikeCommentClick(comment._id.toString())} 
            className={styles.likeButton}
          >
            👍
          </Button>
        </div>

        <Card.Footer className={`text-muted ${styles.date}`}>
          Опубликовано: { new Date(comment.datePublication).toLocaleString()}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default CommentItem;