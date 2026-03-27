import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authAPI } from "../../../shared/api/auth";

function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authAPI.verify();
      if (user) {
        navigate('/flow');
      } else {
        navigate('/authorization');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }

  return null; // или можно вернуть спиннер
}

export default Main;