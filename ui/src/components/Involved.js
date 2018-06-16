import React from 'react';

const Involved = (props) => (
  <li>
    {props.inv.user.username} ({props.inv.role || "Involved"})
  </li>
)

export default Involved;
