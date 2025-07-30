import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ props }) => {
  return (
    <Helmet>
      <title>{`Dashboard`}</title>
    </Helmet>
  );
};

export default MetaData;
