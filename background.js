// returns true if given url is a youtube video url
const matchYoutubeUrl = (url) => {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? true : false ;
}

// listen for tab change
chrome.tabs.onActivated.addListener(() => {

    // query all tabs and get the current one (first object in results array) 
    chrome.tabs.query({active: true}, (results) => {
    
        // check if the tab is a youtube video
        if (matchYoutubeUrl(results[0].url)) {
            
            // split the url into 2 parts, and insert a period inbetween them
            let tab = results[0];
            // "https://www.youtube.com"
            let beginningOfUrl = tab.url.substring(0, 23);
            // "/watch?a bunch of chars"
            let endingOfUrl = tab.url.substring(23, tab.url.length);
            let newUrl = beginningOfUrl + "." + endingOfUrl;

            console.log(newUrl); 
  
            // update url to block ads
            chrome.tabs.update(tab.id, {url: newUrl});
    
        }

    });

})