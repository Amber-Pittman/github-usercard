/* Step 1: using axios, send a GET request to the following URL 
           (replacing the placeholder with your Github name):
           https://api.github.com/users/<your name>
*/

//let user = [];

const cardSection = document.querySelector(".cards");
//Make a request for a user with an ID
axios.get("https://api.github.com/users/Amber-Pittman")
  .then(response => {
    //network request finished
    let followersArray = [];  // Had to change from const to let
    // Make a 2nd Axios Get Request for Step 5
    // This 2nd one gets a list of my followers
    axios.get("https://api.github.com/users/Amber-Pittman/followers")
      .then(followers => {
        followersArray = followers.data.map(follower => follower.login)
        console.log("My followers", followersArray)
        followersArray.forEach(followerLogin => {
          // Added a 3rd Get Request for my followers data
          axios.get(`https://api.github.com/users/${followerLogin}`)
          .then(followerData => {
            cardSection.appendChild(createCard(followerData.data))
          })
          .catch(error => console.error(error));
        })
      })
      .catch(error => console.error(error))
    cardSection.appendChild(createCard(response.data)); // My personal card
  })
  .catch(error => {
    console.error(error);
    console.log("Network request unsuccessful");    
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//const followersArray = [];  --- Originally here, moved up in Axios.get ln 12

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createCard(user) {
  const card = document.createElement("card");
  card.classList.add("card");

  const img = document.createElement("img");
  img.setAttribute("src", user["avatar_url"]);
  img.setAttribute("data-pin-nopin", "true"); // This prevents pinning to Pinterest

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const h3 = document.createElement("h3");
  h3.classList.add("name");
  h3.textContent = user.name || user.login;

  const pTags = [];
  for(let i = 0; i < 6; i++) {
    pTags.push(document.createElement("p"));
  }

  pTags[0].classList.add("username");
  pTags[0].textContent = user.login;

  pTags[1].textContent = `Location: ${user.location || "Not Available"}`;

  pTags[2].textContent = `Profile: `;
  const a = document.createElement("a");
  const aURL = user["html_url"];
  a.setAttribute("href", aURL);
  a.textContent = aURL;
  pTags[2].appendChild(a);

  pTags[3].textContent = `Followers: ${user.followers} `;

  pTags[4].textContent = `Following: ${user.following} `;

  pTags[5].textContent = `Bio: ${user.bio || "Not Available"}`;

  
  cardInfo.appendChild(h3);
  pTags.forEach(p => cardInfo.appendChild(p));

  card.appendChild(img);
  card.appendChild(cardInfo);

  return card;
}



/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
