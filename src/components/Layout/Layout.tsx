import React, { useEffect, useState } from 'react'
import Test from '../test/Test'
import { Stack } from 'react-bootstrap'
import List from '../List/List'
import PostItem from '../List/PostItem/PostItem'
import Sorting from '../sorting/Sorting'
import axios from 'axios'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function Layout (props: Props) {

  
  
  return (
    <div>
      <Header></Header>
      <Outlet/>
    </div>
  )
}