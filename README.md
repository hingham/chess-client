# Chess Match
#### Chess game for two players
[Chess-Match](https://chess-match.netlify.com)

#### Server
[repo](https://github.com/hingham/chess-server)
This link includes the code that powers the chess match server. It tracks curent games, the position of each piece on the board, and does the work to validates the move. 

#### Front End
This is the repository for frontend application for chess match, a two player, realtime chess games. To play the game, each player much go to the [chessmatch link](https://chess-match.netlify.com). One player will start a new game, and the other player must choose to join that game. Play your chess game and experience a surprise annimation at the end. 

## Modules:
#### Draw-board.js
Responsible for drawing the board with the correct colors and pieces. Reponsible for adding event lister for click and keypress events for moving pieces.

#### game-app.js
Connects to the backend socket.io server, responds to events send front from the backend,and sends requests to the socket.io server. Calls key functions of the frontend to update view when pieces move. 

#### get-coordinates.js
Collects the coordinates on the board when the player moves and assembles a object that can be passed back the socket.io server.

#### handle-new-move.js
Responsible for redrawing the board after a player has successfully moved, and updating the data shown the player depending on turn status. 

#### render-move-data.js
Shows the player data about where they are moving to and from. Renders the submit button that send the event and the payload to the socket.io server. 

#### show-games.js
Renders that games that are currently able to be joined. Removes game if there are two players already playing one another. 


## Tools
[confetti](https://codepen.io/JTParrett/pen/YxrNVQ?editors=1010)
