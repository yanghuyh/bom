var img = document.querySelectorAll('.jo1-on li');
var pc = document.querySelector('.pc');
var ph = document.querySelector('.ph');
var num = 0;
var sum = setInterval(function () {
    for (var i = 0; i < img.length; i++) {
        img[i].style.color = "";
        img[i].style.background = "";
    }
    if (num == 1) {
        pc.style.display = 'block';
    } else {
        pc.style.display = 'none';
    }
    if (num == 0) {
        ph.style.display = 'block';
    } else {
        ph.style.display = 'none';
    }
    img[num].style.color = "#fff";
    img[num].style.background = "#00B262";
    num++;
    if (num == 2) {
        num = 0;
    }
}, 2000)
var div=document.querySelector('form');
var input = div.children[0];
var ul = div.children[2];

var flag = true;
input.addEventListener('compositionstart',function(){
			flag = false;
})
input.addEventListener('compositionend',function(){
			flag = true;
})
input.oninput = function(){
			setTimeout(function(){
				if(flag){
					var keyword = input.value;
					var script = document.createElement('script');
					var cbName = 'phone'+new Date().getTime()+Math.random().toString().slice(2);	
					script.src = "https://suggest.taobao.com/sug?code=utf-8&q="+keyword+"&_ksTS=1563970517892_385&callback="+cbName+"&k=1&area=c2c&bucketid=10";
					window[cbName] = function(data){
						var result = data.result;
						var str = "";
						result.forEach(function(value){
							str+="<li>"+value[0]+"</li>"
						})
						ul.innerHTML = str;
						script.remove()
					}
					document.body.appendChild(script);
				}
			},0)
}
input.onblur=function(){
            input.value="";
            ul.innerHTML="";
}