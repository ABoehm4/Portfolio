"use strict";

window.onload = function() {
	var display = document.getElementById("test");
	var file = new XMLHttpRequest();
	
	file.open("GET", "javascriptTest.txt", false);
	file.onreadystatechange = function ()
	{
		if (file.readyState === 4) 
		{
			if (file.status === 200 || file.status === 0)
			{
				var text = file.responseText;
				display.innerText = text;
			}			
		}		
	}
	file.send(null);
}