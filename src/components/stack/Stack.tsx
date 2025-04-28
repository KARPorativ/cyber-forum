import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Tag } from '../../types/Post';
import classes from './Stack.module.css';

export default function Stack() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTags = searchParams.get('tags')?.split(',') || [];
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

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
    <Card className={`${classes.wrapper} shadow`}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Теги</Card.Title>
        <div className={classes.tagsContainer}>
          {tags.map(({ tag, tagCount }) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
              onClick={() => handleTagClick(tag)}
              className={classes.tagButton}
              size="sm"
            >
              {tag} <span className="badge bg-light text-dark ms-1">{tagCount}</span>
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}