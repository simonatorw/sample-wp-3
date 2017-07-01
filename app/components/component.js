import './component.css';

export default function() {
	const element = document.createElement('div');
	element.innerHTML = 'hello <span class="redText">simon</span>';
	//console.log(element);

	return element;
}