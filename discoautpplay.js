

function isScrolledIntoView(el) {
	var rect = el.getBoundingClientRect();
	var elemTop = rect.top;
	var elemBottom = rect.bottom;
	var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
	return isVisible;
}

setInterval(function(){ 
	var playableMediasTemp = document.querySelectorAll('video,img');
	var playableMedias     = [];
	for (var vi = 0; vi < playableMediasTemp.length; vi++) {
		var media = playableMediasTemp[vi];
		if(media.className.includes('embedVideo') || media.className.includes('video')){
			playableMedias.push(media);
		}
		if(media.tagName =='IMG' && media.className=='' && media.parentElement.className && media.parentElement.className.includes('imageWrapper')){
			playableMedias.push(media);
		}
	}

	var apVischeckbox = document.getElementById('apVisVideocheck');
	var aploopcheckbox = document.getElementById('apLoopcheck');
	if(!apVischeckbox){
		var apdiv = document.createElement('div');
		apdiv.style.zIndex = '999';
		apdiv.style.color = 'white';
		apdiv.style.float = 'left';
		apdiv.style.position = 'absolute';
		apdiv.style.opacity = '0.4';
		apdiv.style.left = '308px';
		apdiv.style.top = '19px';
		apdiv.style.fontSize = '13px';

		apdiv.innerHTML +=  '<input id="apVisVideocheck" name="apVisVideocheck" type="checkbox">';
		apdiv.innerHTML += '<label for="apVisVideocheck">AutoPlay All Visible</label>';

		apdiv.innerHTML += '<input id="apLoopcheck" ame="apLoopcheck" type="checkbox">'
		apdiv.innerHTML += '<label for="apLoopcheck">Loop Videos</label>';
		document.body.appendChild(apdiv);
	}


	var last;
	for (var vi = 0; vi < playableMedias.length; vi++) {
		last=playableMedias[vi];
		if( isScrolledIntoView(last)){
			if(apVischeckbox && apVischeckbox.checked){
				if(last.className.includes('video')){

					if(!last.className.includes('autoPlayed') && last.paused){
						last.classList.add("autoPlayed");
						last.click();
					}else if(last.paused){
						last.play();
					}
					if(aploopcheckbox && aploopcheckbox.checked){
						last.loop=true;
					}else{
						last.loop=false;
					}

				}else if(last.className.includes('embedVideo')){

					if(!last.className.includes('autoPlayed') && last.paused){
						last.classList.add("autoPlayed");
						last.play();
					}else if(last.paused){
						last.play();
					}

					if(last.previousSibling && last.previousSibling.className.includes('imageAccessory')){
						last.previousSibling.style.display='None';
					}

					if(aploopcheckbox && aploopcheckbox.checked){
						last.loop=true;
					}else{
						last.loop=false;
					}

				}else if(last.tagName =='IMG'){

					if(!last.getAttribute('origsrc') && last.getAttribute('src')){
						last.setAttribute('origsrc',last.getAttribute('src'));	
					}
					if(last.getAttribute('origsrc')){
						var newSrc = last.getAttribute('origsrc').split('?')[0];
						if(last.getAttribute('src') != newSrc){
							last.setAttribute('src',newSrc);	
							if(last.previousSibling && last.previousSibling.className.includes('imageAccessory')){
								last.previousSibling.style.display='None';
							}
							
						}
					}

					
				}
			}
		}else{
			if(last.className.includes('video') || last.className.includes('embedVideo')){
				if(!last.paused && last.pause){
					last.pause()
				}

			}else if(last.tagName =='IMG'){
				if(last.getAttribute('origsrc')){
					last.setAttribute('src',last.getAttribute('origsrc'));
				}
			}
		}

	}

},100);
