import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';

function useLocalStorage(initialValue, key) {
  const geValue = () => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return initialValue;
  };
  
  const [storage, setStorage] = useState(geValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storage));
  }, [storage]);
  
  return { storage, setStorage };
}

const localStorage = () => {
  const { setStorage } = useLocalStorage(null, 'user');
  const state = useSelector((state) => state);
  const user = state.userActions.user;
  console.log(user);
  //setStorage(() => user);
}