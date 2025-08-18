import React, { memo } from "react";

const Summary = ({ total }) => {
  return <h4>Total Price: ${total}</h4>;
};

export default memo(Summary);
