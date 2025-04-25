import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classes from './Sorting.module.css';

export default function Sorting() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [author, setAuthor] = useState(searchParams.get('author') || '');
  const [stack, setStack] = useState(searchParams.get('stack') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'asc');
  const [showClosed, setShowClosed] = useState(
    searchParams.get('showClosed') === 'true' || false
  );

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
    <div className={`${classes.wrapper} card shadow-sm`}>
      <div className="card-body">
        <h5 className="card-title mb-4">Фильтры</h5>
        
        <div className="mb-3">
          <label className="form-label">Поиск по названию</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название"
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Поиск по автору</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Введите имя автора"
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Технологический стек</label>
          <select
            className="form-select form-select-sm"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
          >
            <option value="">Выберите стек</option>
            <option value="frontend">Фронтенд</option>
            <option value="backend">Бэкенд</option>
            <option value="fullstack">Фуллстэк</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Сортировка</label>
          <select
            className="form-select form-select-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>
        
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="showClosedSwitch"
            checked={showClosed}
            onChange={(e) => setShowClosed(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="showClosedSwitch">
            Показывать закрытые посты
          </label>
        </div>
      </div>
    </div>
  );
}