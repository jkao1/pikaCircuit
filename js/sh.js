/*

ideas:
- on completing the mission, background changes traffic-light green
- zooming in tutorial (zoom functions located in extra.js)

in progress:
- zoom in and slice (zoom.js)
    - (finished) zoom in the canvas 
    - zoom in on a specific point
    - issue: square root
    - (working) slash rotation

var names:
ob = wires
retr = transistor
led = lightblub
batt = battery

*/

var ob, retr, led, char;
var img;

function start() { // initiates game
    wire01 = new component(150, 20, "#D7912F", 150, 400); 
    wire02 = new component(20, 180, "#D7912F", 240, 465); 
    wire03 = new component(20, 480, "#D7912F", 600, 455); 
    wire04 = new component(150, 20, "#D7912F", 800, 382); 
    retr = new component(40, 80, "#B7641F", 350, 465);
    led = new component(60, 80, "#DE401E", 800, 280);
    batt = new component(90, 100, "#006C4C", 150, 280);
    char = new component(15, 15, "#fa8940", 250, 265);
    // img = new component(30, 30, "../img/resistor.png",100, 100, 'img');
    area.start();
}

var area = { // setting up canvas and its properties
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 560;
        this.canvas.id = 'canvas';
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateArea, 20); 
        // keyboard stuff
        window.addEventListener('keydown', function (e) {
            area.keys = (area.keys || []);
            area.keys[e.keyCode] = (e.type == 'keydown');
        })
        window.addEventListener('keyup', function (e) {
            area.keys[e.keyCode] = (e.type == 'keydown');
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    },
    stop : function() {
        clearInterval(this.interval);
    },
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "img") {
        this.image = new Image();
        this.image.src = color;
    } 
    this.width = width;
    this.height = height;
    this.x = x; 
    this.y = y; 
    this.angle = Math.PI/2; 
    this.speed = 0; 
    this.angleInc = 0; 
    this.update = function() {
        ctx = area.context;
        if (type == "img") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.save(); 
            // canvas receives char properties (loc, deg, color)
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            // canvas spawns a duplicate char to its own properties
            ctx.restore();
            // positioning
            this.angle += this.angleInc * Math.PI / 180;
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);   
        }
    }  
    this.crash_vert = function(otherobj) {
        var myleft = this.x - (this.height / 2);
        var myright = this.x + (this.height / 2);
        var mytop = this.y - (this.width / 2);
        var mybottom = this.y + (this.width / 2);
        
        var otherleft = otherobj.x - (otherobj.width / 2);
        var otherright = otherobj.x + (otherobj.width / 2);
        var othertop = otherobj.y - (otherobj.height / 2);
        var otherbottom = otherobj.y + (otherobj.height / 2);
        
        var a,b,c,d;
        a = mytop > otherbottom;
        b = myleft > otherright;
        c = myright < otherleft;
        d = mybottom < othertop;
        var crash = true;
        if (a||b||c||d) {
            crash = false;
        } 
        return crash;
    }
    this.crash_horz = function(otherobj) {
        var myleft = this.x - (this.height / 2);
        var myright = this.x + (this.height / 2);
        var mytop = this.y - (this.width / 2);
        var mybottom = this.y + (this.width / 2);
        
        var otherleft = otherobj.x - (otherobj.height / 2);
        var otherright = otherobj.x + (otherobj.height / 2);
        var othertop = otherobj.y - (otherobj.width / 2);
        var otherbottom = otherobj.y + (otherobj.width / 2);
        
        var a,b,c,d;
        a = mytop > otherbottom;
        b = myleft > otherright;
        c = myright < otherleft;
        d = mybottom < othertop;
        var crash = true;
        if (a||b||c||d) {
            crash = false;
        } 
        return crash;
    }
    this.follow = function(obj) {
        this.x = obj.x + 7;
        this.y = obj.y + 7;
        // this.angle = obj.angle;
        // this.angleInc = obj.angleInc;
        this.speed = obj.speed;
    }
    this.distance = function(obj) {
        var diffX = this.x - obj.x;
        var diffY = this.y - obj.y
        return (this.x - obj.x) + (this.y - obj.y);
    }
}

var inc = 0; // angleInc's increment
var angleSpeed = 0;

var elements = ['wire01','wire02','wire03','retr']

var wire01ATT = true;
var wire02ATT = true;
var wire03ATT = true;
var wire04ATT = true;
var retrATT = true;
var ledATT = true;
var battATT = true;

function turn() {
    char.angleInc = 0;
    char.speed = 0;
    if (area.keys && area.keys[37]) {char.angleInc = -5; }
    if (area.keys && area.keys[39]) {char.angleInc = 5; }
    if (area.keys && area.keys[38]) {char.speed= 4; }
    if (area.keys && area.keys[40]) {char.speed= -4; }
}

function elem_crash(objA,ornt) {
    // all replaced is marked with 'mark'
    var template = 'if (char.crash_' + ornt + `(mark)) { 
        if (markATT) {mark.follow(char)} 
        if (area.keys && area.keys[83]) {markATT = false; mark.angleInc = 0;mark.speed = 0;} 
        else if (area.keys && area.keys[68]) {markATT = true} 
    }
    `
    var result = "";
    for (var x = 0; x < objA.length; x++) {
        result += template.replace(/mark/g, objA[x])
    }
    return result
}

function elem_update(objA) {
    var result = "";
    for (var x = 0; x < objA.length; x++) {
        result += objA[x] + '.update();';
    }
    return result
}

function updateArea() {
    area.clear();
    
    eval(elem_crash(['wire01','wire02','wire03','retr','wire04'],'horz'));    
    eval(elem_update(['wire01','wire02','wire03','wire04','retr','led','batt']));
    
    a = batt.crash_horz(wire01);
    b = wire01.crash_horz(wire02);
    c = wire02.crash_horz(retr); //;gug888g8
    d = retr.crash_horz(wire03);
    e = wire03.crash_horz(wire04);
    f = wire04.crash_horz(led);
    
    document.getElementById('track').innerHTML = a+','+b+','+c+','+d+','+e+','+f;
    if ( a&&b&&c&&d&&e&&f ) {
        success();
    }
    
    turn();
    char.update();
}

// so space doesn't scroll the page
window.onkeydown = function(e) {
    if (e.keyCode >= 0 && e.target == document.body) {
        e.preventDefault();
        return false;
    }
};

function success() {
    document.getElementById('canvas').style.backgroundColor = '#28920F';
}
function reset() {
    document.getElementById('canvas').style.backgroundColor = '#4da086';
}