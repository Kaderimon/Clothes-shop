(function(){

	document.body.onload = function(){
		//fill page
		loadItems();
		// Show bag info
		updateCartInfo();
		//remove button activation
		removeButton();
		//set total cost
		setTotal();
		//Banner press activation
		bannerClick();
		document.getElementsByClassName("btn-buy")[0].onclick = onCartChange;
		document.getElementsByClassName("btn-empty")[0].onclick = onCartChange;

 	}

 	function removeButton(){
      	let temp=document.getElementsByClassName('item-remove');
      	for (let i = 0; i < temp.length; i++) {
      			temp[i].addEventListener("click", removeClicked);
      	};
	}

	function removeClicked(){
		if (localStorage !== undefined) {
			let bagWrap = document.getElementsByClassName("bag-wrap")[0];
			let cartData = JSON.parse(localStorage.getItem('cart'));
			if (cartData) {
				var items = Object.keys(cartData);
				for(let i=0; i<items.length;i++){
					if (items[i] === this.className.split(" ")[0]) {
						if (cartData[items[i]][5]===1) {
							delete cartData[items[i]];
						}else{
							cartData[items[i]][5] -= 1;
						}
					};
				}
			}
			if(!setDataToLS(cartData)){ // Обновляем данные в LocalStorage
				bagWrap.innerHTML="";
				updateCartInfo();
				setTotal();
				loadItems();
				removeButton();		
			}
		} else {
		    alert("Sorry, your browser does not support Web Storage...");
		}
	}

 	//Считываем из LocalStorage
	function getDataFromLS(){
	  return JSON.parse(localStorage.getItem('cart'));
	}
	// Записываем данные в LocalStorage
	function setDataToLS(o){
	  localStorage.setItem('cart', JSON.stringify(o));
	  return false;
	}

	//Нажатие на BuyNow or Empty Bag
	function onCartChange() {
		localStorage.clear("cart");
		updateCartInfo();
		setTotal();
		if (this.className === "btn-buy") {
			fillPageOnBuy();			
		}else{
			fillPageOnEmpty();
		}
	}
	//Нажатие на BuyNow
	function fillPageOnBuy(){
		let bagWrap = document.getElementsByClassName('bag-wrap')[0];	
		bagWrap.innerHTML = '<p>Thank you for your purchase</p>';
	}
	//Нажатие на Empty Bag
	function fillPageOnEmpty(){
		let bagWrap = document.getElementsByClassName('bag-wrap')[0];	
		bagWrap.innerHTML = '<p>Your shopping bag is empty. Use Catalog to add new items</p>';
	}
	//Выводит общую сумму на странице
	function setTotal(){
		if (localStorage !== undefined) {
			let count = 0;
			let totalPrice = 0;
			let cartData = JSON.parse(localStorage.getItem('cart'));
			let bagItem = document.getElementsByClassName("price")[0];
			if (cartData) {
				var items = Object.keys(cartData);
				for(let i=0; i<items.length;i++){
					count += cartData[items[i]][5];
					totalPrice += cartData[items[i]][5]*cartData[items[i]][1];						
				}
			}
			bagItem.innerHTML="£"+totalPrice.toFixed(2);			
		} else {
		    alert("Sorry, your browser does not support Web Storage...");
		}
	}
	//Загрузка из корзины
	function loadItems() {
		let cart = getDataFromLS();
		if(cart){
			var items = Object.keys(cart);
			for(let i=0; i<items.length;i++){
				fillPageFromCart(cart,items[i]);		
			}
		}
	}
	//Отображение данных из корзины
	function fillPageFromCart(cart,item){
		let data = cart[item];
		let bagWrap = document.getElementsByClassName('bag-wrap')[0];	
		let closeDivTag = "</div>";
		bagWrap.innerHTML += '<div class="bag-flex-item clearfix">'+
			'<div class="innerItemLeft left">'+
				'<div class="item-img '+item+'"><p class="hover-text-show">View item</p>'+closeDivTag+
				'<p class="item-cost">£'+data[1]+'</p>'
			+closeDivTag+
			'<div class="innerItemRight left">'+
				'<p class="item-name">'+data[0]+'</p>'+
				'<p class="item-color">Color: '+data[3]+'</p>'+
				'<p class="item-size">Size: '+data[2]+'</p>'+
				'<p class="item-quantity">Quantity: '+data[5]+'</p>'+
				'<button class="'+item+' item-remove">Remove item</button>'+closeDivTag+closeDivTag;
		let itemImg = document.getElementsByClassName("item-img "+item)[0];
		itemImg.style.background = data[4];
		itemImg.style.backgroundPosition = "center";
		itemImg.style.backgroundRepeat = "no-repeat";
	}
})();