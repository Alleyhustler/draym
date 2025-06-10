(function() {
    var fullUrl = window.location.href;
    var parser = document.createElement('a');
    parser.href = fullUrl;

    // Extract just the hostname, like 'myurl.com'
    var siteUrl = parser.hostname;

    // Create your webring HTML
    var webringHtml = `
        <div style="width: 500px; margin: 0 auto; text-align: center; text-shadow: 0 0 4px red;">
            <p style="margin: 0; padding: 0.1em; border: ridge grey 4px; background-color: #161616; color: #ff8700; display: flex; align-items: center; justify-content: center;">
                <img src="https://i.imgur.com/pRxnQRB.png" style="height: 12px; image-rendering: pixelated; margin-right: 0.5em; filter: drop-shadow(0 0 4px red);"><a style="color: #ff8700; text-decoration: none" href="https://mxbo.neocities.org/rss/ring.html">The RSS Webring</a><img src="https://i.imgur.com/pRxnQRB.png" style="height: 12px; image-rendering: pixelated; margin-left: 0.5em; filter: drop-shadow(0 0 4px red);">
            </p>
            <div style="display: flex; justify-content: center;">
                <a style="flex: 1; margin: 0; padding: 0.1em; border: ridge grey 4px; background-color: #161616; color: #FFDC60; text-align: center;" href="https://webri.ng/webring/rssring/previous?via=https%3A%2F%2F` + siteUrl + `">← Previous</a>
                <a style="flex: 1; margin: 0; padding: 0.1em; border: ridge grey 4px; background-color: #161616; text-align: center; color: #FFDC60" href="https://webri.ng/webring/rssring/random?via=https%3A%2F%2F` + siteUrl + `">Random</a>
                <a style="flex: 1; margin: 0; padding: 0.1em; border: ridge grey 4px; background-color: #161616; text-align: center; color: #FFDC60" href="https://webri.ng/webring/rssring/next?via=https%3A%2F%2F` + siteUrl + `">Next →</a>
            </div>
        </div>
    `;

    // Insert the HTML right where the script tag is placed
    document.currentScript.insertAdjacentHTML('beforebegin', webringHtml);
})();
