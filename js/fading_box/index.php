<html>
  <head>
    <script type="text/javascript">
      window.onload = function() {
        var my_box = document.getElementById("box");
        var red = 0;
        var green = 0;
        var blue = 0;
        var inc = 2;
   
        var fade = function() {
          red += inc;
          green += inc;
          blue += inc;
 
          var bg_str = "rgb(" + red + "," + green + "," + blue + ")";

          my_box.style.background = bg_str; 
          if(red > 255 || red < 0) {
            inc = -inc;
          }

          
          setTimeout(fade, 5);
        };

        fade();
      };
    </script>
  </head>
  <body>
    <div id="box" style="width:100px; height:100px; background-color: black;">
    
    </div>
  </body>
</html>
