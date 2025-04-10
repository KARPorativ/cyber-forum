import React from 'react';
import { Card, Badge, Stack } from 'react-bootstrap';
import { IPost } from '../../../../types/Post';
import { Link } from 'react-router-dom';

interface PostListItemProps {
  post: IPost;
}

const UserPostItem: React.FC<PostListItemProps> = ({ post }) => {
  console.log("post65",  post);
  return (
    <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Card className="mb-3 w-100" style={{ maxHeight: '200px', overflow: 'hidden' }}>
      <Card.Body className="p-3">
        <div className="d-flex">
          {/* Аватар пользователя */}
          <div className="me-3">
            <img
              src={post?.author?.avatar ? `http://localhost:5000/${post?.author?.avatar}` : 'https://via.placeholder.com/40'}
              alt={post.userName}
              className="rounded-circle"
              width="40"
              height="40"
            />
          </div>
          
          <div className="flex-grow-1" style={{ minWidth: 0 }}> 
            {/* Заголовок и рейтинг */}
            <div className="d-flex justify-content-between align-items-start">
              <Card.Title 
                className="mb-1 text-truncate" 
                style={{ fontSize: '1.1rem', maxWidth: 'calc(100% - 50px)' }}
              >
                {post.title}
              </Card.Title>
              <small className="text-muted">+{post.rating}</small>
            </div>
            
            {/* Имя пользователя */}
            <Card.Subtitle className="mb-2 text-muted text-truncate" style={{ fontSize: '0.8rem' }}>
              @{post.userName}
            </Card.Subtitle>
            
            {/* Описание поста */}
            <Card.Text 
              className="mb-2"
              style={{ 
                fontSize: '0.9rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {post.description}
            </Card.Text>
            
            {/* Теги и количество комментариев */}
            <div className="d-flex justify-content-between align-items-end">
              <Stack direction="horizontal" gap={1} className="flex-wrap">
                {post?.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={index} 
                    bg="light" 
                    text="dark" 
                    className="text-truncate" 
                    style={{ maxWidth: '100px' }}
                  >
                    {tag.tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge bg="light" text="dark">+{post.tags.length - 3}</Badge>
                )}
              </Stack>
              
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                <i className="bi bi-chat me-1"></i>
                {post.commentsCount}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
    </Link>
  );
};

export default UserPostItem;