import React from "react";
import notFoundStyles from "./not-found.module.css";

// Страница не найдена
export const PageNotFound = (): React.JSX.Element => { 

  return (
    <>
      <h1 className={notFoundStyles.header}>404</h1>

      <div className={notFoundStyles.frame}>

      </div>
      <div className={notFoundStyles.caps}><img src="http://ademilter.com/caps.png" alt="" /></div>
    </>
  )
}

export default PageNotFound;