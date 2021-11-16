import React, { Component } from "react";
import { FacebookProvider, Group } from "react-facebook";

const Facebook = () => {
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <FacebookProvider appId="1507588212895406">
        <Group
          href="https://www.facebook.com/groups/252993012983691"
          width="300"
          showSocialContext={true}
          showMetaData={true}
          skin="light"
        />
      </FacebookProvider>
    </div>
  );
};

export default Facebook;
