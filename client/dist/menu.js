$(function() {
        $('#menu').on( "click", function(event) {
            event.preventDefault();
            $('.leftMenu').css('left', function(){ return $(this).offset().left; })
             .animate({"left":"0px"}, "fast" ,function(){
                 $('#close').css('display','block');
             });  
           
        });
        $('#close').on( "click", function(event) {
            event.preventDefault();
            $('.leftMenu').css('left', function(){ return $(this).offset().left; })
             .animate({"left":"-20%"}, "fast",function(){
                $('#close').css('display','none');
             });    
        });
     });