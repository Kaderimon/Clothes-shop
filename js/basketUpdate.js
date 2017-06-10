	function updateCartInfo(){
		if (localStorage !== undefined) {
			let count = 0;
			let totalPrice = 0;
			var cartData = JSON.parse(localStorage.getItem('cart'));
			let bagItem = document.getElementsByClassName("bag-info")[0];
			
			if (cartData) {
				var items = Object.keys(cartData);
				for(let i=0; i<items.length;i++){
					//console.log(cartData[items[i]]);
					count += cartData[items[i]][5];
					totalPrice += cartData[items[i]][5]*cartData[items[i]][1];						
				}
			}
			bagItem.innerHTML="Bag &#163;"+totalPrice.toFixed(2)+" ("+count+")";			
		} else {
		    alert("Sorry, your browser does not support Web Storage...");
		}

	}
