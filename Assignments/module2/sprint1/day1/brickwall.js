function BrickWall(H, W) {
  for (let i = 0; i < H; i++) {
    let row = "";

    if (i % 2 === 0) {
      for (let j = 0; j < W; j++) {
        row += "[]";
      }
    } else {
      row = " " + row;
      for (let j = 0; j < W; j++) {
        row += "[]";
      }
    }
    console.log(row);
  }
}

BrickWall(4, 5);
