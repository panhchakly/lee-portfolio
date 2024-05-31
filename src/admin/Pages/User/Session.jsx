import React from 'react';
import Cookies from 'js-cookie';

function Session() {
    const token = Cookies.get('token');
    console.log(token);

  return (
    <div>Session</div>
  )
}

export default Session