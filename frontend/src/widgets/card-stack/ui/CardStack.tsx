import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavPanel from "../../nav-panel/ui/NavPanel";
import Card from '../../../entities/user/ui/Card';
import './CardStack.css';
import { cardApi } from "../../../shared/api/card";

function CardStack({ onPage }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadFeed = async () => {
    try {
      const data = await cardApi.feed();
      setCards(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Ошибка загрузки ленты:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleSwipe = async (action: 'like' | 'dislike') => {
    if (currentIndex >= cards.length) return;
    const target = cards[currentIndex];
    try {
      const result = await cardApi.swipe(target.user_id, action);
      if (result.matched && action === 'like') {
        setMatchMessage(`Вы понравились ${target.name}! Это взаимно!`);
        setTimeout(() => setMatchMessage(null), 3000);
      }
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error("Ошибка при свайпе:", error);
    }
  };

  if (loading) return <div className="container">Загрузка...</div>;

  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <div className="container">
        <div className="content_container">
          <h1 className="nullCard">Анкеты закончились</h1>
          <NavPanel onPage={onPage === 'flow' ? 'flow' : ''} />
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="container">
      {matchMessage && (
        <div style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#8A38F5',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          zIndex: 1000
        }}>
          {matchMessage}
        </div>
      )}
      <div className="content_container">
        <Card
          like={() => handleSwipe('like')}
          disslike={() => handleSwipe('dislike')}
          accountList={currentCard}
        />
        <NavPanel onPage={onPage === 'flow' ? 'flow' : ''} />
      </div>
    </div>
  );
}

export default CardStack;