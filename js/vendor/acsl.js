	    console.log("hi");
      const button = document.querySelector('#contest1');
	  const button2 = document.querySelector('#contest2');
      const iframe = document.querySelector('#slide1');
	  const iframe2 = document.querySelector('#slide2');
	  button.addEventListener('click', () => {
		iframe.width = "300";
		iframe.height = "300";
		iframe2.width = "0";
		iframe2.height = "0";
	  });
	  button2.addEventListener('click', () => {
		iframe.width = "0";
		iframe.height = "0";
		iframe2.width = "300";
		iframe2.height = "300";
	  });
