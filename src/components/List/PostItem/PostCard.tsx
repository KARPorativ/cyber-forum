import React from 'react';
import { IPost } from '../../../types/Post';
import { Link } from 'react-router-dom';

interface PostProps {
    post: IPost;
}

const PostCard: React.FC<PostProps> =  ({post}) => {
    console.log('post', post)

    return (
        <Link to={`/post/${post._id}`}>
        <div style={styles.card}>
            <div style={styles.header}>
                <img src='src/foto/Никита.jpg' alt={post.userName} style={styles.userImage} />
                <div>
                    <h2 style={styles.userName}>userName</h2>
                    <span >{new Date().toLocaleDateString()}</span>
                </div>
            </div>
            <h3 style={styles.title}>{post.title || 'Нет заголовка'}</h3>
            <p style={styles.description}>{post.description || 'Нет описания'}</p>
            <div style={styles.tags}>
                {/* {tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>
                    {tag}
                    </span>
                    ))} */}
            </div>
            <div style={styles.footer}>
                <span style={styles.comments}>Комментарии: commentsCount</span>
                <span style={styles.rating}>Оценка: rating</span>
            </div>
        </div>
                    </Link>
    );
};

const styles = {
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    userImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    userName: {
        margin: '0',
        fontSize: '1.2em',
        fontWeight: 'bold',
    },
    title: {
        fontSize: '1.5em',
        margin: '10px 0',
    },
    description: {
        fontSize: '1em',
        color: '#333',
    },
    tags: {
        margin: '10px 0',
    },
    tag: {
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        padding: '5px 10px',
        marginRight: '5px',
        fontSize: '0.9em',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        fontSize: '0.9em',
        color: '#777',
    },
    comments: {
        marginRight: '10px',
    },
    rating: {
        fontWeight: 'bold',
    },
};

export default PostCard;