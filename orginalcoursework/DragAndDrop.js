$( function() {
 
    // There's the resorts and the favorite
    var $resorts = $( "#resorts" ),
      $favorite = $( "#favorite" );
 
    // Let the resorts items be draggable
    $( "li", $resorts ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
 
    // Let the favorite be droppable, accepting the resorts items
    $favorite.droppable({
      accept: "#resorts > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        deleteResort( ui.draggable );
      }
    });
 
    // Let the resorts be droppable as well, accepting items from the favorite
    $resorts.droppable({
      accept: "#favorite li",
      classes: {
        "ui-droppable-active": "custom-state-active"
      },
      drop: function( event, ui ) {
        recycleImage( ui.draggable );
      }
    });
 
    // Resort favorite function
    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this Resort' class='ui-icon ui-icon-refresh'>Recycle Resort</a>";
    function deleteResort( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $favorite ).length ?
          $( "ul", $favorite ) :
          $( "<ul class='resorts ui-helper-reset'/>" ).appendTo( $favorite );
 
        $item.find( "a.ui-icon-heart" ).remove();
        $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "88px" })
            .find( "img" )
              .animate({ height: "36px" });
        });
      });
    }  
   
 
   
    // Resort recycle function
    var favorite_icon = "<a href='link/to/favorite/script/when/we/have/js/off' title='Delete this Resort' class='ui-icon ui-icon-heart'>Delete Resort</a>";
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "30%")
          .append( favorite_icon )
          .find( "img" )
            .css( "height", "150px" )
          .end()
          .appendTo( $resorts )
          .fadeIn();
      });
    }
 
    // Resort preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage( $link ) {
      var src = $link.attr( "href" ),
        title = $link.siblings( "img" ).attr( "alt" ),
        $modal = $( "img[src$='" + src + "']" );
 
      if ( $modal.length ) {
        $modal.dialog( "open" );
      } else {
        var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
          .attr( "src", src ).appendTo( "body" );
        setTimeout(function() {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1 );
      }
    }
 
    // Resolve the icons behavior with event delegation
    $( "ul.resorts > li" ).on( "click", function( event ) {
      var $item = $( this ),
        $target = $( event.target );
 
      if ( $target.is( "a.ui-icon-heart" ) ) {
        deleteResort( $item );
      } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
        viewLargerImage( $target );
      } else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
      }
 
      return false;
    });
  } );