if (typeof window === 'undefined') {
  global.window = {};
}
if (typeof self === 'undefined') {
  global.self = {};
}

const fs = require('fs'); // node中的这个fs，主要是用来做一个文件读取
const path = require('path');
const express = require('express');
const {
  renderToString,
} = require('react-dom/server');
const SSR = require('../dist/search_server');

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8'); // 不设置'utf-8'，读取出来的是一个二进制的buffer数据
const data = require('./data.json');

// 设置server监听的端口
server(process.env.PORT || 3000);

function renderMarkup(html) {
  const dataStr = JSON.stringify(data);
  // 占位符的方式
  return template.replace('<!--HTML_PLACEHOLDER-->', html)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data = ${dataStr}</script>`);
}

function server(port) {
  const app = express();

  app.use(express.static('dist'));
  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    console.log('Server response template', renderToString(SSR));
    res.status(200).send(html);
  });

  // 监听端口
  app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
}

