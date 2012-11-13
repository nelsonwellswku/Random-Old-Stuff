<html>
  <head>
    <script type="text/javascript" src="Particle.js"></script>
    <script type="text/javascript" src="Burst.js"></script>
    <script type="text/javascript">
      window.onload = function() {
        //global canvas context
        var ctx = document.getElementById("cv").getContext("2d");

        var burst = new Burst({
          x: 400,
          y: 200
        });

        burst.run(ctx);

      };
    </script>
  </head>
  <body>
    <canvas id="cv" width="800" height="600">

    </canvas>  
  </body>
</html>
