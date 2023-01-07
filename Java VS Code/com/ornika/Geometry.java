package com.ornika;

import com.anubhav.Math;

public class Geometry {
    Math math = new Math(); 
    public float getAreaOfSquare (float side) {
        return math.findAreaOfSquare(side);
    }
    public float getAreaOfCircle (float radius) {
        return math.findAreaOfCircle(radius);
    }   
}
