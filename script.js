// ==================================================
// 下課後，再一起走吧。
// Chapter 1 + Chapter 2
// ==================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3a36b);
scene.fog = new THREE.Fog(0xf3a36b, 14, 38);

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(8, 6, 10);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

document
  .getElementById("game")
  .appendChild(renderer.domElement);


// ==================================================
// UI
// ==================================================

const joystick =
  document.getElementById("joystick");

const stick =
  document.getElementById("stick");

const talkButton =
  document.getElementById("talkButton");

const dialogueBox =
  document.getElementById("dialogueBox");

const speaker =
  document.getElementById("speaker");

const dialogueText =
  document.getElementById("dialogueText");

const missionText =
  document.querySelector(".mission");

const chapterText =
  document.querySelector(".chapter");


// ==================================================
// 全域狀態
// ==================================================

let currentChapter = 1;

let joyX = 0;
let joyY = 0;

let touchingJoystick = false;
let isTalking = false;

let dialogueIndex = 0;

let yuntingFollowing = false;
let chapterEnding = false;

let chapter2Started = false;
let musicGameStarted = false;

const maxDistance = 40;


// ==================================================
// 材質
// ==================================================

const skinMat = new THREE.MeshStandardMaterial({
  color: 0xe8b18d
});

const blackMat = new THREE.MeshStandardMaterial({
  color: 0x171717
});

const pantsMat = new THREE.MeshStandardMaterial({
  color: 0x252525
});

const shirtMat = new THREE.MeshStandardMaterial({
  color: 0xf0eee8
});

const skirtMat = new THREE.MeshStandardMaterial({
  color: 0x292b32
});


// ==================================================
// 燈光
// ==================================================

const ambient = new THREE.HemisphereLight(
  0xffd6aa,
  0x556677,
  1.8
);

scene.add(ambient);

const sun = new THREE.DirectionalLight(
  0xffa55f,
  3
);

sun.position.set(-10, 15, 8);
scene.add(sun);


// ==================================================
// En
// ==================================================

function createPlayer() {
  const player = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 1.05, 0.45),
    blackMat
  );

  body.position.y = 1.35;
  player.add(body);

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.82, 0.78),
    skinMat
  );

  head.position.y = 2.25;
  player.add(head);

  const hair = new THREE.Mesh(
    new THREE.BoxGeometry(0.88, 0.30, 0.82),
    blackMat
  );

  hair.position.y = 2.60;
  player.add(hair);

  const leftArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.9, 0.3),
    skinMat
  );

  leftArm.position.set(-0.58, 1.35, 0);
  player.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 0.58;
  player.add(rightArm);

  const leftLeg = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.9, 0.4),
    pantsMat
  );

  leftLeg.position.set(-0.23, 0.43, 0);
  player.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.x = 0.23;
  player.add(rightLeg);

  return player;
}

const player = createPlayer();

player.position.set(0, 0, 3);

scene.add(player);


// ==================================================
// 昀婷
// ==================================================

function createYunting() {
  const yunting = new THREE.Group();

  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.85, 0.42),
    shirtMat
  );

  torso.position.y = 1.15;
  yunting.add(torso);

  const skirt = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.38, 0.46),
    skirtMat
  );

  skirt.position.y = 0.72;
  yunting.add(skirt);

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.72, 0.68),
    skinMat
  );

  head.position.y = 1.92;
  yunting.add(head);

  const hair = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.28, 0.73),
    blackMat
  );

  hair.position.y = 2.24;
  yunting.add(hair);

  const hairBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.75, 0.18),
    blackMat
  );

  hairBack.position.set(0, 1.89, -0.35);
  yunting.add(hairBack);

  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x191919
  });

  const eyeL = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.045, 0.035),
    eyeMat
  );

  eyeL.position.set(-0.14, 1.91, 0.35);
  yunting.add(eyeL);

  const eyeR = eyeL.clone();
  eyeR.position.x = 0.14;
  yunting.add(eyeR);

  const armL = new THREE.Mesh(
    new THREE.BoxGeometry(0.20, 0.68, 0.26),
    skinMat
  );

  armL.position.set(-0.48, 1.12, 0);
  yunting.add(armL);

  const armR = armL.clone();
  armR.position.x = 0.48;
  yunting.add(armR);

  const legMat = new THREE.MeshStandardMaterial({
    color: 0x26272b
  });

  const legL = new THREE.Mesh(
    new THREE.BoxGeometry(0.27, 0.62, 0.32),
    legMat
  );

  legL.position.set(-0.18, 0.30, 0);
  yunting.add(legL);

  const legR = legL.clone();
  legR.position.x = 0.18;
  yunting.add(legR);

  const bag = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.52, 0.18),
    new THREE.MeshStandardMaterial({
      color: 0x202126
    })
  );

  bag.position.set(0, 1.10, -0.32);
  yunting.add(bag);

  const charm = new THREE.Mesh(
    new THREE.BoxGeometry(0.10, 0.15, 0.07),
    new THREE.MeshStandardMaterial({
      color: 0x39d5c5,
      emissive: 0x39d5c5,
      emissiveIntensity: 0.5
    })
  );

  charm.position.set(0.33, 1.02, -0.34);
  yunting.add(charm);

  yunting.scale.setScalar(0.88);

  return yunting;
}

const yunting = createYunting();

yunting.position.set(1.5, 0, 3);

scene.add(yunting);


// ==================================================
// 驚嘆號
// ==================================================

const exclamation = new THREE.Group();

const exMat = new THREE.MeshStandardMaterial({
  color: 0xffd84d,
  emissive: 0xffb800,
  emissiveIntensity: 0.6
});

const exBar = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 0.45, 0.10),
  exMat
);

exBar.position.y = 0.18;
exclamation.add(exBar);

const exDot = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 0.14, 0.10),
  exMat
);

exDot.position.y = -0.18;
exclamation.add(exDot);

exclamation.visible = false;

scene.add(exclamation);


// ==================================================
// 場景群組
// ==================================================

const chapter1World = new THREE.Group();
const chapter2World = new THREE.Group();

scene.add(chapter1World);
scene.add(chapter2World);

chapter2World.visible = false;


// ==================================================
// Chapter 1 校園
// ==================================================

function buildChapter1() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({
      color: 0x8d765c
    })
  );

  ground.rotation.x = -Math.PI / 2;

  chapter1World.add(ground);


  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 30),
    new THREE.MeshStandardMaterial({
      color: 0x77736e
    })
  );

  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.02, 8);

  chapter1World.add(road);


  const school = new THREE.Mesh(
    new THREE.BoxGeometry(12, 6, 4),
    new THREE.MeshStandardMaterial({
      color: 0xc89974
    })
  );

  school.position.set(0, 3, -6);

  chapter1World.add(school);


  const windowMat =
    new THREE.MeshStandardMaterial({
      color: 0x496879
    });

  for (let floor = 0; floor < 2; floor++) {
    for (let x = -4; x <= 4; x += 2) {
      const w = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 1, 0.08),
        windowMat
      );

      w.position.set(
        x,
        1.7 + floor * 2.2,
        -3.96
      );

      chapter1World.add(w);
    }
  }


  function createTree(x, z) {
    const tree = new THREE.Group();

    const trunk = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 2.2, 0.45),
      new THREE.MeshStandardMaterial({
        color: 0x65452f
      })
    );

    trunk.position.y = 1.1;

    tree.add(trunk);

    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 7, 5),
      new THREE.MeshStandardMaterial({
        color: 0x52653b
      })
    );

    leaves.position.y = 3;

    tree.add(leaves);

    tree.position.set(x, 0, z);

    chapter1World.add(tree);
  }

  createTree(-5, 0);
  createTree(5, 2);
  createTree(-5, 8);
  createTree(5, 12);
  createTree(-5, 16);


  const gateMat =
    new THREE.MeshStandardMaterial({
      color: 0x4d5054
    });

  const gateLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 3.2, 0.7),
    gateMat
  );

  gateLeft.position.set(-3, 1.6, 20);

  chapter1World.add(gateLeft);

  const gateRight = gateLeft.clone();

  gateRight.position.x = 3;

  chapter1World.add(gateRight);

  const gateTop = new THREE.Mesh(
    new THREE.BoxGeometry(6.7, 0.45, 0.6),
    gateMat
  );

  gateTop.position.set(0, 3, 20);

  chapter1World.add(gateTop);
}

buildChapter1();


// ==================================================
// Chapter 2 教室
// ==================================================

let gameTable;

function buildChapter2() {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 24),
    new THREE.MeshStandardMaterial({
      color: 0xb89a78
    })
  );

  floor.rotation.x = -Math.PI / 2;

  chapter2World.add(floor);


  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(18, 7, 0.4),
    new THREE.MeshStandardMaterial({
      color: 0xe6d8c9
    })
  );

  backWall.position.set(0, 3.5, -7);

  chapter2World.add(backWall);


  const board = new THREE.Mesh(
    new THREE.BoxGeometry(7, 2.5, 0.15),
    new THREE.MeshStandardMaterial({
      color: 0x35584a
    })
  );

  board.position.set(0, 3.5, -6.75);

  chapter2World.add(board);


  const windowMat =
    new THREE.MeshStandardMaterial({
      color: 0x8db7c7,
      emissive: 0x537b86,
      emissiveIntensity: 0.15
    });

  for (let i = 0; i < 3; i++) {
    const w = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 2.8, 0.12),
      windowMat
    );

    w.position.set(
      -5 + i * 5,
      3.7,
      -6.7
    );

    chapter2World.add(w);
  }


  function createDesk(x, z) {
    const desk = new THREE.Group();

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 0.18, 1.2),
      new THREE.MeshStandardMaterial({
        color: 0xa7754f
      })
    );

    top.position.y = 1.15;

    desk.add(top);

    const legMat =
      new THREE.MeshStandardMaterial({
        color: 0x4c4c4c
      });

    const positions = [
      [-0.8, -0.4],
      [0.8, -0.4],
      [-0.8, 0.4],
      [0.8, 0.4]
    ];

    positions.forEach(function (p) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.12,
          1.1,
          0.12
        ),
        legMat
      );

      leg.position.set(
        p[0],
        0.55,
        p[1]
      );

      desk.add(leg);
    });

    desk.position.set(x, 0, z);

    chapter2World.add(desk);

    return desk;
  }

  createDesk(-4, -1);
  createDesk(4, -1);
  createDesk(-4, 3);
  createDesk(4, 3);

  gameTable = createDesk(0, 2);


  // 桌上的兩支手機

  const phoneMat =
    new THREE.MeshStandardMaterial({
      color: 0x15171a,
      emissive: 0x2b5b78,
      emissiveIntensity: 0.25
    });

  const phone1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.05, 0.72),
    phoneMat
  );

  phone1.position.set(-0.35, 1.27, 2);

  chapter2World.add(phone1);

  const phone2 = phone1.clone();

  phone2.position.x = 0.35;

  chapter2World.add(phone2);
}

buildChapter2();


// ==================================================
// 黑幕
// ==================================================

const transition =
  document.createElement("div");

transition.style.position = "fixed";
transition.style.inset = "0";
transition.style.background = "#0b0b0d";
transition.style.zIndex = "9999";
transition.style.display = "flex";
transition.style.flexDirection = "column";
transition.style.justifyContent = "center";
transition.style.alignItems = "center";
transition.style.color = "white";
transition.style.fontFamily = "system-ui, sans-serif";
transition.style.opacity = "0";
transition.style.pointerEvents = "none";
transition.style.transition = "opacity 1.2s ease";

const transitionSmall =
  document.createElement("div");

transitionSmall.style.fontSize = "15px";
transitionSmall.style.opacity = "0.65";
transitionSmall.style.marginBottom = "12px";

const transitionTitle =
  document.createElement("div");

transitionTitle.style.fontSize = "28px";
transitionTitle.style.fontWeight = "700";

transition.appendChild(
  transitionSmall
);

transition.appendChild(
  transitionTitle
);

document.body.appendChild(
  transition
);


// ==================================================
// 對話內容
// ==================================================

const chapter1Dialogues = [
  "欸，你也要回家嗎？",
  "我等等要去搭電車。",
  "要不要一起走？"
];

const chapter2Dialogues = [
  "你也有玩這個喔？",
  "要不要一起打一場？",
  "等一下輸了不要怪我喔。"
];

let activeDialogues =
  chapter1Dialogues;


// ==================================================
// 搖桿
// ==================================================

joystick.addEventListener(
  "pointerdown",
  function (e) {
    if (
      isTalking ||
      chapterEnding ||
      musicGameStarted
    ) {
      return;
    }

    touchingJoystick = true;

    joystick.setPointerCapture(
      e.pointerId
    );

    updateJoystick(e);
  }
);

joystick.addEventListener(
  "pointermove",
  function (e) {
    if (!touchingJoystick) return;

    updateJoystick(e);
  }
);

function resetJoystick() {
  touchingJoystick = false;

  joyX = 0;
  joyY = 0;

  stick.style.transform =
    "translate(0px, 0px)";
}

joystick.addEventListener(
  "pointerup",
  resetJoystick
);

joystick.addEventListener(
  "pointercancel",
  resetJoystick
);

function updateJoystick(e) {
  const rect =
    joystick.getBoundingClientRect();

  const centerX =
    rect.left + rect.width / 2;

  const centerY =
    rect.top + rect.height / 2;

  let dx =
    e.clientX - centerX;

  let dy =
    e.clientY - centerY;

  const distance =
    Math.sqrt(dx * dx + dy * dy);

  if (distance > maxDistance) {
    dx =
      (dx / distance) *
      maxDistance;

    dy =
      (dy / distance) *
      maxDistance;
  }

  stick.style.transform =
    `translate(${dx}px, ${dy}px)`;

  joyX = dx / maxDistance;
  joyY = dy / maxDistance;
}


// ==================================================
// 對話
// ==================================================

talkButton.addEventListener(
  "click",
  function () {
    if (chapterEnding) return;

    isTalking = true;
    dialogueIndex = 0;

    resetJoystick();

    if (currentChapter === 1) {
      player.rotation.y =
        Math.atan2(
          yunting.position.x -
            player.position.x,
          yunting.position.z -
            player.position.z
        );

      yunting.rotation.y =
        Math.atan2(
          player.position.x -
            yunting.position.x,
          player.position.z -
            yunting.position.z
        );
    }

    speaker.textContent =
      "昀婷";

    dialogueText.textContent =
      activeDialogues[0];

    dialogueBox.style.display =
      "block";

    talkButton.style.display =
      "none";

    exclamation.visible =
      false;
  }
);

dialogueBox.addEventListener(
  "click",
  function () {
    if (!isTalking) return;

    dialogueIndex++;

    if (
      dialogueIndex <
      activeDialogues.length
    ) {
      dialogueText.textContent =
        activeDialogues[
          dialogueIndex
        ];

      return;
    }

    dialogueBox.style.display =
      "none";

    dialogueIndex = 0;
    isTalking = false;

    if (currentChapter === 1) {
      yuntingFollowing = true;

      if (missionText) {
        missionText.textContent =
          "和昀婷一起走到校門";
      }
    }

    if (currentChapter === 2) {
      musicGameStarted = true;

      if (missionText) {
        missionText.textContent =
          "一起完成一首歌";
      }
    }
  }
);


// ==================================================
// Chapter 1 → Chapter 2
// ==================================================

function finishChapterOne() {
  if (chapterEnding) return;

  chapterEnding = true;

  resetJoystick();

  transitionSmall.textContent =
    "";

  transitionTitle.textContent =
    "";

  transition.style.opacity =
    "1";

  setTimeout(function () {
    transitionSmall.textContent =
      "幾天後・下課時間";

    transitionTitle.textContent =
      "Chapter 2 — 一起打音遊";
  }, 800);

  setTimeout(function () {
    startChapterTwo();
  }, 2600);
}


// ==================================================
// Chapter 2
// ==================================================

function startChapterTwo() {
  currentChapter = 2;

  chapter1World.visible = false;
  chapter2World.visible = true;

  scene.background =
    new THREE.Color(0xf1c692);

  scene.fog =
    new THREE.Fog(
      0xf1c692,
      12,
      30
    );

  player.position.set(
    -1.4,
    0,
    4
  );

  player.rotation.y =
    Math.PI;

  yunting.position.set(
    1.4,
    0,
    4
  );

  yunting.rotation.y =
    Math.PI;

  yuntingFollowing = false;

  activeDialogues =
    chapter2Dialogues;

  chapterEnding = false;
  chapter2Started = true;

  if (chapterText) {
    chapterText.textContent =
      "Chapter 2 — 一起打音遊";
  }

  if (missionText) {
    missionText.textContent =
      "走到昀婷旁邊";
  }

  camera.position.set(
    7,
    5,
    10
  );

  transition.style.opacity =
    "0";
}


// ==================================================
// 遊戲循環
// ==================================================

function animate() {
  requestAnimationFrame(animate);

  const speed = 0.06;

  if (
    !isTalking &&
    !chapterEnding &&
    !musicGameStarted
  ) {
    player.position.x +=
      joyX * speed;

    player.position.z +=
      joyY * speed;

    if (
      Math.abs(joyX) > 0.05 ||
      Math.abs(joyY) > 0.05
    ) {
      player.rotation.y =
        Math.atan2(
          joyX,
          joyY
        );
    }
  }


  // Chapter 1 跟隨

  if (
    currentChapter === 1 &&
    yuntingFollowing &&
    !isTalking &&
    !chapterEnding
  ) {
    const dx =
      player.position.x -
      yunting.position.x;

    const dz =
      player.position.z -
      yunting.position.z;

    const distance =
      Math.sqrt(
        dx * dx +
        dz * dz
      );

    if (distance > 1.5) {
      const followSpeed =
        0.042;

      yunting.position.x +=
        (dx / distance) *
        followSpeed;

      yunting.position.z +=
        (dz / distance) *
        followSpeed;

      yunting.rotation.y =
        Math.atan2(dx, dz);
    }
  }


  const distanceToYunting =
    player.position.distanceTo(
      yunting.position
    );


  // Chapter 1 對話

  if (
    currentChapter === 1 &&
    distanceToYunting < 2.2 &&
    !isTalking &&
    !yuntingFollowing &&
    !chapterEnding
  ) {
    talkButton.textContent =
      "對話";

    talkButton.style.display =
      "block";

    exclamation.visible =
      true;

  }


  // Chapter 2 對話

  else if (
    currentChapter === 2 &&
    distanceToYunting < 2.3 &&
    !isTalking &&
    !musicGameStarted
  ) {
    talkButton.textContent =
      "一起玩";

    talkButton.style.display =
      "block";

    exclamation.visible =
      true;

  }

  else {
    talkButton.style.display =
      "none";

    exclamation.visible =
      false;
  }


  // 驚嘆號

  exclamation.position.set(
    yunting.position.x,
    2.8 +
      Math.sin(
        Date.now() * 0.004
      ) * 0.12,
    yunting.position.z
  );


  // Chapter 1 校門觸發

  if (
    currentChapter === 1 &&
    yuntingFollowing &&
    !chapterEnding &&
    player.position.z > 18.5
  ) {
    finishChapterOne();
  }


  // Chapter 2 音遊開始後的小動作

  if (
    currentChapter === 2 &&
    musicGameStarted
  ) {
    player.position.x +=
      (-0.8 - player.position.x) *
      0.03;

    player.position.z +=
      (2.9 - player.position.z) *
      0.03;

    yunting.position.x +=
      (0.8 - yunting.position.x) *
      0.03;

    yunting.position.z +=
      (2.9 - yunting.position.z) *
      0.03;

    player.rotation.y = Math.PI;
    yunting.rotation.y = Math.PI;
  }


  // 攝影機

  if (isTalking) {
    const middleX =
      (
        player.position.x +
        yunting.position.x
      ) / 2;

    const middleZ =
      (
        player.position.z +
        yunting.position.z
      ) / 2;

    camera.position.x +=
      (
        middleX + 3.8 -
        camera.position.x
      ) * 0.08;

    camera.position.y +=
      (
        3.2 -
        camera.position.y
      ) * 0.08;

    camera.position.z +=
      (
        middleZ + 5.2 -
        camera.position.z
      ) * 0.08;

    camera.lookAt(
      middleX,
      1.4,
      middleZ
    );

  } else if (
    currentChapter === 2 &&
    musicGameStarted
  ) {
    camera.position.x +=
      (4.8 - camera.position.x) *
      0.05;

    camera.position.y +=
      (3.5 - camera.position.y) *
      0.05;

    camera.position.z +=
      (7 - camera.position.z) *
      0.05;

    camera.lookAt(
      0,
      1.3,
      2.3
    );

  } else {
    camera.position.x +=
      (
        player.position.x + 8 -
        camera.position.x
      ) * 0.06;

    camera.position.y +=
      (
        6 -
        camera.position.y
      ) * 0.06;

    camera.position.z +=
      (
        player.position.z + 10 -
        camera.position.z
      ) * 0.06;

    camera.lookAt(
      player.position.x,
      1.5,
      player.position.z
    );
  }

  renderer.render(
    scene,
    camera
  );
}


// ==================================================
// Resize
// ==================================================

window.addEventListener(
  "resize",
  function () {
    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);


// ==================================================
// Start
// ==================================================

animate();