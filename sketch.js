// this p5 sketch is written in instance mode
// read more here: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

function sketch(parent) { // we pass the sketch data from the parent
  return function( p ) { // p could be any variable name

    // p5 sketch goes here

    let Ein = parent.data.ein;
    let Eout = 0;
    let temp = 0;
    let sigma = 5.67 * Math.pow(10, -8);
    let dt = 1/60;
    let img;
    let eMin = 0;
    let eMax = 500;
    let tMin = 0;
    let tMax = 750;
    let speed = 0.25;

    p.preload = function() {
      img = p.loadImage('background.jpg');
    }

    p.setup = function() {
      let myCanvas = p.createCanvas(500, 500);
      myCanvas.parent("p5");

      p.textSize(20);
      p.strokeWeight(2);
      p.textFont('Helvetica');
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER, p.CENTER);
    }

    p.draw = function() {
      p.background('white');

      p.image(img, 0, 0, 500, 500);

      p.stroke('black');
      p.fill(243, 211, 40);
      p.rect(60, p.height - 90, 70, -p.map(Ein, eMin, eMax, 0, 400));
      p.noStroke();
      p.text(p.round(Ein) + ' W/m²', 60+30, p.height - 17);

      p.stroke('black');
      p.fill(236, 92, 87);
      p.rect(200, p.height - 90, 70, -p.map(Eout, eMin, eMax, 0, 400));
      p.noStroke();
      p.text(p.round(Eout) + ' W/m²', 200+30, p.height - 17);

      p.fill(200,37,6);
      p.rect(377, p.height - 150, 27, -p.map(temp, tMin, tMax, 0, 400));
      p.rect(377, p.height - 150, 27, 20);

      p.fill('white');
      p.text(p.round(temp) + ' K (' + p.round(temp-273.15) + ' C)',
           377 + 20, p.height - 17);

      Eout = sigma * p.pow(temp,4);
      temp += dt * (Ein - Eout) * speed;
    }
    // this is a new function we've added to p5
    // it runs only if the data changes
    p.dataChanged = function(val) {
      // console.log('data changed');
      // console.log('x: ', val.x, 'y: ', val.y);
      Ein = val.ein;
    };

  };
}