import { useEffect, useState } from "react";
import { matchApi } from "../../shared/api/match";
import Card from '../../entities/user/ui/Card';
import NavPanel from "../../widgets/nav-panel/ui/NavPanel";

function LikesPage() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const data = await matchApi.getLikes();
        setLikes(data);
      } catch (error) {
        console.error("Ошибка загрузки лайков:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLikes();
  }, []);

  if (loading) return <div className="container">Загрузка...</div>;

  if (likes.length === 0) {
    return (
      <div className="container">
        <div className="content_container">
          <h1 className="nullCard">Вас ещё никто не лайкнул</h1>
          <NavPanel onPage="" />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content_container">
        {likes.map((like, idx) => (
          <Card key={idx} accountList={like} like={() => {}} disslike={() => {}} />
        ))}
        <NavPanel onPage="" />
      </div>
    </div>
  );
}

export default LikesPage;