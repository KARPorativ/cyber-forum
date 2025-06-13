import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import MainPage from './components/Pages/MainPage/MainPage'
import Question from './components/question/Question'
import Login from './components/Windows/Login/Login'
import Register from './components/Windows/Register/Register'
import PostCreator from './components/Pages/PostCreator/PostCreator'

import UserProfile from './components/Pages/UserProfile/UserProfile'
import ProfileEdit from './components/Pages/ProfileEdit/ProfileEdit'
import QuestionList from './components/QuestionList/QuestionList'
import PostFull from './components/Pages/PostFull/PostFull'

function App() {

  

  useEffect(() => {
    selectOption();


  }, [])


  const selectOption = () => {
    try {
      axios.get("http://localhost:5000/api/getPost", {
        // params: { select }
      }).then(res => {
        
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

  // const posts = [{title: 'karp', description: 'karp swim'}, {title: 'cazan', description: 'cazan read'}]


  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/question' element={<Question />} />
          <Route path='/addpost' element={<PostCreator />} />
          {/* <Route path='/p' element={<PostFull />} /> */}
          <Route path='/profile' element={<UserProfile avatarUrl={'src/foto/Никита.jpg'} username={'karp'} quote={'Рациональный иррационалист'} firstName={'Даниил'} lastName={'Розгоняев'} middleName={'Фёдорович'} phone={'89377992781'} city={'Самара'} about={'ывкрмрркврр'} techTags={["karp", "cazan"]} />} />
          <Route path='/profileedit' element={<ProfileEdit />} />
          <Route path='/questions' element={<QuestionList />} />
          <Route path="/post/:_id" element={<PostFull/>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
  )
}

export default App
