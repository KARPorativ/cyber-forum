import React, { useState, useEffect } from 'react';
import classes from './Sorting.module.css';
import { Link, useSearchParams } from 'react-router-dom';

interface SearchParams {
  title: string;
  author: string;
  stack: string;
  sort: string;
  showClosed: boolean;
}

export default function Sorting() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Инициализация состояний из URL параметров
  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [author, setAuthor] = useState(searchParams.get('author') || '');
  const [stack, setStack] = useState(searchParams.get('stack') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'asc');
  const [showClosed, setShowClosed] = useState(
    searchParams.get('showClosed') === 'true' || false
  );

  // Эффект для обновления URL при изменении параметров
  useEffect(() => {
    const params = new URLSearchParams();
    if (title) params.set('title', title);
    if (author) params.set('author', author);
    if (stack) params.set('stack', stack);
    params.set('sort', sort);
    params.set('showClosed', showClosed.toString());
    
    setSearchParams(params);
  }, [title, author, stack, sort, showClosed, setSearchParams]);

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
        
          <button>dfgg</button>
      </aside>
    </div>
  );
}