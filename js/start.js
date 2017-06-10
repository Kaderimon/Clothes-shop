
(function(){

	document.body.onload = function(){
		//Load basket from basketUpdate.js
		updateCartInfo();
		//Slider init
		sliderActivation();
		sliderClick();

		//Banner press activation
		bannerClick();
 	}

	function sliderActivation(){
		let getArray = document.querySelectorAll('.sliderbox .slider');
		let getItemArray = document.querySelectorAll('#slidernav .item');
		let index = 0;
		for(let i = 0;i<getItemArray.length;i++){
		  getItemArray[i].addEventListener("click", onClickTd);
		}
		let slideInterval = setInterval(nextShow,5000);

		function nextShow(){
			// clear current show
			getArray[index].className = 'slider';
			getItemArray[index].className = 'item';
			if(getArray[index+1]){
				index = index+1;
			}else{
				index = 0;
			}

			//show new
		  	getArray[index].className = 'slider showNow s'+index;
		  	getItemArray[index].className = 'item itemSelect';
		}		
	}
	function onClickTd(){
	let getArraySlider = document.querySelectorAll('.sliderbox .slider');
	let temp = document.querySelectorAll('#slidernav .item');
	for(let i = 0;i<temp.length;i++){

			if(temp[i] == this){
				this.className = "item itemSelect";
				getArraySlider[i].className = 'slider showNow';
			}else{
				temp[i].className = "item";
				getArraySlider[i].className = 'slider';
			}
		}
	}
	function sliderClick(){
      	let temp=document.getElementsByClassName('sliderbox')[0].childNodes;
      	for (let i = 0; i < temp.length; i++) {
      		temp[i].addEventListener("click", onSliderClick);
      	};
	}
	function onSliderClick(){

		if (this.className==='slider showNow s0') {
			window.location.href='catalog.html';
		};
		if (this.className==='slider showNow s1') {
			window.location.href='details.html';
		};
	}
})();