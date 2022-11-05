import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../slice/token';
import './index.css';


type Props = {}

export default function Home({ }: Props) {
    const dispatch: any = useDispatch()
    const handleLogout = () => {
        dispatch(logoutUser({}))
    }

    return (
        <div className='main'>
            <Button danger type='primary' onClick={() => handleLogout()}> LogOut</Button>
        </div>
    );
}