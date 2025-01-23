import { useState, useEffect } from "react";
import { TUser } from "../models";

const useGetUser = (trigger?: boolean): TUser | null => {
  const [storedUser, setStoredUser] = useState<TUser | null>(null);

  useEffect(() => {
    const saveUser = localStorage.getItem('site_user_profile');
    if (saveUser) setStoredUser(JSON.parse(saveUser));
  }, [trigger]);

  return storedUser;
};

export default useGetUser;