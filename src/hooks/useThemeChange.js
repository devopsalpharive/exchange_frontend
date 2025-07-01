import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import isEmpty from "is-empty";

export default function useThemeChange(theme, defaultvalue) {
  const { getUser } = useSelector((state) => state.user);
  const [value, setValue] = useState('dark');
  useEffect(() => {

    setValue(() => {
      let currentValue = defaultvalue;
      const token = localStorage.token;
      try {
        if (!isEmpty(getUser)) {
          // const decoded = jwtDecode(token);
          console.log(getUser, 'useThemeChange')
          currentValue = getUser?.userTheme
        } else if (localStorage.getItem("theme").toString()) {
          currentValue = localStorage.getItem("theme").toString()
        } else {
          currentValue = 'dark'
        }
        localStorage.setItem("theme", currentValue);
      } catch (err) {
        console.log("useThemeChange", err);
        currentValue = 'dark';
        localStorage.setItem("theme", currentValue);
      }
      return currentValue;
    })
  }, [getUser]);
  return [value, setValue];
}
