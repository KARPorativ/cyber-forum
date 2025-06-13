import React, { useState } from 'react';
import './Post.css';


interface Comment {
  id: number;
  text: string;
}

interface PostProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  userIcon: string;
  username: string;
  publicationDate: string;
  comments: Comment[];
  likes: number;
}

const Post: React.FC<PostProps> = ({
  title,
  shortDescription,
  fullDescription,
  images,
  userIcon,
  username,
  publicationDate,
  comments,
  likes,
}) => {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };
  console.log('comments', comments)
  
  return (
    <div className="post">
      <h1 className="post-title">{title}</h1>
      <p className="post-short-description">{shortDescription}</p>
      <div className="post-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`post-image-${index}`} className="post-image" />
        ))}
      </div>
      <p className="post-full-description">{fullDescription}</p>
      <div className="post-user-info">
        <img src={userIcon} alt="user-icon" className="user-icon" />
        <span className="username">{username}</span>
        <span className="publication-date">{publicationDate}</span>
      </div>
      <div className="post-likes">
        <button onClick={handleLikeClick} className="like-button">👍 {likeCount}</button>
      </div>
      <div className="post-comments">
        {comments ? comments.map((comment) => (
          <div key={comment.id} className="comment">
            {comment.text}
          </div>
        )) : <div>Пустота в твоем сердце</div>}
      </div>
    </div>
  );
};

export default Post;