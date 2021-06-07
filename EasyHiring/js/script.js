function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});;
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();;
document.addEventListener("mousemove", parallax);


function parallax(e) {

	this.querySelectorAll('.layer').forEach(layer => {
		var speed = layer.getAttribute('data-speed')



		var x = (window.innerWidth - e.pageX * speed) / 100;
		var y = (window.innerHeight - e.pageY * speed) / 100;
		// console.log(y);
		layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
	});
}



let listItems = document.querySelectorAll('.itemlist')
let listBlocks = document.querySelectorAll('.li-block')

for (let i = 0; i < listItems.length; i++) {
	listItems[i].addEventListener('click', function (e) {
		e.preventDefault();
		listBlocks.forEach(element => {
			element.classList.remove('open')
		});
		listBlocks[i].classList.add('open')

	})
}
;

