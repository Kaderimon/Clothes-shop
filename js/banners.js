	function bannerClick(){
      	let temp=document.getElementsByClassName('banners')[0].childNodes;
      	for (let i = 0; i < temp.length; i++) {
      		temp[i].addEventListener("click", onBannerClick);
      	};
	}
	function onBannerClick(){
		if (this.className==='banner-right-tablet right' || this.className==='banner-right right') {
			window.location.href='catalog.html';
		};
		if (this.className==='banner-left left') {
			window.location.href='details.html';
		};
	}