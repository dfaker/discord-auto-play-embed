

setInterval(function(){ 
	var videoList = document.getElementsByTagName('video');
	var apcheckbox = document.getElementById('apVideocheck');
	var aploopcheckbox = document.getElementById('apLoopcheck');
	if(!apcheckbox){
		var apdiv = document.createElement('div');
		apdiv.style.zIndex = '999';
		apdiv.style.color = 'white';
		apdiv.style.float = 'left';
		apdiv.style.position = 'absolute';
		apdiv.style.opacity = '0.4';
		apdiv.style.left = '308px';
		apdiv.style.top = '19px';
		apdiv.style.fontSize = '13px';
		apdiv.innerHTML =  '<input id="apVideocheck" name="apVideocheck" type="checkbox">';
		apdiv.innerHTML += '<label for="apVideocheck">AutoPlay New Video</label>';
		apdiv.innerHTML += '<input id="apLoopcheck" ame="apLoopcheck" type="checkbox">'
		apdiv.innerHTML += '<label for="apLoopcheck">Loop Videos</label>';
		document.body.appendChild(apdiv);
	}

	var last;
	for (var vi = 0; vi < videoList.length; vi++) {
		last=videoList[vi];
		if(last.parentElement && last.parentElement.childElementCount==4){
			if(aploopcheckbox && aploopcheckbox.checked && !last.loop){
				last.loop=true;
			}else if(aploopcheckbox && !aploopcheckbox.checked && last.loop==true){
				last.loop=false;
			}
		}
	}
	if(apcheckbox && apcheckbox.checked && last && !last.className.includes('autoPlayed') && last.parentElement && last.parentElement.childElementCount==4){
		last.classList.add("autoPlayed");
		last.click();
	}
	if(apcheckbox && apcheckbox.checked && last && !last.className.includes('autoPlayed') && last.parentElement && last.parentElement.childElementCount!=4){
		last.classList.add("autoPlayed");
		last.play();
	}
 }, 100);
