import { useState, useEffect } from "react";
import { cardApi } from "../../../shared/api/card";
import Characteristics from "../../../entities/user/ui/Characteristics";
import emptyavatar from "../../../components/icons/emptyavatar.jpg";
import CreateQusetionnaire from "./CreateQuestionnaire";
import NavPanel from "../../../widgets/nav-panel/ui/NavPanel";

function MyQuestionnaire({ myCardSettings, myCard }) {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redact, goToRedact] = useState(false);

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        const data = await cardApi.myCard();
        setQuestionnaire(data);
      } catch (error) {
        console.error("Ошибка загрузки анкеты:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestionnaire();
  }, []);

  if (loading) return <div className="container">Загрузка...</div>;
  if (!questionnaire) return <div className="container">Анкета не найдена. Создайте её.</div>;

  function myCardInfo() {
    return (
      <div className="container">
        <div className="content_container">
          <div className="card">
            <p>{questionnaire.name}</p>
            <img src={emptyavatar} alt="" className="avatar" />
            <Characteristics characteristics={questionnaire} />
            <button id="redact" onClick={() => goToRedact(true)}>
              Редактировать анкету
            </button>
          </div>
          <NavPanel onPage={"questionnaire"} />
        </div>
      </div>
    );
  }

  return (
    <>
      {redact ? (
        <CreateQusetionnaire
          myCard={myCard}
          initialData={questionnaire}
          onSuccess={() => {
            goToRedact(false);
            cardApi.myCard().then(setQuestionnaire);
          }}
        />
      ) : (
        myCardInfo()
      )}
    </>
  );
}
export default MyQuestionnaire;