'use strict';

// P2 大型公園版本：新增水果店及文具店，並重新配置六間店舖。
Object.assign(PRODUCTS, {
  fruit: [
    {id:'apple', name:'蘋果', emoji:'🍎', price:420},
    {id:'banana', name:'香蕉', emoji:'🍌', price:360},
    {id:'orange', name:'橙', emoji:'🍊', price:390},
    {id:'grapes', name:'提子', emoji:'🍇', price:760},
    {id:'pear', name:'啤梨', emoji:'🍐', price:440},
    {id:'watermelon', name:'西瓜片', emoji:'🍉', price:580}
  ],
  stationery: [
    {id:'pencil', name:'鉛筆', emoji:'✏️', price:320},
    {id:'eraser', name:'擦膠', emoji:'🧽', price:210},
    {id:'ruler', name:'間尺', emoji:'📏', price:470},
    {id:'notebook', name:'記事簿', emoji:'📓', price:650},
    {id:'crayons', name:'蠟筆', emoji:'🖍️', price:880},
    {id:'glue', name:'膠水', emoji:'🧴', price:540}
  ]
});

SHOP_INFO.snack.pos.set(-24,0,-18);
SHOP_INFO.toy.pos.set(0,0,-20);
SHOP_INFO.drink.pos.set(24,0,-18);
SHOP_INFO.balloon.pos.set(-24,0,20);
Object.assign(SHOP_INFO, {
  fruit:{name:'水果店',emoji:'🍎',color:0x6dbf65,pos:new THREE.Vector3(0,0,22)},
  stationery:{name:'文具店',emoji:'✏️',color:0xffcf5b,pos:new THREE.Vector3(24,0,20)}
});

for (const p of [...PRODUCTS.fruit, ...PRODUCTS.stationery]) {
  byId[p.id] = p;
}
PRODUCTS.fruit.forEach(p => productShop[p.id] = 'fruit');
PRODUCTS.stationery.forEach(p => productShop[p.id] = 'stationery');

MISSIONS.splice(0, MISSIONS.length,
  ['chips','juice'],
  ['cookies','redBalloon'],
  ['candy','water','blueBalloon'],
  ['seaweed','milk'],
  ['apple','juice'],
  ['pencil','eraser'],
  ['teddy','juice'],
  ['ball','tea','chips'],
  ['dino','starBalloon'],
  ['car','soy','cookies'],
  ['blocks','heartBalloon','water'],
  ['grapes','notebook'],
  ['ruler','watermelon'],
  ['robot','animalBalloon','cocoa']
);
