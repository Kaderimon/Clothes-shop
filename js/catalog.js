
(function(){

	document.body.onload = function(){
		//Load basket from basketUpdate.js
		updateCartInfo();
		//Filter clicks
		filterSetClick();
		//Load items from JSON
		loadCatalog();

		//Banner press activation
		bannerClick();
 	}
 	function filterSetClick(){
 		let temp = document.querySelectorAll(".filter-cont>ul .filter-pos .current~li");
 	    for (let i = 0; i < temp.length; i++) {
      		temp[i].addEventListener("click", onFilterElementClick);
      	};

 	}
 	function onFilterElementClick(){
 		this.style.color="#a85500";
 		this.parentNode.childNodes[1].innerHTML += "<p>"+this.innerHTML+"</p>";
 		this.parentNode.childNodes[1].style.background = "#d6d6d6";
 		let a = document.getElementsByClassName('filter')[0].style.height = document.querySelectorAll(".filter-cont>ul .filter-pos .current p").length+1*5+65+"px";
 		let b = document.querySelectorAll(".filter-cont>ul .filter-pos .current p");
 		for (var i = b.length - 1; i >= 0; i--) {
 			b[i].style.color = "#a85500";
 		};
 		let clickedLi = this.getBoundingClientRect().left;
 		let firstLi = this.parentNode.childNodes[3].getBoundingClientRect().left;
 		let calculation = -(clickedLi-firstLi)+"px";
 		this.parentNode.childNodes[3].style.marginLeft = calculation;
 	}
 	function itemClick(){
      	let temp=document.getElementsByClassName('bg-item');
      	for (let i = 0; i < temp.length; i++) {
      		if (i % 2 === 0) {
      			temp[i].addEventListener("click", onEvenItemClick);
      		}else{
      			temp[i].addEventListener("click", onOddItemClick);
      		}
      	};
	}
	function onOddItemClick(){
		window.location.href='details2.html';
	}
	function onEvenItemClick(){
		window.location.href='details.html';
	}
	Object.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

	function loadCatalog() {
		loadJSON(function(response) {
	    var actual_JSON = JSON.parse(response);
	    fillPage(actual_JSON);
	 });
	 return true;
	}
	function loadJSON(callback) {   
	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json; charset=utf-8");
	    xobj.open('GET', 'js/catalog.json', false); 
	    xobj.onreadystatechange = function () {
	          if (xobj.readyState == 4 && xobj.status == "200") {
	            callback(xobj.responseText);
	          }
	    };
	    xobj.send();  
	//https://api.myjson.com/bins/93o2d
	}
	function fillPage(data) {
		let parentNode = document.getElementsByClassName('flex-container')[0];
		let size = Object.size(data);
		let order = 2;
		for (let i = 1; i <= size; i++) {
			addItem(data[i], parentNode,i);
			if (i == 4) {
				addText(parentNode);
			};
			if (i/order == 4){
				addSpace(parentNode);
				order++;
			};
		}
		itemClick();
	}
	function addText(parentNode){
		let firstP = document.createElement('p');
		firstP.className = "arrival-first-p";
		firstP.innerHTML = "Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags";

		let secondP = document.createElement('p');
		secondP.className = "arrival-second-p";
		secondP.innerHTML = "This offer is valid in-store and online. Prices displayed reflect this additional discount. This offer ends at 11:59 GMT on March 1st 2015";

		let itemDiv = document.createElement('div');
		itemDiv.className = "arrival-flex-item-fullwidth";
		itemDiv.appendChild(firstP);
		itemDiv.appendChild(secondP);

		parentNode.appendChild(itemDiv);
	}
		function addSpace(parentNode){
		let itemDiv = document.createElement('div');
		itemDiv.className = "arrival-flex-item-fullwidth";

		parentNode.appendChild(itemDiv);
	}
	function addItem(data, parentNode,i){
		let itemDiv = document.createElement('div');
		itemDiv.className = "arrival-flex-item";

		let hoverP = document.createElement('p');
		hoverP.className = "hover-text-show";
		hoverP.innerHTML = "View item";

		let bgItem = document.createElement('div');
		bgItem.className = "bg-item "+"bg-item"+i;
		bgItem.appendChild(hoverP);
		bgItem.style.background = "url("+data.path+") no-repeat center";
		bgItem.style.backgroundSize = "cover";

		itemDiv.appendChild(bgItem);

		let nameP = document.createElement('p');
		nameP.className = "font-rob";
		nameP.innerHTML = data.name;

		itemDiv.appendChild(nameP);

		let costP = document.createElement('p');
		costP.innerHTML = data.cost;
		itemDiv.appendChild(costP);

		parentNode.appendChild(itemDiv);
	}
})();