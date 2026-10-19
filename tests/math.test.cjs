const {test} = require('node:test');
const assert = require('node:assert/strict');
const M = require('../docs/assets/javascripts/math-core.js');
const near = (a,b,t=1e-12) => assert.ok(Math.abs(a-b)<t, `${a} != ${b}`);

test('Worked examples give 77 and 176 samples',()=>{
  assert.equal(M.finiteThreshold(.1,.05,100),77);
  assert.equal(M.rectThreshold(.1,.05),176);
});
test('Finite-class thresholds satisfy the given inequality and m-1 does not',()=>{
  for(const e of [.01,.07,.1,.3,.9])for(const d of [.001,.05,.2,.8])for(const n of [1,2,100,1e9]){
    const m=M.finiteThreshold(e,d,n);
    assert.ok(Math.log(n)-e*m<=Math.log(d)+1e-12);
    assert.ok(Math.log(n)-e*(m-1)>Math.log(d)-1e-12);
  }
});
test('Rectangle threshold is sufficient and minimal for its exponential certificate',()=>{
  for(const e of [.01,.1,.4,.9])for(const d of [.001,.05,.4]){
    const m=M.rectThreshold(e,d);
    assert.ok(Math.log(4)-e*m/4<=Math.log(d)+1e-12);
    assert.ok(Math.log(4)-e*(m-1)/4>Math.log(d)-1e-12);
  }
});
test('Probability bounds stay in range, decrease with m, and exact product is tighter',()=>{
  for(const e of [.01,.1,.7])for(let m=0;m<1000;m+=13){
    const a=M.rectBound(e,m),b=M.rectBound(e,m,true);
    assert.ok(0<=a&&a<=1);assert.ok(0<=b&&b<=1);assert.ok(b<=a+1e-14);
    assert.ok(M.rectBound(e,m+1)<=a);assert.ok(M.finiteBound(e,m+1,100)<=M.finiteBound(e,m,100));
  }
});
test('Invalid mathematical parameters are rejected',()=>{
  for(const e of [0,1,-.1,NaN,Infinity])assert.throws(()=>M.finiteThreshold(e,.05,10),RangeError);
  assert.throws(()=>M.finiteThreshold(.1,0,10),RangeError);
  assert.throws(()=>M.finiteThreshold(.1,.05,0),RangeError);
  assert.throws(()=>M.rectBound(.1,2.1),RangeError);
  assert.throws(()=>M.sample(1,-1),RangeError);
  assert.throws(()=>M.wilson(5,4),RangeError);
});
test('Random seed is reproducible and m-extension preserves the existing sample',()=>{
  assert.deepEqual(M.sample(30,42),M.sample(30,42));
  assert.deepEqual(M.sample(50,42).slice(0,30),M.sample(30,42));
  assert.notDeepEqual(M.sample(30,42),M.sample(30,43));
});
test('Empty positive set returns the null classifier',()=>{
  const s=[{x:0,y:0,label:0},{x:1,y:1,label:0}];
  assert.equal(M.fitRectangle(s),null);assert.equal(M.trainingRisk(null,s),0);
  near(M.uniformRisk(null),.42);
});
test('A singleton and collinear positives remain correctly classified',()=>{
  const one=[{x:.5,y:.5,label:1},{x:0,y:0,label:0}];
  assert.equal(M.trainingRisk(M.fitRectangle(one),one),0);
  const line=[{x:.5,y:.2,label:1},{x:.5,y:.8,label:1},{x:.2,y:.5,label:0}];
  assert.equal(M.trainingRisk(M.fitRectangle(line),line),0);assert.equal(M.area(M.fitRectangle(line)),0);
});
test('ERM has zero training error and remains inside the target over 200 seeds',()=>{
  for(let seed=0;seed<200;seed++){
    const s=M.sample(1+seed,seed),r=M.fitRectangle(s);
    assert.equal(M.trainingRisk(r,s),0);
    if(r){assert.ok(r.xmin>=M.target.xmin&&r.xmax<=M.target.xmax);assert.ok(r.ymin>=M.target.ymin&&r.ymax<=M.target.ymax);}
  }
});
test('Uniform true risk agrees with analytically known rectangles',()=>{
  near(M.uniformRisk(M.target),0);
  near(M.uniformRisk({xmin:.2,xmax:.6,ymin:.3,ymax:.7}),.42-.16);
  near(M.uniformRisk({xmin:0,xmax:1,ymin:0,ymax:1}),.58);
  near(M.uniformRisk({xmin:0,xmax:.1,ymin:0,ymax:.1}),.43);
  near(M.uniformRisk({xmin:-1,xmax:2,ymin:-1,ymax:2}),.58);
});
test('Coupled additional data cannot increase the true risk',()=>{
  for(let seed=0;seed<50;seed++){
    let previous=1;
    for(const m of [1,5,20,100,500]){const loss=M.uniformRisk(M.fitRectangle(M.sample(m,seed)));assert.ok(loss<=previous+1e-12);previous=loss;}
  }
});
test('Every uniform strip has epsilon/4 mass; small-target case bypasses strips',()=>{
  for(const e of [.01,.1,.4])for(const r of M.borderStrips(e))near(M.area(r),e/4);
  assert.deepEqual(M.borderStrips(.5),[]);
});
test('Four hits imply risk <= epsilon on deterministic constructions and sampled data',()=>{
  const s=[{x:.151,y:.5,label:1},{x:.849,y:.5,label:1},{x:.5,y:.201,label:1},{x:.5,y:.799,label:1}];
  for(const e of [.01,.1,.4]){
    assert.ok(M.borderStrips(e).every(r=>s.some(p=>M.contains(r,p))));
    assert.ok(M.uniformRisk(M.fitRectangle(s))<=e);
  }
  for(let seed=0;seed<300;seed++){
    const s=M.sample(120,seed),strips=M.borderStrips(.1);
    if(strips.every(r=>s.some(p=>M.contains(r,p))))assert.ok(M.uniformRisk(M.fitRectangle(s))<=.1+1e-12);
  }
});
test('All 16 labelings of the four-point diamond are realizable',()=>{
  const points=[{x:0,y:1},{x:1,y:0},{x:0,y:-1},{x:-1,y:0}];
  for(let mask=0;mask<16;mask++)assert.ok(M.labelRealizable(points,points.map((p,i)=>(mask>>i)&1)).possible);
});
test('Extremal construction excludes shattering of arbitrary five points, including ties',()=>{
  const random=M.rng(14);
  for(let trial=0;trial<200;trial++){
    const points=[];
    while(points.length<5){const p={x:Math.floor(random()*5),y:Math.floor(random()*5)};if(!points.some(q=>q.x===p.x&&q.y===p.y))points.push(p);}
    const extrema=new Set();
    for(const key of ['x','y'])for(const sign of [-1,1]){let best=0;for(let i=1;i<5;i++)if(sign*points[i][key]>sign*points[best][key])best=i;extrema.add(best);}
    assert.ok(extrema.size<=4);
    assert.equal(M.labelRealizable(points,points.map((p,i)=>+extrema.has(i))).possible,false);
  }
});
test('Wilson interval retains uncertainty with zero observed failures',()=>{
  const [low,high]=M.wilson(0,500);near(low,0);assert.ok(high>0&&high<.01);
  const [l,h]=M.wilson(250,500);assert.ok(l<.5&&h>.5);near(l,1-h);
});
test('Monte Carlo is repeatable and m=0 produces all failures for epsilon < target mass',()=>{
  const a=M.simulate(.1,40,100,3),b=M.simulate(.1,40,100,3);assert.deepEqual(a,b);
  const zero=M.simulate(.1,0,100,4);assert.equal(zero.failures,100);
  const trivial=M.simulate(.5,0,100,4);assert.equal(trivial.failures,0);
});
test('Large deterministic Monte Carlo run is consistent with the theorem',()=>{
  const m=M.rectThreshold(.1,.05),r=M.simulate(.1,m,1000,2026);
  assert.ok(r.estimate<=.05);assert.ok(r.interval[1]<M.rectBound(.1,m));
});
