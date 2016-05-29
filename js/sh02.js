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
    sett01 = new component(100, 10, "#d7912f", 150, 100);
    sett02 = new component(10, 650, "#d7912f", 475, 55); 
    sett03 = new component(100, 10, "#d7912f", 800, 100);
    
    pl_wire01 = new component(150, 10, "#abb482", 150, 300);
    pl_wire02 = new component(10, 240, "#abb482", 270, 369); 
    pl_wire03 = new component(180, 10, "#abb482", 457, 284); 
    pl_wire04 = new component(10, 300, "#abb482", 677, 194); 
    pl_retr05 = new component(10, 80, "#bec991", 420, 369);
    pl_retr06 = new component(20, 80, "#bec991", 497, 194);
    
    wire01 = new component(150, 10, "#d7912f", 70, 300); 
    wire02 = new component(10, 240, "#d7912f", 480, 515); 
    wire03 = new component(180, 10, "#d7912f", 517, 325); 
    wire04 = new component(10, 300, "#d7912f", 700, 300); 
    retr05 = new component(20, 80, "retr05", 450, 445, "img");
    retr06 = new component(20, 80, "retr05", 450, 485, "img");
    
    lemd07 = new component(80, 80, "yellow", 800, 180, "circle");
    batt08 = new component(115, 80, "batt07", 150, 180, "img");
    
    char = new component(40,40, "pika", 250, 265, "img");

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
        this.image = document.getElementById(color);
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
            ctx.save(); 
            // canvas receives char properties (loc, deg, color)
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
            // canvas spawns a duplicate char to its own properties
            ctx.restore();
            // positioning
            this.angle += this.angleInc * Math.PI / 180;
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle); 
        } else if (type == "circle") {
            ctx.beginPath();
            ctx.arc(this.x, this.y, width / 2, 0, 2*Math.PI);
            ctx.fillStyle = Main.lemd07.color;
            ctx.fill();
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
    this.crash_snap = function(otherobj) {
        var diffX = Math.abs(this.x - otherobj.x);
        var diffY = Math.abs(this.y - otherobj.y);
        crash = false;
        if (diffX < 30 && diffY < 30) {
            crash = true;
        }
        return crash;
    }
    this.follow = function(obj) {
        this.x = obj.x + 7;
        this.y = obj.y + 7;
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
        var diffY = this.y - obj.y;
        return (this.x - obj.x) + (this.y - obj.y);
    }
}

var inc = 0; // angleInc's increment
var angleSpeed = 0;

var Main = {
    wire01: {
        att: false,
        snap: false,
    },
    wire02: {
        att: false,
        snap: false,
    },
    wire03: {
        att: false,
        snap: false,
    },
    wire04: {
        att: false,
        snap: false,
    },
    retr05: {
        att: false,
        snap: false,
    },
    retr06: {
        att: false,
        snap: false,
    },
    lemd07: {
        color: '#cca300',
    }
}

function turn() {
    char.angleInc = 0;
    char.speed = 0;
    if (area.keys && area.keys[37]) {char.angleInc = -5; }
    if (area.keys && area.keys[39]) {char.angleInc = 5; }
    if (area.keys && area.keys[38]) {char.speed= 4; }
    if (area.keys && area.keys[40]) {char.speed= -4; }
    if (char.x >= 960) {char.angleInc = 180}
    if (char.x <= 0) {char.angleInc = 180}
    if (char.y >= 560) {char.angleInc = 180}
    if (char.y <= 0) {char.angleInc = 180}
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
    eval(elem_crash(['wire01','wire02','wire03','wire04','retr05','retr06'],'horz'));    
    eval(elem_update(
        ['sett01','sett02','sett03',
         'pl_wire01','pl_wire02','pl_wire03','pl_wire04','pl_retr05','pl_retr06',
         'wire01','wire02','wire03','wire04',
         'retr05','retr06', 'lemd07','batt08']
         )
      );
    
    a = batt08.crash_horz(wire01);
    b = wire01.crash_horz(wire02);
    c = wire02.crash_horz(retr05); 
    d = retr05.crash_horz(wire03);
    e = wire03.crash_horz(retr06);
    f = retr06.crash_horz(wire04);
    g = wire04.crash_horz(lemd07);
    
    if ( a&&b&&c&&d&&e&&f&&8 ) {
        success();
    } else {
        reset();
    }
    
    turn();
    char.update();
    
    if (wire01.crash_snap(pl_wire01)) {
        wire01.snap(pl_wire01);
        Main.wire01.snap = true;
    }
    if (wire02.crash_snap(pl_wire02)) {
        wire02.snap(pl_wire02);
        Main.wire02.snap = true;
    }
    if (wire03.crash_snap(pl_wire03)) {
        wire03.snap(pl_wire03);
        Main.wire03.snap = true;
    }
    if (wire04.crash_snap(pl_wire04)) {
        wire04.snap(pl_wire04);
        Main.wire04.snap = true;
    }
    if (retr05.crash_snap(pl_retr05)) {
        retr05.snap(pl_retr05);
        Main.retr05.snap = true;
    }
    if (retr06.crash_snap(pl_retr06)) {
        retr06.snap(pl_retr06);
        Main.retr06.snap = true;
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
    function on() {
        Main.lemd07.color = "yellow";
    }
    function off() {
        Main.lemd07.color = "#cca300";
    }
    setTimeout(on,200);
    setTimeout(off,500);
    setTimeout(on,600);
    setTimeout(off,700);
    setTimeout(on,800);
    setTimeout(on,850);
    setTimeout(off,900);
    setTimeout(on,1000);
    setTimeout(off,1200);
    setTimeout(on,1250);
    setTimeout(nextlevel, 3000);
}

function reset() {
    document.getElementById('canvas').style.backgroundColor = '#BEC991';
}

function nextlevel() {
     window.location.href = "win.html";
}
