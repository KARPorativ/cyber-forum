import { useEffect, useState } from 'react'
import './App.css'
import List from './components/List/List'
import PostItem from './components/List/PostItem/PostItem'
import Header from './components/header/Header'
import Stack from './components/stack/Stack'
import Layout from './components/Layout/Layout'
import Sorting from './components/sorting/Sorting'
import Test from './components/test/Test'
import axios from 'axios'
import { Route, Router, Routes } from 'react-router-dom'
import MainPage from './components/Pages/MainPage/MainPage'
import Question from './components/question/Question'
import Login from './components/Windows/Login/Login'
import Register from './components/Windows/Register/Register'
import PostCreator from './components/Pages/PostCreator/PostCreator'
import P from './components/Pages/P'
import UserProfile from './components/Pages/UserProfile/UserProfile'
import ProfileEdit from './components/Pages/ProfileEdit/ProfileEdit'

function App() {

  const [posts, setPosts] = useState([])

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

  // const posts = [{title: 'karp', description: 'karp swim'}, {title: 'cazan', description: 'cazan read'}]


  return (
    <div>
      
      <Routes>
        <Route path="/"  element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path='/question' element={<Question/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/addpost' element={<PostCreator/>}/>
        <Route path='/p' element={<P/>}/>
        <Route path='/profile' element={<UserProfile avatarUrl={'src/foto/Никита.jpg'} username={'karp'} quote={'Рациональный иррационалист'} firstName={'Даниил'} lastName={'Розгоняев'} middleName={'Фёдорович'} phone={'89377992781'} city={'Самара'} about={'ывкрмрркврр'} techTags={["karp","cazan"]}/>}/>
        <Route path='/profileedit' element={<ProfileEdit/>}/>

        </Route>
      </Routes>
      
    </div>
  )
}

export default App
