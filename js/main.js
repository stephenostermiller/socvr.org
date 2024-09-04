"use strict"

document.addEventListener("DOMContentLoaded", function(){	
	// Menu
	var path = location.pathname
	path = path.replace(/[^\/]*$/g,"")
	while (path != ""){
		const nav = document.createElement("nav")
		fetch(location.origin+"/pages"+path+"_nav.csv").then(response=>{
			response.text().then(text=>{
				text.split(/\n/).forEach(function(line){
					var m = line.match('^([^,#]+),([a-z0-9.\/\-]+)$')
					if (m){
						var href = m[2]
						var link = document.createElement("a")
						link.classList.add("nav-item")
						link.innerText = m[1]
						link.setAttribute('href',href)
						if (location.pathname.startsWith(href)) link.classList.add('selected')
						if (location.pathname == href) link.classList.add('current')
						nav.append(link)
					}
				})
			})				
		})
		document.getElementById("navigation").prepend(nav)
		path = path.replace(/[^\/]*\/$/g,"")
	}

	// Redirects
	var path = location.pathname
	path = path.replace(/[^\/]*$/g,"")
	while (path != ""){
		fetch(location.origin+"/pages"+path+"_redirect.csv").then(response=>{
			response.text().then(text=>{
				text.split(/\n/).forEach(function(line){
					var m = line.match('^([^,]+),([a-z0-9.#\/\-]+)$')
					if (m && location.pathname == m[1]) location.href=m[2]
				})
			})				
		})
		path = path.replace(/[^\/]*\/$/g,"")
	}

	// Client side markdown
	var url = location.origin + "/"
	var path = location.pathname.replace(/\.html$/,"")
	if (/\/$/.test(path)) path += "index"
	var mdFile = "/pages" + path + ".md"
	fetch(mdFile).then(response=>response.text()).then(text=>{
		var m
		if (/^</.test(text)){
			// Got back index.html
			text = "# 404 Not Found\n\nContent for this URL was not found on this server."
		}
		if (m = /^# ([^\r\n]*)/.exec(text)){
			document.querySelector('title').innerText = m[1] + " | socvr.org"
		}
		document.getElementById('content').innerHTML = window.markdownit({html:true}).render(text).replace(/\$URL\$/,url)
	})
})
