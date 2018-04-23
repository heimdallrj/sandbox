import _ from 'lodash';

import printMe from './print.js';

import sampleImg from "./img/sample.png";
import './styles.css';

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button');

	// Lodash, now imported by this script
	element.innerHTML = _.join(['Hello!', 'webpack'], ' ');
	element.classList.add('hello');

	// Add the image to our existing div.
	var myImg = new Image();
	myImg.src = sampleImg;

	element.appendChild(myImg);

	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;

	element.appendChild(btn);

  	return element;
}

document.body.appendChild(component());
