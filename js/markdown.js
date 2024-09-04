"use strict"

document.addEventListener("DOMContentLoaded", function(){
	var url = location.origin + "/"
	var path = location.pathname.replace(/\.html$/,"")
	if (/\/$/.test(path)) path += "index"
	var mdFile = "/pages" + path + ".md"
	fetch(mdFile).then(response=>response.text()).then(text=>{
		var m
		if (m = /^# ([^\r\n]*)/.exec(text)){
			document.querySelector('title').innerText = m[1] + " | socvr.org"
		}
		document.getElementById('content').innerHTML = window.markdownit({html:true}).render(text).replace(/\$URL\$/,url)
	})
})
