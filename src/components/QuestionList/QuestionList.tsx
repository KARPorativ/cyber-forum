import React, { useEffect, useState } from 'react';
import List from '../List/List';
import axios from 'axios';
import './QuestionList.module.css';
interface Question {
  _id: string;
  title: string;
  description: string;
  author: {
    userName: string;
    avatar?: string;
  };
  createdAt: string;
  tags: string[];
  commentsCount: number;
  rating: number;
}
const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Question[]>("http://localhost:5000/api/getPost");
      setQuestions(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке вопросов');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="question-list">
      <List
        items={questions}
        renderItem={(question) => (
          <div key={question._id} className="question-item">
            <h3>{question.title}</h3>
            <p>{question.description}</p>
          </div>
        )}
      />
    </div>
  );
};
export default QuestionList;