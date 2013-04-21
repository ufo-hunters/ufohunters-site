var ufo_data = (function() {

    var urls = {      //API urls
        shape  : "http://ufo-hunters-2013.herokuapp.com/stats/shape.json",
        ask   : "http://hndroidapi.appspot.com/ask/format/json/page/?appid=vishna&callback=?",
        newest: "http://hndroidapi.appspot.com/newest/format/json/page/?appid=vishna&callback=?",
        best  : "http://hndroidapi.appspot.com/best/format/json/page/?appid=vishna&callback=?"
    },
        thread = /^(item[?]id[=][0-9]+)/,               //regexp for HN thread posts
        w = Math.max( $(window).width() * 0.85, 960 ),  //width
        h = Math.max( $(window).height() * 0.85, 600 ), //height
        m = 20,                                         //margin
        center = {                                      //gravity center
            x : ( w - m ) / 2,
            y : ( h - m ) / 2
        },
        posts,        //content
        next,         //next page
        o,            //opacity scale
        r,            //radius scale
        z,            //color scale
        g,            //gravity scale
        t = {         //time factors
            minutes : 1,
            hour    : 60,
            hours   : 60,
            day     : 1440,
            days    : 1440
        },
        gravity  = -0.01,//gravity constants
        damper   = 0.2,
        friction = 0.9,
        force = d3       //gravity engine
            .layout
            .force()
            .size([ w - m,
                    h - m ]),
        svg = d3         //container
            .select("body article")
            .append("svg")
            .attr("height", h + "px")
            .attr("width", w + "px"),
        circles,         //data representation
        tooltip = CustomTooltip( "posts_tooltip", 240 );

    function init( category ) {
        if ( urls[ category ] ) {
            load( urls[ category ], function() {
                launch();
                //legend();
            });
        }
    }

    function update( category ) {
        if ( urls[ category ] ) {
            load( urls[ category ], function() {
                circles
                    .transition()
                    .duration( 750 )
                    .attr("r", function(d) { return r(d) + 100; })
                    .delay( 250 )
                    .style("opacity", function(d) { return 0; })
                    .remove();

                launch();
            });
        }
    }

    function load( url, callback ){
        $.getJSON(url, function( data ) {

            //posts = data;

	    posts = [{"_id":{"shape":"Flare"},"count":1},{"_id":{"shape":"Crescent"},"count":2},{"_id":{"shape":"Egg"},"count":755},{"_id":{"shape":"Hexagon"},"count":1},{"_id":{"shape":"Rectangle"},"count":1178},{"_id":{"shape":"Round"},"count":2},{"_id":{"shape":"Pyramid"},"count":1},{"_id":{"shape":"Changed"},"count":1},{"_id":{"shape":"Unknown"},"count":5420},{"_id":{"shape":"Diamond"},"count":1120},{"_id":{"shape":"Light"},"count":15151},{"_id":{"shape":"Delta"},"count":8},{"_id":{"shape":"Sphere"},"count":4671},{"_id":{"shape":"Teardrop"},"count":720},{"_id":{"shape":"Cone"},"count":319},{"_id":{"shape":""},"count":2745},{"_id":{"shape":"Cigar"},"count":1998},{"_id":{"shape":"Cross"},"count":218},{"_id":{"shape":"Formation"},"count":2223},{"_id":{"shape":"Fireball"},"count":5085},{"_id":{"shape":"Changing"},"count":1854},{"_id":{"shape":"Flash"},"count":1243},{"_id":{"shape":"Triangle"},"count":7292},{"_id":{"shape":"Chevron"},"count":889},{"_id":{"shape":"Disk"},"count":5329},{"_id":{"shape":"Cylinder"},"count":1178},{"_id":{"shape":"Oval"},"count":3529},{"_id":{"shape":"Dome"},"count":1},{"_id":{"shape":"Circle"},"count":6851},{"_id":{"shape":"Other"},"count":5400}];

            next = posts.pop();


            posts.map( function(d) {
                var count = parseInt( d.count ),
                    score    = parseInt( d.count );
                    //time     = d.time.split(" ");

                d.count = count ? count : 0;
                d.score = count ? count : 0;
                d.time = count * 10; // number * factor

                if ( thread.test(d.url) ) {
                    d.url = "http://news.ycombinator.com/" + d.url;
                }

                return d;
            });

            // Defining the scales
            r = d3.scale.linear()
                .domain([ d3.min(posts, function(d) { return d.score; }),
                          d3.max(posts, function(d) { return d.score; }) ])
                .range([ 10, 130 ])
                .clamp(true);


            z = d3.scale.linear()
                .domain([ d3.min(posts, function(d) { return d.count; }),
                          d3.max(posts, function(d) { return d.count; }) ])
                .range([ '#698DC5', '#698DC5' ]);

            o = d3.scale.linear()
                .domain([ d3.min(posts, function(d) { return d.time; }),
                          d3.max(posts, function(d) { return d.time; }) ])
                .range([ 0.3, 1 ]);

            g = function(d) { return -r(d) * r(d) / 2.5; };

            callback();
        });
    }

    function launch() {

        force
            .nodes( posts );

        circles = svg
            .append("g")
            .attr("id", "circles")
            .selectAll("a")
            .data(force.nodes());

        // Init all circles at random places on the canvas
        force.nodes().forEach( function(d, i) {
            d.x = Math.random() * w;
            d.y = Math.random() * h;
        });

        var node = circles
                .enter()
                .append("a")
                .attr("xlink:href", function(d) { return d.url; })
                .append("circle")
                .attr("r", 0)
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("fill", function(d) { return z( d.count ); })
                .attr("stroke-width", 2)
                .attr("stroke", function(d) { return d3.rgb(z( d.count )).darker(); })
                .attr("id", function(d) { return "post_#" + d.item_id; })
                .attr("title", function(d) { return d.title; })
                .style("opacity", function(d) { return o( d.time ); })
                .on("mouseover", function(d, i) { force.resume(); highlight( d, i, this ); })
                .on("mouseout", function(d, i) { downlight( d, i, this ); });

        d3.selectAll("circle")
            .transition()
            .delay(function(d, i) { return i * 10; })
            .duration( 1000 )
            .attr("r", function(d) { return r( d.score ); });

        loadGravity( moveCenter );

        //Loads gravity
        function loadGravity( generator ) {
            force
                .gravity(gravity)
                .charge( function(d) { return g( d.score ); })
                .friction(friction)
                .on("tick", function(e) {
                    generator(e.alpha);
                    node
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; });
                }).start();
        }

        // Generates a gravitational point in the middle
        function moveCenter( alpha ) {
            force.nodes().forEach(function(d) {
                d.x = d.x + (center.x - d.x) * (damper + 0.02) * alpha;
                d.y = d.y + (center.y - d.y) * (damper + 0.02) * alpha;
            });
        }
    }
	
/*
    function legend() {

        var linearGradient = svg.append("defs")
                .append("linearGradient")
                .attr("id", "legendGradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

        linearGradient
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#ff7f0c")
            .attr("stop-opacity", "0.1");

        linearGradient
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#ff7f0c")
            .attr("stop-opacity", "1");

        var legend = svg.append("g")
                .attr("id", "legend");

        legend
            .append("rect")
            .attr("x", "20")
            .attr("y", "20")
            .attr("width", "20")
            .attr("height", "200")
            .attr("style", "fill:url(#legendGradient);");

        legend
            .append("text")
            .attr("x", 45)
            .attr("y", 30)
            .text("Oldest");

        legend
            .append("text")
            .attr("x", 45)
            .attr("y", 220)
            .text("Newest");

    }
*/

    function highlight( data, i, element ) {
        d3.select( element ).attr( "stroke", "black" );
	
		/*
        var description = data.description.split("|"),
            content = '<span class=\"title\"><a href=\"' + data.url + '\">' + data.title + '</a></span><br/>' +
                       description[0] + "<br/>" +
                      '<a href=\"http://news.ycombinator.com/item?id='+ data.item_id +'\">' + description[1] + '</a>';
		*/
		
		var content = '<span class=\"title\"><strong>Shape:</strong> \"' + data._id.shape + '\"</span><br/>' +
                       '<span><strong>Number of sightings:</strong> ' + data.count + '</span>';
		
        tooltip.showTooltip(content, d3.event);
    }

    function downlight( data, i, element ) {
        d3.select(element).attr("stroke", function(d) { return d3.rgb( z( d.count )).darker(); });
    }

    //Register category selectors
    $("a.category").on("click", function(e) { update( $(this).attr("value") ); });

    return {
        categories : ["news", "best", "ask", "newest"],
        init : init,
        update : update
    };
})();

ufo_data.init("newest");
