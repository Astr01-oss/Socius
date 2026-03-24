import CardStack from "../../widgets/card-stack/ui/CardStack"

function Matches(){

  const accountMathesList = [ 
    {name : 'Ника', age : 18, city : 'Москва', games : ["Дота", "Валорант", "Кс"], id: 1},
    {name : 'Вика', age : 23, city : 'Москва', games : ["Майнкрафт", "Кс"], id: 1},
  ]

  return(
    <CardStack accountList={accountMathesList} onPage = {'matches'}/>
  )
}

export default Matches