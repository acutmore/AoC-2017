var a, b, c, d, e, f, g, h;
a = b = c = d = e = f = g = h = 0;
a = 1; // debug switch

var b = 81;                 // set b 81
var c = b;                  // set c b
if (a !== 0) {              // jnz a 2
                            // jnz 1 5
    b *= 100;               // mul b 100
    b += 100000;            // sub b -100000
    c = b;                  // set c b
    c += 17000;             // sub c -17000
}
do {
    f = 1;                  // set f 1
    d = 2;                  // set d 2
    do {
        if (b % d === 0) f = 0;
                            // set e 2
                            // set g d
                            // mul g e
                            // sub g b
                            // jnz g 2
                            // set f 0
                            // sub e -1
                            // set g e
                            // sub g b
                            // jnz g -8
        d += 1;             // sub d -1
        g = d;              // set g d
        g -= b;             // sub g b
    } while (g !== 0);      // jnz g -13
    if (f === 0) {          // jnz f 2
        h += 1;             // sub h -1
    }
    g = b;                  // set g b
    g -= c;                 // sub g c
    if (g === 0) {          // jnz g 2
        break;              // jnz 1 3
    }
    b += 17;                // sub b -17
} while (true);             // jnz 1 -23

console.log(h);
