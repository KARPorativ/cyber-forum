import { useEffect, useState } from 'react'
import List from '../../List/List'
import Sorting from '../../sorting/Sorting'
import axios from 'axios'
import Stack from '../../stack/Stack'
import PostCard from '../../List/PostItem/PostCard'
import { useSearchParams } from 'react-router-dom'
import classes from './MainPage.module.css'


export default function MainPage  () {

  const [posts, setPosts] = useState([])
  const [_, setLoading] = useState(false);

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

      console.log('Все посты', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchParams]);

  
  return (
      <div className={classes.main}>
        <Sorting></Sorting>
      {/* <List items = {posts} renderItem={(post) =>
        <PostItem post ={post}></PostItem>
      }></List> */}
      <List items = {posts} renderItem={(post) =>
        <PostCard post ={post}></PostCard>
      }></List>
      <Stack></Stack>
      </div>
  )
}