'use strict';

// 將原有場景向外延伸，避免玩家看到平面邊界。
scene.fog.near = 88;
scene.fog.far = 170;

const extendedGround = new THREE.Mesh(
  new THREE.PlaneGeometry(150,150),
  new THREE.MeshStandardMaterial({color:0x78c568,roughness:1})
);
extendedGround.rotation.x = -Math.PI/2;
extendedGround.position.y = -0.025;
extendedGround.receiveShadow = true;
scene.add(extendedGround);

function pathBox(w,d,x,z,color=0xe9d7b8){
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w,.055,d),
    new THREE.MeshStandardMaterial({color,roughness:.98})
  );
  m.position.set(x,.025,z);
  m.receiveShadow = true;
  scene.add(m);
  return m;
}
pathBox(9,116,0,0);
pathBox(116,9,0,0);
pathBox(9,34,-24,2);
pathBox(9,34,24,2);
pathBox(34,9,0,-20);
pathBox(34,9,0,22);

// 石板細節，提升大型公園道路質感。
const paverMatA = new THREE.MeshStandardMaterial({color:0xf1e1c2,roughness:1});
const paverMatB = new THREE.MeshStandardMaterial({color:0xe3cda9,roughness:1});
function paverLine(horizontal, fixed, from=-54, to=54){
  for(let n=from;n<=to;n+=2.15){
    const p = new THREE.Mesh(new THREE.BoxGeometry(1.75,.032,1.75),((Math.floor(n)+fixed)&2)?paverMatA:paverMatB);
    if(horizontal)p.position.set(n,.062,fixed);else p.position.set(fixed,.062,n);
    p.receiveShadow=true;scene.add(p);
  }
}
[-3,0,3].forEach(v=>{paverLine(true,v);paverLine(false,v)});

// 外圍樹林及山丘把邊界遮蔽。
const perimeterTrees = [
  [-55,-48],[-40,-57],[-22,-61],[0,-63],[22,-61],[40,-57],[55,-48],
  [-62,-28],[-64,0],[-62,28],[-55,48],[-40,57],[-22,61],[0,63],[22,61],[40,57],[55,48],
  [62,-28],[64,0],[62,28],[-42,-42],[-24,-47],[24,-47],[42,-42],[-47,-20],[-47,20],[47,-20],[47,20],[-42,42],[-24,47],[24,47],[42,42]
];
perimeterTrees.forEach((p,i)=>tree(p[0],p[1],1.15+(i%4)*.12));

for(let i=0;i<30;i++){
  const a=i/30*Math.PI*2;
  const r=58+(i%3)*5;
  shrub(Math.cos(a)*r,Math.sin(a)*r,1.25+(i%4)*.12,[0x4e9e5b,0x67b56d,0x3f8f50][i%3]);
}

const hillMat = new THREE.MeshStandardMaterial({color:0x659d68,roughness:1});
for(let i=0;i<18;i++){
  const a=i/18*Math.PI*2;
  const hill=new THREE.Mesh(new THREE.IcosahedronGeometry(7+(i%4)*1.6,2),hillMat);
  hill.position.set(Math.cos(a)*77,-1.5,Math.sin(a)*77);
  hill.scale.set(1.5,.72,1.1);
  hill.receiveShadow=true;
  scene.add(hill);
}

// 更大型及更清楚的公園地圖牌。
function largeMapBoard(x,z){
  const g=new THREE.Group();
  const wood=new THREE.MeshStandardMaterial({color:0x8e5a35,roughness:.9});
  [-1.75,1.75].forEach(px=>{
    const post=new THREE.Mesh(new THREE.BoxGeometry(.28,3.25,.28),wood);
    post.position.set(px,1.62,0);post.castShadow=true;g.add(post);
  });
  const roof=new THREE.Mesh(new THREE.BoxGeometry(4.7,.38,.65),new THREE.MeshStandardMaterial({color:0xa76a40,roughness:.9}));
  roof.position.set(0,3.38,0);roof.castShadow=true;g.add(roof);
  const board=new THREE.Mesh(new THREE.BoxGeometry(4.4,2.7,.18),new THREE.MeshStandardMaterial({color:0xf0dfb8,roughness:.9}));
  board.position.set(0,2.28,0);board.castShadow=true;g.add(board);
  const mapPanel=new THREE.Mesh(new THREE.PlaneGeometry(3.72,2.08),new THREE.MeshStandardMaterial({color:0xcdeab7,roughness:.8}));
  mapPanel.position.set(0,2.28,.105);g.add(mapPanel);
  const pathMat=new THREE.MeshStandardMaterial({color:0xe8d1aa,roughness:.9});
  const vPath=new THREE.Mesh(new THREE.BoxGeometry(.32,1.72,.03),pathMat);vPath.position.set(0,2.28,.13);g.add(vPath);
  const hPath=new THREE.Mesh(new THREE.BoxGeometry(3.05,.32,.03),pathMat);hPath.position.set(0,2.28,.13);g.add(hPath);
  const colors=[0xf1a83b,0xef78a7,0x54a9df,0x8c72df,0x6dbf65,0xffcf5b];
  const points=[[-1.25,2.78],[-.35,2.78],[1.12,2.66],[-1.25,1.78],[0,1.78],[1.2,1.82]];
  points.forEach((p,i)=>{
    const marker=new THREE.Mesh(new THREE.CircleGeometry(.14,18),new THREE.MeshStandardMaterial({color:colors[i],side:THREE.DoubleSide}));
    marker.position.set(p[0],p[1],.145);g.add(marker);
  });
  const youAreHere=new THREE.Mesh(new THREE.RingGeometry(.13,.23,20),new THREE.MeshStandardMaterial({color:0xe44343,side:THREE.DoubleSide}));
  youAreHere.position.set(.36,2.27,.15);g.add(youAreHere);
  g.position.set(x,0,z);g.rotation.y=-.55;scene.add(g);
  const sign=labelPlane('公園地圖',x,4.45,z,'#f9e8c6');sign.scale.set(.78,.78,.78);sign.userData.faceCamera=true;
}
largeMapBoard(35,24);

// 更多花圃、長椅、街燈及氣球。
[[-30,-6],[-30,8],[30,-7],[30,8],[-12,31],[12,31],[-12,-30],[12,-30],[-38,18],[38,18]].forEach((p,i)=>flowerPatch(p[0],p[1],13+(i%3)*3));
bench(-17,7,Math.PI/2);bench(17,7,-Math.PI/2);bench(-18,-7,Math.PI/2);bench(18,-7,-Math.PI/2);
lampPost(-17,-5);lampPost(17,-5);lampPost(-17,12);lampPost(17,12);lampPost(-32,0);lampPost(32,0);
balloonCluster(-28,24);balloonCluster(27,24);

// 漂浮雲朵。
const animatedClouds=[];
function makeCloud(x,y,z,s=1){
  const g=new THREE.Group();
  const mat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,transparent:true,opacity:.94});
  [[0,0,0,1],[-.85,-.08,.05,.72],[.85,-.06,0,.78],[-.2,.38,.02,.72],[.38,.34,.04,.62]].forEach(p=>{
    const m=new THREE.Mesh(new THREE.SphereGeometry(p[3],16,12),mat);
    m.position.set(p[0],p[1],p[2]);m.scale.set(1.28,.72,1);g.add(m);
  });
  g.position.set(x,y,z);g.scale.setScalar(s);g.userData.speed=.17+Math.random()*.12;scene.add(g);animatedClouds.push(g);
}
makeCloud(-30,18,-52,1.7);makeCloud(10,15,-60,1.2);makeCloud(42,20,-45,1.5);makeCloud(-48,22,25,1.25);

// 多隻蝴蝶在花圃及店舖附近飛行。
const butterflies=[];
function makeButterfly(x,y,z,color=0xff7aac){
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.026,.13,4,7),new THREE.MeshStandardMaterial({color:0x3b332d}));
  body.rotation.z=Math.PI/2;g.add(body);
  const wingMat=new THREE.MeshStandardMaterial({color,side:THREE.DoubleSide,roughness:.62});
  const left=new THREE.Mesh(new THREE.CircleGeometry(.15,16),wingMat);left.position.x=-.09;left.scale.set(1,.72,1);left.rotation.y=.45;g.add(left);
  const right=left.clone();right.position.x=.09;right.rotation.y=-.45;g.add(right);
  g.position.set(x,y,z);g.userData.wings=[left,right];g.userData.origin=new THREE.Vector3(x,y,z);g.userData.phase=Math.random()*Math.PI*2;scene.add(g);butterflies.push(g);
}
[
  [-8,1.1,4,0xff7aac],[7,1.25,7,0x8f75e8],[-12,1.3,-3,0xffd24d],[12,1.15,-1,0x65b9ff],
  [-24,1.5,20,0xff8ab8],[1,1.6,21,0x93d46d],[24,1.4,19,0xffd24d],[-29,1.2,-16,0xff8f5f],
  [0,1.45,-18,0x70c8ff],[29,1.35,-16,0xb789ff],[-35,1.6,8,0xffd260],[35,1.5,7,0x5edca3]
].forEach(b=>makeButterfly(...b));

// 小鳥遠景動畫。
const birds=[];
function makeBird(x,y,z,s=.55){
  const g=new THREE.Group();const mat=new THREE.MeshStandardMaterial({color:0x43596a,roughness:.8,side:THREE.DoubleSide});
  const l=new THREE.Mesh(new THREE.PlaneGeometry(.75,.20),mat);l.position.x=-.32;l.rotation.z=.15;g.add(l);
  const r=l.clone();r.position.x=.32;r.rotation.z=-.15;g.add(r);
  g.position.set(x,y,z);g.scale.setScalar(s);g.userData.wings=[l,r];g.userData.phase=Math.random()*6;g.userData.radius=13+Math.random()*5;scene.add(g);birds.push(g);
}
makeBird(0,15,-24,.70);makeBird(9,17,-31,.56);makeBird(-14,16,-28,.50);
