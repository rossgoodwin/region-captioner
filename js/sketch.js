var imgPathList;
var imgPathIndex = -1;
var curImg;

var mouseOriginX = 0;
var mouseOriginY = 0;
var mouseDestX = 0;
var mouseDestY = 0;

var captions = {};

var addingCaption = false;

var canvasSize = 700;

var mouseSwitch = false;

function preload() {
	imgPathList = loadJSON('./data/img_paths.json');
}

function setup() {
	for (var i=0; i<Object.keys(imgPathList).length; i++) {
		captions[imgPathList[i]] = {};
	}

	createCanvas(canvasSize,canvasSize);
	background(238,238,238);
	// console.log(imgPathList);
	newImg();
	fill('rgba(255,255,255,0.3)');
	stroke(217,30,24);
	rectMode(CORNERS);
}

function draw() {
	background(238,238,238);
	image(curImg, 0, 0);

	if (mouseIsPressed && mouseX <= canvasSize && mouseY <= canvasSize && mouseSwitch) {
		rect(mouseOriginX, mouseOriginY, mouseX, mouseY);
	}
	else if (addingCaption) {
		rect(mouseOriginX, mouseOriginY, mouseDestX, mouseDestY);
	}


}

function mousePressed() {
	mouseSwitch = false;
	if (mouseX <= canvasSize && mouseY <= canvasSize) {
		addingCaption = false;
		mouseOriginX = mouseX;
		mouseOriginY = mouseY;
		mouseSwitch = true;
	}
}

function mouseReleased() {
	if (mouseX <= canvasSize && mouseY <= canvasSize && mouseSwitch) {
		addingCaption = true;
		mouseDestX = mouseX;
		mouseDestY = mouseY;
		$("#text-input").focus();
	}
}


function newImg() {
	imgPathIndex++;
	var imgFp = imgPathList[imgPathIndex];
	curImg = loadImage(imgFp);
	$('#img-count').text(
		imgFp + ': ' + 'Image ' + (imgPathIndex+1) + ' of ' + Object.keys(imgPathList).length
	);
}

$(function(){

	$("#next-button").click(newImg);

	$('#add-button').click(function(){
		var cap = $('#text-input').val();
		var coords = [mouseOriginX, mouseOriginY, mouseDestX, mouseDestY];
		var coordStr = coords.join(',');
		var imgFp = imgPathList[imgPathIndex];
		// console.log(cap);

		if ( coordStr === '0,0,0,0' || mouseOriginX == mouseDestX || mouseOriginY == mouseDestY ) {
			alert("No box selected!");
		}
		else if (cap === '') {
			alert("No caption!");
		}
		else {
			if (coordStr in captions[imgFp]) {
				captions[imgFp][coordStr].push(cap);
			}
			else {
				captions[imgFp][coordStr] = [cap];
			}
			$('#cap-container').prepend('<p>'+imgFp+' | '+coordStr+' | '+cap+'</p>');

			$('#text-input').val('');
		}

		addingCaption = false;

		mouseOriginX = 0;
		mouseOriginY = 0;
		mouseDestX = 0;
		mouseDestY = 0;
	});

	$('#download-button').click(function(){
		var curDate = new Date();
		saveJSON(captions, 'captions '+curDate.toString()+'.json');
	})

});


