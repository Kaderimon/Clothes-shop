(function(){

	document.body.onload = function(){
		setClickEvent();
		updateCartInfo();
		//Banner press activation
		bannerClick();
		document.getElementsByClassName("add-item")[0].onclick = itemSubmition;
 	}

	function getDataFromLS(){
	  return JSON.parse(localStorage.getItem('cart'));
	}
	// Записываем данные в LocalStorage
	function setDataToLS(o){
	  localStorage.setItem('cart', JSON.stringify(o));
	  return false;
	}
	function arraysEqual(a, b) {
	  if (a === b) return true;
	  if (a == null || b == null) return false;
	  if (a.length != b.length) return false;
	  for (var i = 0; i < a.length-1; ++i) {
	    if (a[i] !== b[i]) return false;
	  }
	  return true;
	}
	function itemSubmition() {
		let itemName = document.getElementsByClassName("item-name")[0].innerHTML;
		let itemCost = document.getElementsByClassName("item-cost")[0].innerHTML;
		let itemBg = getComputedStyle(document.getElementsByClassName("details-left__main-photo")[0]).backgroundImage;
		itemCost = itemCost.split('');
		itemCost.shift();
		itemCost = itemCost.join('')-0;
	    let size = document.getElementsByName("size");
		for(let i=0;i<size.length;i++){
			if(size[i].checked){
				size=size[i].value;
			}
		}
		let color = document.getElementsByName("color");
		for(let i=0;i<color.length;i++){
			if(color[i].checked){
				color=color[i].value;
			}
		}
		let toLS = [itemName, itemCost,size,color,itemBg,1];
		this.style.opacity = "0.1"; // блокируем кнопку на время операции с корзиной
		let cartData = getDataFromLS();
		let somethingDone = false;
		if (cartData) {
			var items = Object.keys(cartData);
			for(let i=0; i<items.length;i++){	
				if (arraysEqual(toLS,cartData[items[i]])) {
					cartData[items[i]][5] += 1;
					somethingDone = true;
				}							
			}
		}else{
			cartData = {};
			cartData["itemID0"] = toLS;
			somethingDone = true;
		}
		if (!somethingDone) {
			cartData["itemID"+Object.keys(cartData).length] = toLS;
		};
		if(!setDataToLS(cartData)){ // Обновляем данные в LocalStorage
			let k = function(){arguments[0].style.opacity = "1"};
		    setTimeout(k, 500,this); // разблокируем кнопку после обновления LS
		}
		updateCartInfo();
		return false;
	}

})();