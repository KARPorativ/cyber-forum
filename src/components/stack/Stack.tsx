import React, { useEffect, useState } from 'react';
import classes from './Stack.module.css';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Tag } from '../../types/Post';

type Props = {};

export default function Stack({ }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Получаем теги из URL при первом рендере
  const initialTags = searchParams.get('tags')?.split(',') || [];
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  // Загрузка тегов с сервера
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getTags');
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  // Обновление URL при изменении selectedTags
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedTags.length > 0) {
      newParams.set('tags', selectedTags.join(','));
    } else {
      newParams.delete('tags');
    }
    setSearchParams(newParams, { replace: true });
  }, [selectedTags, searchParams, setSearchParams]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div className={classes.wrapper}>
      <h4>Теги</h4>
      <div className={classes.tagsContainer}>
        {tags.map(({ tag, tagCount }) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
            onClick={() => handleTagClick(tag)}
            className={classes.tagButton}
          >
            {tag} ({tagCount})
          </Button>
        ))}
      </div>
    </div>
  );
}