import Header from '../header/Header'
import { Outlet } from 'react-router-dom'




export default function Layout () {

  // useIsAuth();
  
  return (
    <>
      <Header></Header>
      <Outlet/>
    </>
  )
}