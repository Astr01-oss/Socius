import { useEffect, useState } from "react";
import { matchApi } from "../../shared/api/match";
import Card from '../../entities/user/ui/Card';
import NavPanel from "../../widgets/nav-panel/ui/NavPanel";
import Loader from "../../widgets/lodaer/Loader";

function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await matchApi.getMatches();
        setMatches(data);
      } catch (error) {
        console.error("Ошибка загрузки мэтчей:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, []);

  if (loading) return <Loader/>;

  if (matches.length === 0) {
    return (
      <div className="container">
        <div className="content_container">
          <h1 className="nullCard">У вас пока нет взаимных симпатий</h1>
          <NavPanel onPage="" />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content_container">
        {matches.map((match, idx) => (
          <Card key={idx} accountList={match} like={() => {}} disslike={() => {}} />
        ))}
        <NavPanel onPage="" />
      </div>
    </div>
  );
}

export default MatchesPage;