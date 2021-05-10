import React from 'react';
import ReactDOM from 'react-dom';
import largeNumber from 'large-number-hhh';
import { a } from './tree-shaking';
import pic from './images/pic.jpeg';
import piano from './images/piano.png';
import './index.less';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import('./text.js').then((Text) => { // 动态引入的方式，引入以后返回的是一个promise对象，需要在then时处理这个内容
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const funcA = a();
    const { Text } = this.state;
    const addResult = largeNumber('999', '1');
    return <div className="search-text">
           {funcA} Search Text,我是什么样的字体，我改变了吗，嗯嗯，立即改变吗
            哈哈哈，嗯嗯
            { addResult }
            {
                Text ? <Text /> : null
            }
            <img src={pic} onClick={this.loadComponent.bind(this)} width="200"/>
            <img src={piano}/>
            </div>;
  }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root'),
);
