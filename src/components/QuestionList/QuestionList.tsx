import React, { useEffect, useState } from 'react';
import List from '../List/List';
import axios from 'axios';
import './QuestionList.module.css';
import anime1 from '../../foto/anime1.gif';
import anime2 from '../../foto/anime2.gif';
import anime3 from '../../foto/anime3.gif';
import anime4 from '../../foto/anime4.gif';

const QuestionList: React.FC = () => {
 
  return (
    <div className="question-list">
      <img src={anime1} style={{maxWidth: "400px"}} alt="Описание анимированного изображения" />
      <img src={anime2} style={{maxWidth: "400px"}} alt="Описание анимированного изображения" />
      <img src={anime3} style={{maxWidth: "400px"}} alt="Описание анимированного изображения" />
      <img src={anime4} style={{maxWidth: "400px"}} alt="Описание анимированного изображения" />

    </div>
  );
};
export default QuestionList;