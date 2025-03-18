import React, { useState } from 'react';
import classes from './Sorting.module.css';
import { Link } from 'react-router-dom';

type Props = {};
interface AsideProps {
  onSearch: (searchParams: SearchParams) => void;
}

interface SearchParams {
  title: string;
  author: string;
  stack: string;
  sort: string;
  showClosed: boolean;
}

export default function Sorting({}: Props) {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stack, setStack] = useState(''); // Изначально пустое значение
  const [sort, setSort] = useState('asc'); // Можно использовать 'asc' или 'desc'
  const [showClosed, setShowClosed] = useState(false);

  const handleSearch = () => {
      const searchParams: SearchParams = { title, author, stack, sort, showClosed };
      // onSearch(searchParams);
  };

  return (
    <div className={classes.wrapper}>
      <aside style={{ padding: '20px', border: '1px solid #ddd' }}>
        <h2>Фильтры</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Поиск по названию:
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Введите название" 
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Поиск по автору:
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              placeholder="Введите имя автора" 
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Выберите стек:
            <select value={stack} onChange={(e) => setStack(e.target.value)}>
              <option value="">Выберите стек</option>
              <option value="frontend">Фронтенд</option>
              <option value="backend">Бекэнд</option>
              <option value="fullstack">Фуллстэк</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Сортировка:
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Показывать закрытые посты:
            <input 
              type="checkbox" 
              checked={showClosed} 
              onChange={(e) => setShowClosed(e.target.checked)} 
            />
          </label>
        </div>
        <button onClick={handleSearch}>Поиск</button>
        <Link to="/profileedit">
        <button>dfgg</button>
        </Link>
      </aside>
    </div>
  );
}