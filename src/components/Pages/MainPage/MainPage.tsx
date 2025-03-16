import React, { useEffect, useState } from 'react'

import List from '../../List/List'
import PostItem from '../../List/PostItem/PostItem'
import Sorting from '../../sorting/Sorting'
import Test from '../../test/Test'
import axios from 'axios'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Stack from '../../stack/Stack'
import PostCard from '../../List/PostItem/PostCard'

type Props = {}

export default function MainPage  (props: Props) {

  const [posts, setPosts] = useState([])

  const karpp = useAppSelector(state => state.user.userName);

  useEffect(() => {
    selectOption(); 
    
  }, [])
  

  const selectOption = () => {
    try {
      axios.get("http://localhost:5000/api/getPost", {
        // params: { select }
      }).then(res => {
        setPosts(res.data)
        console.log(res.data)
      })
      console.log('data--------------------------------------------------------------------', 'lfdedkfe')
      // setSmens()

    } catch (error) {
      console.log("error", error)
    }
    // if(data){
    //   nav('/main');
    // }
    // dispatch(authorizationUser(data))

  }
  
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