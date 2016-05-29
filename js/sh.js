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
lemd06 = lightblub
batt = battery

*/

function start() { // initiates game
<<<<<<< HEAD
    pl_wire01 = new component(150, 15, "#abb482", 150, 300);
    pl_wire02 = new component(15, 180, "#abb482", 240, 367); 
    pl_wire03 = new component(15, 435, "#abb482", 590, 367); 
    pl_wire04 = new component(150, 15, "#abb482", 800, 285); 
    pl_retr05 = new component(40, 80, "#abb482", 350, 365);
    
    wire01 = new component(150, 15, "#D7912F", 220, 200); 
    wire02 = new component(15, 180, "#D7912F", 240, 465); 
    wire03 = new component(15, 435, "#D7912F", 600, 455); 
    wire04 = new component(150, 15, "#D7912F", 800, 482); 
    retr05 = new component(40, 80, "retrimg", 450, 365,'img');
    
    lemd06 = new component(60, 80, "#DE401E", 800, 180);
    batt07 = new component(90, 100, "battimg", 150, 180,'img');
=======
    pl_wire01 = new component(150, 20, "#BEC991", 150, 400);
    pl_wire02 = new component(20, 180, "#BEC991", 240, 465); 
    pl_wire03 = new component(20, 480, "#BEC991", 600, 455); 
    pl_wire04 = new component(150, 20, "#BEC991", 800, 382); 
    pl_retr05 = new component(20, 80, "#BEC991", 350, 465);
    
    wire01 = new component(150, 20, "#D7912F", 220, 300); 
    wire02 = new component(20, 180, "#D7912F", 240, 565); 
    wire03 = new component(20, 480, "#D7912F", 600, 555); 
    wire04 = new component(150, 20, "#D7912F", 800, 582); 
    retr05 = new component(20, 80, "retrimg", 450, 465, "img");
    
    lemd06 = new component(60, 80, "#DE401E", 800, 280);
    batt07 = new component(90, 80, "battimg", 150, 280, "img");
>>>>>>> 1a1eddebabc057271376aca67b016699800acbcf
    
    char = new component(15, 15, "#fa8940", 250, 265);

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
<<<<<<< HEAD
    if (type == "img") {
        this.image = document.getElementById(color);
    } 
=======
    if (type == "img") this.image = document.getElementById(color);
>>>>>>> 1a1eddebabc057271376aca67b016699800acbcf
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
<<<<<<< HEAD
            ctx.save();
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
=======
            ctx.save(); 
            // canvas receives char properties (loc, deg, color)
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.angle);
>>>>>>> 1a1eddebabc057271376aca67b016699800acbcf
            ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
            // canvas spawns a duplicate char to its own properties
            ctx.restore();
            // positioning
            this.angle += this.angleInc * Math.PI / 180;
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle); 
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
    this.snap = function(obj) {
        this.x = obj.x;
        this.y = obj.y;
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

var Main = {
    wire01: {
        att: true,
        snap: false,
    },
    wire02: {
        att: true,
        snap: false,
    },
    wire03: {
        att: true,
        snap: false,
    },
    wire04: {
        att: true,
        snap: false,
    },
    retr05: {
        att: true,
        snap: false,
    }
}

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
        if (Main.mark.att && !(Main.mark.snap)) {mark.follow(char)} 
        if (area.keys && area.keys[83]) {Main.mark.att = false; mark.angleInc = 0;mark.speed = 0;} 
        else if (area.keys && area.keys[68]) {Main.mark.att = true} 
    }
    `
    var result = '';
    for (var x = 0; x < objA.length; x++) {
        elem = objA[x];
        result += template.replace(/mark/g, elem);
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
    
    eval(elem_crash(['wire01','wire02','wire03','retr05','wire04'],'horz'));    
    eval(elem_update(
        ['pl_wire01','pl_wire02','pl_wire03','pl_wire04','pl_retr05',
         'wire01','wire02','wire03','wire04',
         'retr05','lemd06','batt07']
         )
      );
    
    a = batt07.crash_horz(wire01);
    b = wire01.crash_horz(wire02);
    c = wire02.crash_horz(retr05); 
    d = retr05.crash_horz(wire03);
    e = wire03.crash_horz(wire04);
    f = wire04.crash_horz(lemd06);
    
    if ( a&&b&&c&&d&&e&&f ) {
        success();
    }
    
    turn();
    char.update();
    
    if (wire01.crash_horz(pl_wire01)) {
        wire01.snap(pl_wire01);
        Main.wire01.snap = true;
    }
    if (wire02.crash_horz(pl_wire02)) {
        wire02.snap(pl_wire02);
        Main.wire02.snap = true;
    }
    if (wire03.crash_horz(pl_wire03)) {
        wire03.snap(pl_wire03);
        Main.wire03.snap = true;
    }
    if (wire04.crash_horz(pl_wire04)) {
        wire04.snap(pl_wire04);
        Main.wire04.snap = true;
    }
    if (retr05.crash_horz(pl_retr05)) {
        retr05.snap(pl_retr05);
        Main.retr05.snap = true;
    }
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