function externalLinks() { for(var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) { var b = c[a]; b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank") } } ; externalLinks(); 
//TOGGLE help
$(".btn-help").click(function() {
    $(".help").toggle("fast", function() {
        // Animation complete.
    });
});
