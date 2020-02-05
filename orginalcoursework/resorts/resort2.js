$(document).ready(function(){
	 
	$( "#tabs" ).tabs();
	
	 $( "#accordion" ).accordion();
	
	 
});  

 $(document).ready(function(){
			     $('.thumb a').click(function(e){
				 e.preventDefault();
				     $('.imgBox img').attr("src",$(this).attr("href"));
		});
	});
					 
					 
					 
					 
					 