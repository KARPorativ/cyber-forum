import React from 'react'
import Button from 'react-bootstrap/Button';
import classes from './PostItem.module.css'
import axios from 'axios';

interface IPost{
  post:{
    title: string,
    description: string
  }
}

export default function PostItem({post}: IPost) {

  

  return (
    // <div className={classes.mainContainer}>
    //   <div className={classes.leftColumn}>
    //     <img src='src\foto\Никита.jpg' className={classes.image}></img>
    //     <p>{post.title}</p>
    //   </div>
    //   <div className={classes.centralColumn}>
    //   <p className={classes.item}>{post.title}</p>
    //   <p className={classes.item}>{post.description}</p>

    //   </div>
    //   <div className={classes.rightColumn}>
    //     <p>Теги</p>
    //     <p>Комментарии</p>
    //     <p>Оценки</p>
    //     <Button variant="outline-danger">Danger</Button>
        

    //   </div>
    // </div>
    <div className={classes.mainContainer}>
      <div className={classes.leftColumn}>
        <img src='src/foto/Никита.jpg' alt="Post Image" className={classes.image} />
        <p>{post.title}</p>
      </div>
      <div className={classes.centralColumn}>
        <p className={classes.item}>{post.title}</p>
        <p className={classes.item}>{post.description}</p>
      </div>
      <div className={classes.rightColumn}>
        <h4>Теги</h4>
        <p>Комментарии</p>
        <p>Оценки</p>
        {/* <Button variant="outline-danger">Danger</Button> */}
      </div>
    </div>
    
  )
}