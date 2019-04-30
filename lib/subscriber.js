import io from "socket.io-client";

class Player {
  constructor(player) {
    this.player = player;
    this.sockets = {};
    this.playerConnection = null;
  }

  subscribe(name, callback) {
    console.log("name", name);
    this.playerConnection = io.connect(`http://localhost:4000`);
    this.playerConnection.emit("subscribe", name, (err, status) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${this.player} subscribed`);
      }
    });
    // this.sockets[event].on("trigger", callback);
  }

  move(moveObj, matrix, callback) {
    console.log(`player move`);

    let metaData = {
      matrix: matrix,
      moveObj: moveObj
    };
    this.playerConnection.emit("move", metaData);
  }

  subscriptions() {
    return Object.keys(this.sockets);
  }
}

export default Player;
