import React, { Component } from 'react';
import { FacebookProvider, Group } from 'react-facebook';
 
export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="1507588212895406">
        <Group
          href="https://www.facebook.com/groups/252993012983691"
          width="300"
          showSocialContext={true}
          showMetaData={true}
          skin="light"
        />
      </FacebookProvider>    
    );
  }
}