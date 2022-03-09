# Understanding Web Maps, Part 1

Welcome to part one of my three part series on web maps. My goal in this series is to explain, at a high level, how web maps work. In particular, I will attempt to shed light on how web maps are able to convert geographic locations (e.g. the lat/long of a particular restaurant) into positions within a viewport (an HTML DOM element) and how they are able to update these positions when a user zooms or pans the web map. This series is not meant to be an exhaustive discussion of how web maps are implemented in JavaScript. My goal instead is to explain some fundamental concepts about web maps and hopefully provide a theoretical foundation that can then be used to for creative purposes. Readers who are interesting in learning more are invited to read about my experience building a web map from scratch using vanilla JavaScript. [put in link]

The first step in understanding web maps is to understand two basic features that pertain to all maps, web or otherwise. These are: 1) a coordinate system, which specifies how locations on the map correspond to locations on the Earth's surface, and 2) a scale, which determines how sizes of objects on the map correspond to the sizes of those objects on the Earth's surface. In this first post, I'll discuss the Web Mercator coordinate system, which is the de facto coordinate system for online web maps. In the next post, I'll discuss the role of scale in rendering web map features.

Coordinate systems can be divided into two types based on how they model locations on the Earth's surface. Projected coordinate systems model the Earth's surface as if it were a flat, two-dimensional plane. Geographic coordinate systems, by contrast, model positions on the Earth's surface as positions on a sphere or approximate sphere (which is a more accurate model of the Earth). The familiar GPS coordinate system (latitude and longitude) is an example of a geographic coordinate system.



As mentioned above, WM, like all projected coordinate systems, models positions on Earth's surface as if they were on a flat, two-dimensional plane. In the east-west direction, the extant ranges from exactly -20,037,507.0671618 meters to 20,037,507.0671618 meters. The total width, -40,075,014.1343236 meters, is approximately equal to the circumference of the Earth at the equator. In the WM system, the south-north extent is assumed to be the same as the east-west extent. In other words, it assumes that the Earth is a perfect sphere. In reality, this is not the case: the circumference of the Earth is slightly greater at the equator than at the poles. This is one simplifying assumption that WM makes.



~~~js
const function latLonToWebMercatorXY(lat, lon){
  return {
    x: lon * 20037508.34 / 180,
    y: Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI) * 20037508.34;
  }
}
~~~

For our purposes, we don't need to understand the details of these functions (I don't!). We should just appreciate that someone came up with them and that they are (relatively) simple. It is worth noting, however, that in the WM coordinate system, the prime meridian is represented as having an x value of 0, and the equator is represented as having a y value of 0. Locations in the western hemisphere (left side of the map) are assigned negative x values, while locations in the eastern hemisphere (right side of the map) are assigned positive x values. Moreover, locations in the northern hemisphere (top half of the map) are assigned positive y values, while locations in the southern hemisphere (bottom half of the map) are assigned negative y values. Thus, the top, left-hand corner of the map has the coordinates (-20,037,507.0671618, 20,037,507.0671618), and the bottom, right-hand corner of the map has the coordinates (20,037,507.0671618, -20,037,507.0671618). From a web developer's perspective, this system of assigning coordinates can be somewhat counter-intuitive. Thus, when developing web maps, the WM coordinate system is often transformed so that the top, left-hand corner has the value of (0,0) and the bottom, right-hand corner has the value of (40,075,014.1343236, 40,075,014.1343236).

