import React, { useEffect, useState } from 'react'

import List from '../../List/List'
import PostItem from '../../List/PostItem/PostItem'
import Sorting from '../../sorting/Sorting'
import Test from '../../test/Test'
import axios from 'axios'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Stack from '../../stack/Stack'
import PostCard from '../../List/PostItem/PostCard'
import { useSearchParams } from 'react-router-dom'

type Props = {}

export default function MainPage  (props: Props) {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  // const karpp = useAppSelector(state => state.user.userName);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Собираем параметры из URL
      const params = {
        title: searchParams.get('title') || undefined,
        author: searchParams.get('author') || undefined,
        stack: searchParams.get('stack') || undefined,
        sort: searchParams.get('sort') || 'asc',
        showClosed: searchParams.get('showClosed') || 'false',
        tags: searchParams.get('tags')?.split(',') || undefined
      };

      // Отправляем GET-запрос с параметрами
      const response = await axios.get('http://localhost:5000/api/getPostsWithParams', {
        params: params
      });

      setPosts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    } finally {
      setLoading(false);
    }
  };

  // Можно вызывать автоматически при изменении параметров
  useEffect(() => {
    fetchPosts();
  }, [searchParams]);

  
  return (
    <div>
      <div className='main'>
        <Sorting></Sorting>
      {/* <List items = {posts} renderItem={(post) =>
        <PostItem post ={post}></PostItem>
      }></List> */}
      <List items = {posts} renderItem={(post) =>
        <PostCard post ={post}></PostCard>
      }></List>
      <Stack></Stack>
      </div>
    </div>
  )
}