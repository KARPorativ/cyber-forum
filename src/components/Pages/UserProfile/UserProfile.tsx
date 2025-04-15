import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import ChangeProfile from './ChangeProfile/ChangeProfile';
import classes from './UserProfile.module.css';
import List from '../../List/List';
import { IPost } from '../../../types/Post';
import UserPostItem from './UserPostItem/UserPostItem';

const UserProfile = () => {
    // const [posts, setPosts] = useState<IPost[]>([]);

    const posts = useAppSelector(state => state.user.posts);

    return (
        <div className={classes.wrapper}>
            <ChangeProfile />
            <List className={classes.lists} items={posts} renderItem={(post, index) => (
                <UserPostItem key={index} post={post} />
            )} />
        </div>
    );
};

export default UserProfile;