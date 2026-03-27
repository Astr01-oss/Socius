import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authAPI } from "../../../shared/api/auth";
import Loader from "../../../widgets/lodaer/Loader";

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
    return <Loader/>;
  }

  return null;
}

export default Main;