import './MyProfile.css'; // Import CSS file for styling
import { Context } from '..';
import { useContext } from 'react';
import Loader from "../components/Loader";

const MyProfile = () => {
  const { isauthenticated, loader, user } = useContext(Context);
 
  return (
    loader ? <Loader /> : (
      <div className='profile' >
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    )
  );
};

export default MyProfile;
