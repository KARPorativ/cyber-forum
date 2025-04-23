import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import useIsAuth from '../../hooks/useIsAuth'

type Props = {}

export default function Layout (props: Props) {

  // useIsAuth();
  
  return (
    <>
      <Header></Header>
      <Outlet/>
    </>
  )
}