import React from 'react';

const Involved = (props) => (
  <li>
    {props.inv.user.name_full} ({props.inv.role || "Involved"})
  </li>
)

export default Involved;
