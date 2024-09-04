"use strict"

document.addEventListener("DOMContentLoaded", function(){
	function menu(){
		var path = location.pathname
		path = path.replace(/[^\/]*$/g,"")
		while (path != ""){
			const nav = document.createElement("nav")
			fetch(location.origin+"/pages"+path+"_nav.csv").then(function(response){
				response.text().then(function(text){
					text.split(/\n/).forEach(function(line){
						var m = line.match('^([^,#]+),([a-z0-9.\/\-]+)$')
						if (m){
							var href = m[2]
							var link = document.createElement("a")
							link.classList.add("nav-item>")
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
	}
	menu()
})
