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
    sett01 = new component(240, 10, "#d7912f", 150, 170);
    sett02 = new component(10, 100, "#d7912f", 200, 55); 
    sett03 = new component(180, 10, "#d7912f", 250, 140);
    sett04 = new component(150, 10, "#d7912f", 150, 450);
    sett05 = new component(10, 180, "#d7912f", 240, 519); 
    sett06 = new component(444, 10, "#d7912f", 800, 302); 
    sett07 = new component(150, 10, "#d7912f", 550, 160); 
    sett08 = new component(10, 300, "#d7912f", 395, 230); 
    
    sett09 = new component(10, 250, "#d7912f", 670, 85); 
    
    pl_wire03 = new component(10, 440, "#abb482", 580, 519); 
    pl_retr05 = new component(10, 80, "#bec991", 350, 519);
    
    wire03 = new component(10, 440, "#dfa758", 500, 325); 
    
    retr05 = new component(25, 115.5, "retr05", 350, 519, "img");
    lemd06 = new component(80, 80, "yellow", 800, 180, "circle");
    batt07 = new component(115, 80, "batt07", 150, 330, "img");
    
    char = new component(40, 40, "pika", 250, 265, "img");

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
    } else if (type == "circle") {
        
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
            ctx.fillStyle = Main.lemd06.color;
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
    lemd06: {
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
    eval(elem_crash(['wire03'],'horz'));    
    eval(elem_update(
        ['sett01','sett02','sett03','sett04','sett05','sett06','sett07','sett08','sett09',
         'pl_wire03',
         'wire03',
         'retr05','lemd06','batt07']
         )
      );

    if (wire03.crash_horz(retr05) && wire03.crash_horz(sett06)) {
        success();
    }
    
    turn();
    char.update();
    
    if (wire03.crash_snap(pl_wire03)) {
        wire03.snap(pl_wire03);
        Main.wire03.snap = true;
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
        Main.lemd06.color = "yellow";
    }
    function off() {
        Main.lemd06.color = "#cca300";
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
     window.location.href = "sh01.html";
}