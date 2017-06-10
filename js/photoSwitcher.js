	function setClickEvent(){
		let temp=document.getElementsByClassName('details-left__thumbnail');
		for(let i = 0;i<temp.length;i++){
			temp[i].addEventListener("click", onClickTd);
		}
	}


	function onClickTd(){
		let mainPhoto = document.getElementsByClassName('details-left__main-photo')[0];
		let big = window.getComputedStyle(this).getPropertyValue("background-image");
		//console.log(big+" no-repeat");
		mainPhoto.style.background = big+" no-repeat";
		mainPhoto.style.backgroundSize = "cover";
		mainPhoto.style.transition= "3s linear";
		let temp=document.getElementsByClassName('details-left__thumbnail');
		if (checkIE()) {
			var setDefaultZ = "auto";			
		}else{
			var setDefaultZ = "initial";	
		}
		for (let i = 0; i < temp.length; i++) {
			temp[i].style.zIndex = setDefaultZ;
		}
		this.style.zIndex = "1";
	}

	function checkIE(){
		var ua = window.navigator.userAgent;
	    var msie = ua.indexOf('MSIE ');
	    if (msie > 0) {
	        // IE 10 or older => return version number
	        return true;
	    }
	    var trident = ua.indexOf('Trident/');
	    if (trident > 0) {
	        // IE 11 => return version number
	        return true;
	    }
	    var edge = ua.indexOf('Edge/');
	    if (edge > 0) {
	       // Edge (IE 12+) => return version number
	       return true;
	    }

	    // other browser
	    return false;
	}