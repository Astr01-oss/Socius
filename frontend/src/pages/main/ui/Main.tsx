import { useEffect } from "react";
import { useNavigate } from "react-router";

function Main({authorized}){

  const navigate = useNavigate()
  const authorization = () => {navigate('/authorization');};
  const flow = () => {navigate('/flow');};

  useEffect(() => {
    authorized? flow() : authorization()
  }, [])

}

export default Main