import React from 'react';
import { IPost } from '../../../types/Post';
import { Link } from 'react-router-dom';
import { convertDate } from '../../../utils/convertDate';
import TagsItem from './TagsItem';
import classes from './PostCard.module.css';
import defaultImg from '../../../foto/defaultProgrammist.gif';

interface PostProps {
    post: IPost;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
    // console.log("img", post.image);
    
    return (
        <Link to={`/post/${post._id}`} className={classes.link}>
            <div className={classes.card}>
                <div className={classes.header}>
                    <img 
                        src={post.image || defaultImg} 
                        alt={post.userName} 
                        className={classes.userImage} 
                    />
                    <div>
                        <h2 className={classes.userName}>{post.author.userName || "userName"}</h2>
                        <span>{convertDate(post.datePublication)}</span>
                    </div>
                    <div className={classes.tags}>
                        {post.tags.length ? (
                            post.tags.map((tag, index) => (
                                <TagsItem key={index} tag={tag} />
                            ))
                        ) : (
                            <span className={classes.noTags}>без тегов</span>
                        )}
                    </div>
                </div>
                <h3 className={classes.title}>{post.title || 'Нет заголовка'}</h3>
                <div 
                    className={classes.description} 
                    dangerouslySetInnerHTML={{ __html: post.description || 'Нет описания' }}
                />
                <div className={classes.footer}>
                    <span className={classes.comments}>Комментарии: {post.comments.length}</span>
                    <span className={classes.rating}>Популярность: {post.likesCount}</span>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;