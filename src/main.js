import './styles/index.css'
import './styles/index.less'

console.log('11111111')
// 测试图片输出结果
let uri = require('./assets/testImg.png');
let img = document.querySelector('img');
img.src = uri;
