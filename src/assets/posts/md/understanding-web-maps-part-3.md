# Understanding Web Maps, Part 3

In the [last post](understanding-web-maps-part-2) I discussed the concept of scale and how certain scale values are important in web maps. In this post, I'll discuss how the concept of the web map viewpoint and how knowing the map viewpoint, along with the scale, can help us position objects in the web map.

When we zoom in an out in a web map, what's going on is that we are shifting the map from one predefined scale level to another. If we are initially at scale level 2, for instance, zooming in will shift to scale level 3. Recall from the previous post that at high scale levels, maps of the whole Earth are quite large (65,536 pixels in length and width at scale level 8). It is not feasible for web maps to display the whole Earth at the highest scale levels. It would require transferring too much data, and also few have people have devices with screens large enough to display tens of thousands of pixels. Instead, web maps typically display only a subset of the entire Earth at a time.

Now let's consider what goes on when we pan in the map. At any given time, a web map is centered over a specific location, which can be expressed in Web Mercator coordinates (see the [first post](understanding-web-maps-part-1) of this series). This location is the web map's viewpoint. Let's say that initially, a web map that is centered over Web Mercator coordinates (0,0), which is the location on the equator where it intersects the Prime Meridian. If we then pan the map, we are shifting viewpoint to a different location and thus a different subset of the entire Earth map is displayed.

How do we figure out exactly which map features fall within the viewport and thus should be rendered? Conceptually, this involves three steps. The first step is to calculate the coordinates of an object relative to the web map viewpoint. Let's say that we want to mark the location in our web map at Web Mercator world coordinates (0,0) and that we have panned the map so that it is centered over coordinates (100,000, 100,000). This means that our marked location is 100,000 meters to the west and 100,000 meters to the north of the map's viewpoint. Relative to the viewpoint, our marked location is at location (-100,000, -100,000).

The second step involves converting relative coordinates from Web Mercator values to pixel values. To do this, we need to know what scale value the map is at. Let's say that we are at scale level 7. Below is a JavaScript object that includes map info for each scale level. At scale level 7, the size of the map covering the whole Earth is 32,768 pixels. Recall from the first post that the total x- and y-axis extent is 40,075,014.1343236 meters. By dividing the circumference of the Earth by the pixel values, we can calculate the distance represented by one pixel at the given zoom level. At scale level 7, it is 1222.992452562495 meters. Using this value, we can then determine the difference in pixels between the center of the web map and any object. Thus, our marked location is approximately 82 pixels offset north and 82 pixels west from the center of the viewpoint.

~~~js
const mapScaleLevels = {   
  "0" : {scaleValue:5.91657527591555E8, mapSizePx:256,   pixelSize:156543.03392800014},   
  "1" : {scaleValue:2.95828763795777E8, mapSizePx:512,   pixelSize:78271.51696399994},   
  "2" : {scaleValue:1.47914381897889E8, mapSizePx:1024,  pixelSize:39135.75848200009},   
  "3" : {scaleValue:7.3957190948944E7,  mapSizePx:2048,  pixelSize:19567.87924099992},   
  "4" : {scaleValue:3.6978595474472E7,  mapSizePx:4096,  pixelSize:9783.93962049996},   
  "5" : {scaleValue:1.8489297737236E7,  mapSizePx:8192,  pixelSize:4891.96981024998},   
  "6" : {scaleValue:9244648.868618,     mapSizePx:16384, pixelSize:2445.98490512499},   
  "7" : {scaleValue:4622324.434309,     mapSizePx:32768, pixelSize:1222.992452562495},   
  "8" : {scaleValue:2311162.217155,     mapSizePx:65536, pixelSize:611.4962262813797}
};
~~~

The third step is to determine the pixel values of locations in the viewport. The size of the web map viewport on a webpage is usually constant. Let's say that the web map viewport is 1024 pixels in width and 768 pixels in height. The viewpoint center will be at pixel (512, 384). Thus our marked value will be positioned at pixel (430, 302).

Conceptually, this is how we determine the pixel value locations of objects in a web map. Things get more complicated when the map becomes interactive. Panning moves the viewpoint center and zooming changes the scale level. However, as long as we know the viewpoint center of the map and the scale value, we can figure out how to place any object on a web map.

This concludes the series on web maps. We have learned how it's possible to convert ordinary lat/lon coordinates to Web Mercator coordinates. We also learned about scale and how certain scale values make it easier to render basemaps in a web map viewport. Finally, we discussed the concept of a web map viewpoint and how it's possible to convert Web Mercator locations to web map viewport locations using the current scale value and the viewpoint of the web map. These are the foundational concepts that underly the operator of web maps. I hope it's been helpful!
