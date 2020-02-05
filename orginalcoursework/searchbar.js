 
  
 $(document).ready(function(){
	 
	 /*dropdownList*/
	 $( "#destination" ).selectmenu();
	 
	 /*Comfortable*/
	 $( "#slider" ).slider({
      value:3,
      min: 2,
      max: 5,
      step:0.5,
      slide: function( event, ui ) {
        $( "#comfortLevel" ).val(ui.value );
      }
    });
    $( "#comfortLevel" ).val( $( "#slider" ).slider( "value" ) );
	 
	 
	 /*Activites*/
	 //$( "input" ).checkboxradio();
	 
	 /*pricerange*/
    $( "#slider-range" ).slider({
      range: true,
      min: 1000,
      max: 2500,
      values: [ 1500, 2000 ],
      slide: function( event, ui ) {
        $( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#price" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	 
    /*Start date*/	 
	$( function() {
    var dateFormat = "mm/dd/yy",
      startDate= $( "#startDate" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          endDate.datepicker( "option", "minDate", getDate( this ) );
        }),
      endDate = $( "#endDate" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        startDate.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } );

    /*Button*/	
	$( ".widget input[type=submit]" ).button();
    $( "button" ).click( function( event ) {
      event.preventDefault();
    } );
	
	
	 
});  