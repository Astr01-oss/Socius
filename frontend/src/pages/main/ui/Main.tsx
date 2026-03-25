import { useEffect } from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../../../shared/api/auth";

const authorized = isAuthenticated()

function Main(){

  const navigate = useNavigate()
  const authorization = () => {navigate('/authorization');};
  const flow = () => {navigate('/flow');};

  useEffect(() => {
    authorized? flow() : authorization()
  }, [])

}

export default Main