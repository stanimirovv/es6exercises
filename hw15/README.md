Solution:
Fetches data from the reddit API about top posts in /r/programming; displays them in a simple list

Task:
Now that you're familiar with the Fetch API, it's time to interact with a real API in the wild. Your task is to build a simple website that pulls information from an external API and displays it. Which API you interact with is up to you, as long as it's different from the sample we used in the lectures. You can find a list of APIs in ProgrammableWeb's API directory:

https://www.programmableweb.com/category/all/apis

1. Build an empty page with a button that says "fetch data"
2. When that button is clicked, fetch data from the API you chose above, and display it on your webpage in any way you see fit.
3. Above the fetched data, display a button that says "refresh data". 
4. When the refresh button is clicked, wipe the current (displayed) data from the screen and replace it with newly fetch data from the API.
5. If your request fails at any point, display a popup alert that says "sorry, we couldn't access the API". Hint: To test this functionality, try using your new website with your internet connection turned off!
 

Extra Credit:

Include an HTML form on your page that allows you to POST data to the API in question (after a submit button is clicked). To complete this you'll have to choose your API carefully.


API:
get reddit top posts for /r/programming
https://www.reddit.com/r/programming/top/.json
