import Flow from "./Flow/Flow"

function Matches(){

  const accountMathesList = [ 
    {name : 'Ника', age : 18, city : 'Москва', games : ["Дота", "Валорант", "Кс"], id: 1},
    {name : 'Вика', age : 23, city : 'Москва', games : ["Майнкрафт", "Кс"], id: 1},
  ]

  return(
    <Flow accountList={accountMathesList} onPage = {'matches'}/>
  )
}

export default Matches