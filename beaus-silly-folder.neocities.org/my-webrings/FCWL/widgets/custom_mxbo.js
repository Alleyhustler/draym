// onionring.js is made up of four files - onionring-widget.js (this one!), onionring-index.js, onionring-variables.js and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// === ONIONRING-WIDGET ===
//this file contains the code which builds the widget shown on each page in the ring. ctrl+f 'EDIT THIS' if you're looking to change the actual html of the widget

var tag = document.getElementById(ringID); //find the widget on the page

thisSite = window.location.href; //get the url of the site we're currently on
thisIndex = null;

// go through the site list to see if this site is on it and find its position
for (i = 0; i < sites.length; i++) {
  if (thisSite.startsWith(sites[i])) { //we use startswith so this will match any subdirectory, users can put the widget on multiple pages
    thisIndex = i;
    break; //when we've found the site, we don't need to search any more, so stop the loop
  }
}

function randomSite() {
  otherSites = sites.slice(); //create a copy of the sites list
  otherSites.splice(thisIndex, 1); //remove the current site so we don't just land on it again
  randomIndex = Math.floor(Math.random() * otherSites.length);
  location.href = otherSites[randomIndex];
}

//if we didn't find the site in the list, the widget displays a warning instead
if (thisIndex == null) {
  tag.insertAdjacentHTML('afterbegin', `
<a href="---"><img src="https://file.garden/ZqzaaX6Iv3i3b03H/placeholder.png"></a>
    <div style="font-size: 14px">this site isn't part of the webring yet!</div> 
    <div style="font-size: 14px">click on the image to visit the site and apply<3</div> 
  `);
}
else {
  //find the 'next' and 'previous' sites in the ring. this code looks complex
  //because it's using a shorthand version of an if-else statement to make sure
  //the first and last sites in the ring join together correctly
  previousIndex = (thisIndex-1 < 0) ? sites.length-1 : thisIndex-1;
  nextIndex = (thisIndex+1 >= sites.length) ? 0 : thisIndex+1;

  indexText = ""
  //if you've chosen to include an index, this builds the link to that
  if (useIndex) {
    indexText = `<a href='${indexPage}'>index</a> | `;
  }

  randomText = ""
  //if you've chosen to include a random button, this builds the link that does that
  if (useRandom) {
    randomText = `<a href='javascript:void(0)' onclick='randomSite()'>random</a> | `;
  }

  //this is the code that displays the widget - EDIT THIS if you want to change the structure
  tag.insertAdjacentHTML('afterbegin', `
  <table style="margin-left:auto;margin-right:auto;">
    <tr>
      <td class='webring-prev'><a href='${sites[previousIndex]}'><img src="https://file.garden/ZqzaaX6Iv3i3b03H/SPA_prev.png" id="previous site"</a></a></td>
      <td class='webring-info'><a href='${indexPage}'><img src="https://file.garden/ZqzaaX6Iv3i3b03H/SPA_CAT.png" id="FCWL webring"></a></td>
      <td class='webring-next'><a href='${sites[nextIndex]}'><img src="https://file.garden/ZqzaaX6Iv3i3b03H/CAT_next.png" id="next site"></a></td>
    </tr>
  </table>
  `);

}
