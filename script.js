var i = 0,
minimizedWidth = new Array,
minimizedHeight = new Array,
windowTopPos = new Array,
windowLeftPos = new Array,
panel,
id; 

function adjustFullScreenSize() {
	$(".fullSizeWindow .wincontent").css("width", (window.innerWidth - 32));
	$(".fullSizeWindow .wincontent").css("height", (window.innerHeight - 98));
}
function makeWindowActive(thisid) {
	$(".window").each(function() {      
		$(this).css('z-index', $(this).css('z-index') - 1);
	});

	$(".window").removeClass("activeWindow");
	$("#window" + thisid).addClass("activeWindow");
$("#window" + thisid).css('z-index',1000);
	$(".taskbarPanel").removeClass('activeTab');
	
	$("#minimPanel" + thisid).addClass("activeTab");
}

function minimizeWindow(id){
	windowTopPos[id] = $("#window" + id).css("top");
	windowLeftPos[id] = $("#window" + id).css("left");
	
	$("#window" + id).animate({
		top: 800,
		left: 0
	}, 200, function() {		//animation complete
		$("#window" + id).addClass('minimizedWindow');
		$("#minimPanel" + id).addClass('minimizedTab');
		$("#minimPanel" + id).removeClass('activeTab');
	});	
}

function openWindow(id) {
	if ($('#window' + id).hasClass("minimizedWindow")) {
		openMinimized(id);
	} else {	
		makeWindowActive(id);
		$("#window" + id).removeClass("closed");
		$("#minimPanel" + id).removeClass("closed");
	}
}
function closeWindow(id) {
	$("#window" + id).addClass("closed");
	$("#minimPanel" + id).addClass("closed");
}

function openMinimized(id) {
	$('#window' + id).removeClass("minimizedWindow");
	$('#minimPanel' + id).removeClass("minimizedTab");
	makeWindowActive(id);
		
	$('#window' + id).animate({
		top: windowTopPos[id],
		left: windowLeftPos[id]
	}, 200, function() {
	});				
}
// Replace with this:
$(document).ready(function() {
    $("#loadingScreen").remove();
});
$(document).ready(function () {
    var i = 0;

    $(".window").each(function () {
        $(this).css('z-index', 1000);
        $(this).attr('data-id', i);
        $(this).addClass('closed');

        // Prevent double-wrapping
        if (!$(this).find('.wincontent').length) {
            $(this).wrapInner('<div class="wincontent"></div>');
        }

        // Ensure scroll works on mobile
        $(this).find('.wincontent').css({
            'overflow': 'auto',
            '-webkit-overflow-scrolling': 'touch',
            'touch-action': 'auto'
        });

        $("#taskbar").append('<div class="taskbarPanel" id="minimPanel' + i + '" data-id="' + i + '">' + $(this).attr("data-title") + '</div>');
        $("#minimPanel" + i).addClass('closed');

        $(this).attr('id', 'window' + (i++));
        $(this).prepend('<div class="windowHeader"><strong>' + $(this).attr("data-title") + '</strong><span title="Minimize" class="winminimize"><span></span></span><span title="Maximize" class="winmaximize"><span></span><span></span></span><span title="Close" class="winclose" style="color:black;text-justify:center;">✖</span></div>');
    });

    // Reapply draggable with cancel after wrapping
    $(".window").draggable({
        handle: ".windowHeader",
        cancel: ".wincontent"
    });

    $(".window").resizable({
        resize: function (event, ui) {
            var windowElement = $(this);
            var windowHeaderHeight = windowElement.find('.windowHeader').outerHeight();
            var windowBorderWidth = windowElement.outerWidth() - windowElement.innerWidth();
            var windowPadding = windowElement.innerWidth() - windowElement.width();

            windowElement.find('.wincontent').css({
                width: ui.size.width - windowPadding - windowBorderWidth,
                height: ui.size.height - windowHeaderHeight - windowPadding - windowBorderWidth
            });
        }
    });

    $(".window").mousedown(function () {
        makeWindowActive($(this).attr("data-id"));
    });

    $(".winclose").on("pointerdown", function () {
        closeWindow($(this).parent().parent().attr("data-id"));
    });

    $(".winminimize").on("pointerdown", function () {
        minimizeWindow($(this).parent().parent().attr("data-id"));
    });

    $(".taskbarPanel").on("pointerdown", function () {
        id = $(this).attr("data-id");
        if ($(this).hasClass("activeTab")) {
            minimizeWindow($(this).attr("data-id"));
        } else {
            if ($(this).hasClass("minimizedTab")) {
                openMinimized(id);
            } else {
                makeWindowActive(id);
            }
        }
    });

    $(".openWindow").on("pointerdown", function () {
        var windowId = $(this).attr("data-id");
        var windowElement = $("#window" + windowId);

        if (windowElement.hasClass('closed') || windowElement.hasClass('minimizedWindow')) {
            windowElement.removeClass('closed minimizedWindow');

            var viewportWidth = $(window).width();
            var viewportHeight = $(window).height();
            var windowWidth = windowElement.outerWidth();
            var windowHeight = windowElement.outerHeight();

            var newLeft = (viewportWidth - windowWidth) / 2;
            var newTop = (viewportHeight - windowHeight) / 2;

            windowElement.css({
                left: newLeft + 'px',
                top: newTop + 'px'
            }).show();
        } else {
            windowElement.addClass('closed').hide();
        }
    });

    $(".winmaximize").click(function () {
        if ($(this).parent().parent().hasClass('fullSizeWindow')) {
            $(this).parent().parent().removeClass('fullSizeWindow');
            $(this).parent().parent().children(".wincontent").height(minimizedHeight[$(this).parent().parent().attr("data-id")]);
            $(this).parent().parent().children(".wincontent").width(minimizedWidth[$(this).parent().parent().attr("data-id")]);
        } else {
            $(this).parent().parent().addClass('fullSizeWindow');
            minimizedHeight[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").height();
            minimizedWidth[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").width();
            adjustFullScreenSize();
        }
    });

    adjustFullScreenSize();

    // DEBUG: Log scroll test
    $(".wincontent").each(function () {
        console.log("Scroll test:", this.scrollHeight > this.clientHeight);
    });
});

function showEntry(entryId) {
    // Hide all entryboxes
    var entries = document.querySelectorAll('.entrybox');
    entries.forEach(function(entry) {
        entry.style.display = 'none';
    });

    // Show the selected entrybox
    var selectedEntry = document.getElementById(entryId);
    if (selectedEntry) {
        selectedEntry.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Hide all entries when the page loads (your existing code)
    var entries = document.querySelectorAll('.entrybox');
    entries.forEach(function(entry) {
        entry.style.display = 'none';
    });

    // Collapsible functionality for multiple sections
    const collapsibleContainers = document.querySelectorAll(".collapsible-container");

    collapsibleContainers.forEach(function(container) {
        const title = container.querySelector(".collapsible-title");
        const content = container.querySelector(".collapsible-content");

        title.addEventListener("click", function() {
            // Toggle the display of the collapsible content
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
	// Function to populate the marquee and the box with the same images
function populateImages() {
    const imageMarquee = document.getElementById('image-marquee');
    const imageBox = document.getElementById('image-box');
    const links = document.querySelectorAll('#source-images a'); // Select all the <a> elements

    links.forEach(link => {
        const clonedLinkForMarquee = link.cloneNode(true); // Clone the link for the marquee
        const clonedLinkForBox = link.cloneNode(true); // Clone the link for the box

        // Append the cloned links to their respective containers
       imageMarquee.appendChild(clonedLinkForMarquee);
        imageBox.appendChild(clonedLinkForBox);
    });

    // Manually trigger the marquee to start after content is added
    setTimeout(() => {
        imageMarquee.start(); // Ensure the marquee starts scrolling
    }, 100); // Small delay to ensure content is fully added before starting
}

// Call the function to populate the images
populateImages();
});

// Array to store references to open pop-up windows
const openPopups = [];
const maxPopups = 5; // Maximum number of pop-ups allowed
let currentIndex = 0; // To keep track of URL cycling

// URLs to cycle through (example URLs)
const urls = [
    'https://x.com/draym_solana',
    'https://x.com/draym_solana',
    'https://x.com/draym_solana'
];

// Function to open the popup window
function openPopup() {
    const url = urls[currentIndex];
    
    // If we've reached the max number of open popups, close the oldest one
    if (openPopups.length >= maxPopups) {
        const oldestPopup = openPopups.shift(); // Remove the oldest popup from the array
        if (oldestPopup && !oldestPopup.closed) {
            oldestPopup.close(); // Close the oldest popup if it's still open
        }
    }

    // Open a new popup window and add it to the array
    const newPopup = window.open(url, '_blank', 'width=450,height=300');
    openPopups.push(newPopup);

    // Cycle through the URLs
    currentIndex = (currentIndex + 1) % urls.length;
}

// Function to start the popup cycle
function startPopupCycle() {
    openPopup();

    // Open a new popup every 5 minutes (300000 ms)
    setInterval(openPopup, 300000);
}

// Start the popup cycle when the page loads
window.onload = startPopupCycle;


// here you tell InteractJS which class of items you'd like to be draggable
interact('.draggable')
  .draggable({
    listeners: {
      // when a user drags the object ('on dragmove') run this function
      move: dragMoveListener,
      // call this function on every dragend event
      end (event) {
        console.log("item dropped!");
      }
    }
  });

function dragMoveListener (event) {
    // Change the image to "moving" pose
    const pagedollImage = document.getElementById("pagedollImage");
    pagedollImage.src = "img/icons/pose3.png";  // Path to your "talking" image
    // all this stuff gets the position of the item while it's being dragged
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// Array of random responses
const responses = [
    "If you're lost, check out the sitemap!",
    "Disable your Window Pop-up Blocker™ for a garanteed worse experience!",
    "Please let me know if you see any missplengs",
    "Remember to leave a comment, like, subscribe and hit that bell so you don't miss any of my uploads-",
    "Font hard to read? Wanna spice things up with a new background?? Check out the Theme Editor!!",
    "My TamaNOTchi is starving (oops), please feed it :(",
    "DID YOU KNOW YOU CAN WIN AN IPHONE 283838 FOR FREE!?!?!?! Just send me an image of the back of your credit card and make sure there's at least $1000-",
    "I have an RSS feed!! Oh, and other social media, I guess... (IG: @mx.rombo | AF, TH and Cara: RomBo | TWT: @Mx_RomBo)",
    "This website is 99% text and 1% actual code",
];

// Flag to track if dialog is open
let isDialogOpen = false;

// Function to show the dialog box with a random response
function showDialog() {
    // If dialog is already open, do nothing
    if (isDialogOpen) return;

    // Set dialog open status
    isDialogOpen = true;

    // Pick a random response and display it
    const randomIndex = Math.floor(Math.random() * responses.length);
    const dialogText = document.getElementById("dialogText");
    dialogText.textContent = responses[randomIndex];

    // Change the image to "talking" pose
    const pagedollImage = document.getElementById("pagedollImage");
    pagedollImage.src = "img/icons/pose2.png";  // Path to your "talking" image

    // Show dialog and overlay
    document.getElementById("dialogBox").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Function to hide the dialog box
function hideDialog() {
    // Reset dialog open status
    isDialogOpen = false;

    // Revert the image to normal pose
    const pagedollImage = document.getElementById("pagedollImage");
    pagedollImage.src = "img/icons/pose1.png";  // Path to your normal image

    // Hide dialog and overlay
    document.getElementById("dialogBox").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}