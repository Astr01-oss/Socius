import { useNavigate } from 'react-router'
import '../../../App.css'
import { authAPI } from '../../../shared/api/auth'

import logo from "../../../components/icons/logo.svg"

function NavPanel({onPage}){

  const navigate = useNavigate()
  const myCard = () => {navigate('/myquestionnaire')}
  const flow = () => {navigate('/flow')}
  const likes = () => {navigate('/likes')}
  const matches = () => {navigate('/matches')}
  const main = () => {navigate('/')}

  function logout(){
    authAPI.logout()
    main()
  }

  return(
    <div className="nav_panel">
      <div className="nav_pages">
        <button id='likes' onClick={likes}></button>
        <img src={logo} alt="" className='logo'/>
        <button id='matches' onClick={matches}></button>
      </div>
      { onPage === 'flow'?
      <div className='profile_button' onClick={myCard}><button id='profile'></button></div>
      :
      <div className='profile_button' onClick={flow}><button id='back'></button></div>  
      }
      <div className='profile_button' onClick={logout}><button id='logout'></button></div> 
    </div>
  )
}

export default NavPanel