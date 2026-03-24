import Flow from "../../widgets/card-stack/ui/CardStack"

  const accountLikeList = [ 
    {name : 'Лена', age : 19, city : 'Москва', games : ["Дота", "Валорант", "Кс"], id: 1},
    {name : 'Вика', age : 22, city : 'Москва', games : ["Майнкрафт", "Кс"], id: 1},
    {name : 'Настя', age : 16, city : 'Москва', games : ["Лол", "Валорант", "Кс"], id: 1},
    {name : 'Саша', age : 17, city : 'Москва', games : ["Дота", "Майнкрафт", "Кс"], id: 1},
    {name : 'Маша', age : 20, city : 'Москва', games : ["Фортнайт", "Валорант", "Кс"], id: 1},
  ]

function Likes(){
  return(
    <Flow  accountList={accountLikeList} onPage = {'likes'}/>
  )
}

export default Likes