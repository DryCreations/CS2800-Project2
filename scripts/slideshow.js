"use strict";

window.onload = function () {
    var listNode = document.getElementById("image_list");    // the ul element
    var captionNode = document.getElementById("caption");    // the h2 element for the caption
    var imageNode = document.getElementById("image");        // the img element for the show
        
    var links = listNode.getElementsByTagName("a");  //get all anchor elements (in this case, the list of images)
    
    // Process image links
    var i, linkNode, theImage;
    var imageCache = [];
    for ( i = 0; i < links.length; i++ ) {
        linkNode = links[i];
        // Preload image and copy title properties
        theImage = new Image();  //dynamic memory, doesn't go out of scope
        theImage.src = linkNode.getAttribute("href");
        theImage.title = linkNode.getAttribute("title");
        imageCache[imageCache.length] = theImage;   //store the preloaded image in an array
    }

    // Start slide show
    var imageCounter = 0;
    //the interval timer issues timer events (every 2 seconds in this case) so don't need to attach an event handler
    //the function is the first parameter of the setInterval function; 2000 is the second parameter
    var  timer = setInterval(
        function () { 
            //need the counter to recycle back to 0, so can't just do ++
            imageCounter = (imageCounter + 1) % imageCache.length;
            theImage = imageCache[imageCounter];
            imageNode.src = theImage.src;
            captionNode.firstChild.nodeValue = theImage.title;
        },
        2000);
};

