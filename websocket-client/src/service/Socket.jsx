import React from 'react';
import SockJsClient from 'react-stomp';

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage = (msg) => {
    this.clientRef.sendMessage('/app/hello', msg);
  }

  render() {
    return (
      <div>
        <SockJsClient url='http://localhost:8080/vd-endpoint' topics={['/topic/greetings']}
            onMessage={(msg) => { console.log(msg); }}
            ref={ (client) => { this.clientRef = client }} />
      </div>
    );
  }
}