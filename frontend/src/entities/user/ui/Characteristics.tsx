function Characteristics({characteristics}){

  return(
    <div className="filters">
      <div className="characteristic">{characteristics.age + ' лет'}</div>
      <div className="characteristic">{characteristics.city}</div>
    </div>
  )
}

export default Characteristics