var nameSpace = MU || {};

( function () {
	"use strict";
	
	var timeline;
	var wrapper, clickThrough, logo, copy, cta, width, height, inkingHolder, inkingHolder2;
	
	nameSpace.init = function () {
		// Initialize any variables here
		wrapper = nameSpace.$( '#wrapper' );
		clickThrough = document.getElementById('click_through');
		logo = nameSpace.$( '#logo' );
		copy = nameSpace.$( '#copy' );
		cta = nameSpace.$( '#cta' );
		width = 728;
		height = 90;

		wrapper.addClass( 'show' );

		inkingHolder = nameSpace.$( '#inkingHolder' );
		inkingHolder2 = nameSpace.$( '#inkingHolder2' );

		TweenMax.set([inkingHolder], {alpha:0, scale:1});
		TweenMax.set([inkingHolder2], {alpha:0, scale:1});

		nameSpace.initClickTag();
		nameSpace.initAnimation();

		if ( nameSpace.useFallback() ) {
			nameSpace.injectFallback();
		} else {
		nameSpace.startAnimation();
		}
	};

	nameSpace.initClickTag = function () {
		clickThrough.onclick = function () {
			window.open( window.clickTag );
		};		
	};

	nameSpace.injectFallback = function() {
		var body = document.body;

		while ( body.firstChild ) {
			body.removeChild( body.firstChild );
		}

		var anchor = document.createElement('a');
		anchor.style.cursor = 'pointer';

		var img = new Image();
			img.src = './img/static.jpg';

		anchor.appendChild( img );
		anchor.onclick = function() { window.open(window.clickTag); };
		document.body.appendChild( anchor );
	};

	nameSpace.initAnimation = function () {
		// TweenMax can be used to set css
		// It will even take care of browser prefixes
		// TweenMax.set(logo, {x:100, y:50, opacity:0});
			timeline = new TimelineMax( {
			delay: 0.2,
			onComplete: nameSpace.onAnimationComplete
		} );

		timeline.pause();

		TweenMax.delayedCall(0, MU.inkingAnimate)		
		
		timeline.add("frame1")
				.fromTo([f1_BG, bg], 0.5, {scale:1, force3D:true, rotationZ: 0.01, ease:Linear.easeNone}, {delay:2.7, y:-height}, "frame1")
			.add("frame2")
				.from([f2_BG, f2_copy],0.5, {y: height, autoAlpha:1}, "frame2-=.5")	
				.from(logo01, 0.5, {x:-width}, "frame2-=.5")
		 	.add("frame3", "frame2+=1")
		 		.to(f2_copy, 0.4, {autoAlpha:0}, "frame3")
			 	.to(f2_BGImage, 0.4, { autoAlpha:0, force3D:true, rotationZ: 0.01, ease:Power1.easeOut}, "frame3")
			 	.from(f3_BG, 0.4, {autoAlpha:0, force3D:true, rotationZ: 0.01, ease:Power1.easeOut}, "frame3")		
		 	.add("frame4", "+=1.3")
		 		.to([logo01], 0.3, {autoAlpha:0 , ease:Power2.easeInOut}, "frame4+=0")
			 	.from([logo02], 0.5, {autoAlpha:0, ease:Power1.easeOut}, "frame4+=0")
			 	.to([f3_BG], 0.5, {y:height, rotationZ: 0.01, force3D:true, ease:Cubic.easeOut}, "frame4")
			 	.from(f4_BG, 0.5, {y:-height, rotationZ: 0.01, force3D:true, ease:Cubic.easeOut }, "frame4")
		 		.from(f4_copy1, 0.4, {y:height, autoAlpha:0, ease:Power1.easeOut, force3D:true, rotationZ:0.01, onComplete:MU.inkingAnimate2}, "frame4+=.3")
			 	.from(f4_copy2, 0.5, {y:height, autoAlpha:0, ease:Power1.easeOut, force3D:true, rotationZ:0.01}, "frame4+=2.5")
			 	.to(f2_copy, 0.4, {autoAlpha:0, ease:Power1.easeInOut, force3D:true, rotationZ:0.01}, "frame4-=.2")
			 	 .add("frame5", "+=1.9")
			 	 	.from(f5_copy3, 0.5, {autoAlpha:0}, "frame5+=1.1")
			  		.from([logo03], 0.5, {autoAlpha:0, ease:Power1.easeOut}, "frame5+=0")
				 	.to([f4_BG, f4_copy1, f4_copy2, inkingHolder2], 0.5, {y:-height, rotationZ: 0.01, force3D:true, ease:Cubic.easeOut}, "frame5")
				  	.from(f5_BG, 0.5, {y:height, rotationZ: 0.01, force3D:true, ease:Cubic.easeOut }, "frame5")
				  	.from([f5_copy1], 0.5, {y:height, autoAlpha:0, ease:Cubic.easeOut}, "frame5+=.5")
				  	.from([f5_copy2], 0.5, {y:height, autoAlpha:0, ease:Cubic.easeOut}, "frame5+=.7")
				  	.from([logo02], 0.5, {autoAlpha:0, ease:Power1.easeOut}, "frame5+=0")
				  	.from([cta], 0.5, {autoAlpha:0, ease:Power1.easeOut}, "frame5+=1")

				  .add("frame6", "+=1.6")
				 	.to([f5_copy1, f5_copy2], 0.5, {y:-height, autoAlpha:1, force3D:true, rotationZ:0.01, ease:Cubic.easeOut}, "frame6")
				 	.from([f6_copy1], 0.5, {y:height, autoAlpha:0, ease:Power1.easeOut}, "frame6+=.4")
				 	.from([f6_copy2], 0.5, {y:height, autoAlpha:0, ease:Power1.easeOut}, "frame6+=.5")
	};

	MU.inkingAnimate = function () {
		TweenMax.to(inkingHolder, 0, { alpha:1, ease:Cubic.easeInOut});

		var svg1 = document.getElementById('svg1');
		var paths = svg1.getElementsByTagName('path');

		// holds the paths translated to points for the entire svg
		var svgPaths = [];

		// for (var i = 0; i < paths.length; i++) {
		// 	length = paths[i].getTotalLength() + 2;
		// 	paths[i].style["stroke-dasharray"] = length + ' ' + length;

		svgPaths.push(length);
		 //}

		 console.log(svgPaths.length)
		// example of doing the animation for stroke-dashoffset and the 'marker' element
		// set or animate the marker to the starting point of the next stroke path to be animated prior to starting the two concurrent animations
		var tl = new TimelineMax();


		tl.fromTo(paths[32], 0.15, {'stroke-dashoffset' :41.9607, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[33], 0.15, {'stroke-dashoffset' :74.6594, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[34], 0.1, {'stroke-dashoffset' : 32.4207, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[35], 0.05, {'stroke-dashoffset' : 49.4572, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[36], 0.15, {'stroke-dashoffset' : 83.5336, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[37], 0.05, {'stroke-dashoffset' : 96.6247, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[38], 0.15, {'stroke-dashoffset' : 38.3675, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[39], 0.05, {'stroke-dashoffset' : 65.2144, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});

		tl.fromTo(paths[40], 0.15, {'stroke-dashoffset' : 127.46, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[41], 0.05, {'stroke-dashoffset' : 69.9548, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[42], 0.1, {'stroke-dashoffset' : 69.5863, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[43], 0.05, {'stroke-dashoffset' : 68.8013, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[44], 0.15, {'stroke-dashoffset' : 50.9265, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[45], 0.15, {'stroke-dashoffset' : 70.7127, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[46], 0.05, {'stroke-dashoffset' : 36.3434, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[47], 0.25, {'stroke-dashoffset' : 75.0069, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});

		tl.fromTo(paths[48], 0.35, {'stroke-dashoffset' : 148.507, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});


	};

	MU.inkingAnimate2= function () {
		TweenMax.to(inkingHolder2, 0.3, { alpha:1, ease:Cubic.easeInOut});
		var svg2 = document.getElementById('svg2');
		var paths = svg2.getElementsByTagName('path');
		// // holds the paths translated to points for the entire svg
		 var svgPaths = [];	
		// for (var i = 0; i < paths.length; i++) {
		// 	length = paths[i].getTotalLength() + 2;
		// 	paths[i].style["stroke-dasharray"] = length + ' ' + length;

		 	svgPaths.push(length);
		 //}

		// example of doing the animation for stroke-dashoffset and the 'marker' element
		// set or animate the marker to the starting point of the next stroke path to be animated prior to starting the two concurrent animations
		var tl = new TimelineMax();
		tl.fromTo(paths[0], 0.4, {'stroke-dashoffset' : 20.9795, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[1], 0.2, {'stroke-dashoffset' : 44.542, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[2], 0.15, {'stroke-dashoffset' : 23.0184, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[3], 0.2, {'stroke-dashoffset' : 24.479, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[4], 0.15, {'stroke-dashoffset' : 12.9481, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[5], 0.15, {'stroke-dashoffset' : 40.4112, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[6], 0.15, {'stroke-dashoffset' : 31.8502, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
		tl.fromTo(paths[7], 0.15, {'stroke-dashoffset' : 28.2375, autoAlpha:0},{'stroke-dashoffset' : 0, autoAlpha:1});
	};

	nameSpace.startAnimation = function () {
		// Code for animation		
		timeline.play();
	};

	nameSpace.onAnimationComplete = function () {
		// Log duration of timeline
		console.log( 'Animation Duration: ' + timeline.time() + 's' );

		click_through.onmouseover = function() {
	        TweenLite.to(cta_copy, 0.3, {y:-24, ease:Power2.easeInOut});
	    }

	    click_through.onmouseout = function() {
	        TweenLite.set(cta_copy, {y:0, overwrite:true});
	    }

		// Show a CTA or any animations outside main timeline
		//TweenMax.from( cta, 0.4, { y: '110%' } );
		//TweenMax.to( cta, 0.4, { opacity: 1 } );
	};


	//SET IDs IN DOM TO GLOBAL VARIABLES
	nameSpace.IDsToVars = function (){
	    var allElements = document.getElementsByTagName("*");
	    
	    for (var q = 0; q<allElements.length; q++){
	         var el = allElements[q];
	         if (el.id){
	            window[el.id]=document.getElementById(el.id);
	        }
	    }
	  };

} ) ();