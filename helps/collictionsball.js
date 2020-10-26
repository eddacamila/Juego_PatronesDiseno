function ready() {
    var Quadtree = function (lvl, coords) {
        //http://gamedev.tutsplus.com/tutorials/implementation/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space/
        this.MAX_OBJECTS = 10;
        this.MAX_LEVELS = 10;

        this.level = lvl;
        this.objects = [];
        this.bounds = coords;
        this.nodes = [];

        /*
         * Clears the quadtree
         */
        this.clear = function () {
            this.objects.length = 0;

            for (var i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i] != null) {
                    this.nodes[i].clear();
                    this.nodes[i] = null;
                }
            }
        }
        /*
         * Splits the node into 4 subnodes
         */
        this.split = function () {
            var subWidth = Math.round(this.bounds.width / 2);
            var subHeight = Math.round(this.bounds.height / 2);
            var x = this.bounds.x;
            var y = this.bounds.y;

            this.nodes[0] = new Quadtree(this.level + 1, {
                x: x + subWidth,
                y: y,
                width: subWidth,
                height: subHeight
            });
            this.nodes[1] = new Quadtree(this.level + 1, {
                x: x,
                y: y,
                width: subWidth,
                height: subHeight
            });
            this.nodes[2] = new Quadtree(this.level + 1, {
                x: x,
                y: y + subHeight,
                width: subWidth,
                height: subHeight
            });
            this.nodes[3] = new Quadtree(this.level + 1, {
                x: x + subWidth,
                y: y + subHeight,
                width: subWidth,
                height: subHeight
            });
        }
        /*
         * Determine which node the object belongs to. -1 means
         * object cannot completely fit within a child node and is part
         * of the parent node
         */
        this.getIndex = function (coord) {
            var index = -1;
            var horizontalMidpoint = this.bounds.x + (this.bounds.width / 2);
            var verticalMidpoint = this.bounds.y + (this.bounds.height / 2);

            // Object can completely fit within the top quadrants
            var topQuadrant = (coord.y + coord.radius < verticalMidpoint);
            // Object can completely fit within the bottom quadrants
            var bottomQuadrant = (coord.y - coord.radius > verticalMidpoint);

            // Object can completely fit within the left quadrants
            if (coord.x + coord.radius < horizontalMidpoint) {
                if (topQuadrant) {
                    index = 1;
                } else if (bottomQuadrant) {
                    index = 2;
                }
            }
            // Object can completely fit within the right quadrants
            else if (coord.x - coord.radius > horizontalMidpoint) {
                if (topQuadrant) {
                    index = 0;
                } else if (bottomQuadrant) {
                    index = 3;
                }
            }
            return index;
        }
        /*
         * Insert the object into the quadtree. If the node
         * exceeds the capacity, it will split and add all
         * objects to their corresponding nodes.
         */
        this.insert = function (coord) {
            if (this.nodes[0] != null) {
                var index = this.getIndex(coord);

                if (index != -1) {
                    this.nodes[index].insert(coord);

                    return;
                }
            }

            this.objects.push(coord);

            if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
                //console.log("Splittable");
                if (this.nodes[0] == null) {
                    this.split();
                    //console.log("Splitted");
                }
                var i = 0;
                while (i < this.objects.length) {
                    var index = this.getIndex(this.objects[i]);
                    if (index != -1) {
                        //console.log("if, 1");
                        this.nodes[index].insert(this.objects[i]);
                        this.objects.splice(i, 1);
                    } else {
                        //console.log("if, 2");
                        i++;
                    }
                }
            }
        }
        /*
         * Return all objects that could collide with the given object
         */
        this.retrieve = function (coord) {
            var index = this.getIndex(coord);
            var returnObjects = [];
            if (index != -1 && this.nodes[0] != null) {
                returnObjects = returnObjects.concat(this.nodes[index].retrieve(coord));
            }

            returnObjects = returnObjects.concat(this.objects);

            return returnObjects;
        }
        this.stringify = function () {
            return JSON.stringify(this, undefined, 0);
        }
        this.draw = function (ctx) {
            var hmp = this.bounds.x + (this.bounds.width / 2);
            var vmp = this.bounds.y + (this.bounds.height / 2);
            context.beginPath();
            context.moveTo(this.bounds.x, vmp);
            context.lineTo(this.bounds.x + this.bounds.width, vmp);
            context.stroke();
            context.beginPath();
            context.moveTo(hmp, this.bounds.y);
            context.lineTo(hmp, this.bounds.y + this.bounds.height);
            context.stroke();
            for (var i = 0; i < 4; i++) {
                if ((this.nodes[i] != null) && (this.nodes[i].objects.length != 0)) this.nodes[i].draw();
            }
        }
    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    function random_int(start, end) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }
    var balls = function balls(context) {
        this.context = context,
        this.all_balls = [];
        this.quad = new Quadtree(0, {
            x: 0,
            y: 0,
            width: this.context.canvas.width,
            height: this.context.canvas.height
        });
        this.add = function () {
            var x = new ball(this.context);
            this.all_balls.push(x);
            return x;
        }
        this.start = function () {
            (function animloop() {
                requestAnimFrame(animloop);
                var x = new Date().getTime() - (this.time || new Date().getTime());
                this.time = new Date().getTime();
                Balls.update(x);
                Balls.collision(x);
                Balls.frames();
                Balls.redraw();
            })();
        }
        this.frames = function () {
            var time = new Date().getTime();
            if (!this.last_fps_time) this.last_fps_time = time;
            if (!this.frames_since_last) this.frames_since_last = 0;
            this.frames_since_last++;
            if (time - this.last_fps_time >= 1000) {
                this.frame_text = this.frames_since_last + " FPS";
                this.frames_since_last = 0;
                this.last_fps_time = time;
            }
        }
        this.redraw = function () {
            this.context.save();
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            this.context.restore();
            this.each(function () {
                this.draw();
            });
            var quadtree = false;
            if (quadtree) {
                this.quad.draw(this.context);
            }
            this.context.fillStyle = '#000000';
            this.context.font = "12px 'Open Sans'";
            this.context.fillText(this.frame_text || this.frames_since_last + " FPS", 5, 17);
        }
        this.each = function (fn) {
            for (var i = 0; i < this.all_balls.length; i++) {
                fn.apply(this.all_balls[i]);
            }
        }
        this.collision = function (t) {
            /*var all_balls = this;
            all_balls.each(function () {
                var A = {}, B = {};
                A = this;
                all_balls.each(function () {
                    B = this;
                    if ((A.y != B.y) || (A.x != B.x)) {
                        if (((a = Math.pow(A.x - B.x, 2)) + (b = Math.pow(A.y - B.y, 2))) <= (c = Math.pow(A.radius + B.radius, 2))) {
                            //http://gamedev.tutsplus.com/tutorials/implementation/when-worlds-collide-simulating-circle-circle-collisions/
                            var ax = (A.x_vel * (A.mass - B.mass) + (2 * B.mass * B.x_vel)) / (A.mass + B.mass);
                            var ay = (A.y_vel * (A.mass - B.mass) + (2 * B.mass * B.y_vel)) / (A.mass + B.mass);
                            B.x_vel = (B.x_vel * (B.mass - A.mass) + (2 * A.mass * A.x_vel)) / (A.mass + B.mass);
                            B.y_vel = (B.y_vel * (B.mass - A.mass) + (2 * A.mass * A.y_vel)) / (A.mass + B.mass);
                            A.x_vel = ax;
                            A.y_vel = ay;
                            A.x = A.x + (t * A.x_vel / 16);
                            A.y = A.y + (t * A.y_vel / 16);
                            B.x = B.x + (t * B.x_vel / 16);
                            B.y = B.y + (t * B.y_vel / 16);
                            //B.x = A.x+(B.x>A.x?1:-1)*Math.sqrt(c-b);
                            //B.y = A.y+(B.y>A.y?1:-1)*Math.sqrt(c-a);
                        }
                    }
                });
            });*/
            var returnObjects = [];
            var quad = this.quad;
            this.each(function () {
                var A = {}, B = {};
                A = this;
                returnObjects = quad.retrieve(A);
                for (var x = 0; x < returnObjects.length; x++) {
                    B = returnObjects[x];
                    if (A != B) {
                        if (((a = Math.pow(A.x - B.x, 2)) + (b = Math.pow(A.y - B.y, 2))) <= (c = Math.pow(A.radius + B.radius, 2))) {
                            //http://gamedev.tutsplus.com/tutorials/implementation/when-worlds-collide-simulating-circle-circle-collisions/
                            var ax = (A.x_vel * (A.mass - B.mass) + (2 * B.mass * B.x_vel)) / (A.mass + B.mass);
                            var ay = (A.y_vel * (A.mass - B.mass) + (2 * B.mass * B.y_vel)) / (A.mass + B.mass);
                            B.x_vel = (B.x_vel * (B.mass - A.mass) + (2 * A.mass * A.x_vel)) / (A.mass + B.mass);
                            B.y_vel = (B.y_vel * (B.mass - A.mass) + (2 * A.mass * A.y_vel)) / (A.mass + B.mass);
                            A.x_vel = ax;
                            A.y_vel = ay;
                            A.x = A.x + (t * A.x_vel / 16);
                            A.y = A.y + (t * A.y_vel / 16);
                            B.x = B.x + (t * B.x_vel / 16);
                            B.y = B.y + (t * B.y_vel / 16);
                            //B.x = A.x+(B.x>A.x?1:-1)*Math.sqrt(c-b);
                            //B.y = A.y+(B.y>A.y?1:-1)*Math.sqrt(c-a);
                        }
                    }
                }
            });
        }
        this.update = function (t) {
            var quad = this.quad;
            quad.clear();
            this.each(function () {
                quad.insert(this);
                this.x += (t * this.x_vel / 16);
                this.y += (t * this.y_vel / 16);
                var t_x_vel = this.x_vel;
                var t_y_vel = this.y_vel;
                if (this.x >= this.context.canvas.width - this.radius && this.x_vel > 0) this.x_vel = -this.x_vel;
                if (this.x <= this.radius && this.x_vel < 0) this.x_vel = -this.x_vel;
                if (this.y >= this.context.canvas.height - this.radius && this.y_vel > 0) this.y_vel = -this.y_vel;
                if (this.y <= this.radius && this.y_vel < 0) this.y_vel = -this.y_vel;
                if (this.x_vel != t_x_vel) this.x += (t * this.x_vel / 16);
                if (this.y_vel != t_y_vel) this.y += (t * this.y_vel / 16);
            });
        }
    }
    Object.prototype.ball = function ball(context) {
        this.context = context;
        this.canvas = context.canvas;
        this.context.fillStyle = '#ABC123';
        this.radius = 15;
        this.x = random_int(this.radius + 1, this.canvas.width - this.radius - 1);
        this.y = random_int(this.radius + 1, this.canvas.height - this.radius - 1);
        this.x_vel = random_int(-8, 8);
        this.y_vel = random_int(-8, 8);
        this.draw = function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360, false);
            this.context.fillStyle = this.col;
            this.context.fill();
            this.context.closePath();
        }
        this.color = function (col) {
            this.col = col;
        }
        this.resize = function (r) {
            this.radius = r;
            this.mass = Math.ceil(r * r * Math.PI / 750);
            //this.mass = random_int(15,1500);
        }
        this.resize(this.radius);
        return this;
    }
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.canvas.width = window.innerWidth * 0.9;
    context.canvas.height = window.innerHeight * 0.9;
    var Balls = new balls(context);
    for (var i = 0; i < 500; i++) {
      var b = Balls.add();
        b.color("#" + ((1 << 24) * Math.random() | 0).toString(16));
        b.resize(random_int(2, 5));
        b.draw();
    }
    Balls.start();
    //setTimeout(function () { document.body.innerHTML+=Balls.quad.stringify(); },1250);
}
