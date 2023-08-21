import {Navigate} from 'react-router-dom'
import { ReactNodeSchema, SessionSchema } from '../Utils';

const PrivateRoute = ({children}:ReactNodeSchema) => {
    const {username, email}:SessionSchema = JSON.parse(sessionStorage.getItem('login')  || '');
    if(!username || !email){
        return <Navigate to='login' />
    }
  return (
    <>{children}</>
  )
}

export default PrivateRoute