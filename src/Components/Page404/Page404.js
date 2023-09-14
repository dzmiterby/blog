import React from 'react';

import classes from './Page404.module.scss';
import img404 from './img404.jpeg';

function Page404() {
  return (
    <div className={classes.Page404}>
      <div className={classes['page404__container']}>
        <img src={img404} alt="404" />
      </div>
    </div>
  );
}

export default Page404;
