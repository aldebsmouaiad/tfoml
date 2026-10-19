const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM,VirtualConsole} = require('jsdom');
const project=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(project,p),'utf8');
const tick=ms=>new Promise(r=>setTimeout(r,ms));
async function load(file){
  const errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(read('site/'+file),{url:'https://example.test/tfoml/'+file,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
  dom.window.eval(read('docs/assets/javascripts/math-core.js'));
  dom.window.eval(read('docs/assets/javascripts/learning.js'));
  await tick(20);
  return {dom,doc:dom.window.document,errors};
}
function input(dom,root,key,value){const el=root.querySelector('[data-role="'+key+'"]');el.value=value;el.dispatchEvent(new dom.window.Event('input',{bubbles:true}));}
const role=(root,key)=>root.querySelector('[data-role="'+key+'"]');

test('Finite lab updates certificate and handles invalid input; proof and feedback are usable',async()=>{
  const {dom,doc,errors}=await load('blatt-01/aufgabe-1.html');
  try{
    const lab=doc.querySelector('[data-tf-lab=finite]');
    assert.equal(role(lab,'minimum').textContent,'77');
    role(lab,'use').click();assert.equal(role(lab,'m').value,'77');assert.match(role(lab,'status').textContent,/erfüllt/);
    input(dom,lab,'epsilon',.05);assert.equal(role(lab,'minimum').textContent,'153');
    input(dom,lab,'size',0);assert.match(role(lab,'status').textContent,/eingeben/);
    role(lab,'reset').click();assert.equal(role(lab,'minimum').textContent,'77');
    assert.ok(role(lab,'chart').querySelector('svg'));
    const proof=doc.querySelector('.tf-proof');proof.querySelector('[data-next]').click();assert.equal(proof.querySelectorAll('details[open]').length,1);
    proof.querySelector('[data-all]').click();assert.equal(proof.querySelectorAll('details[open]').length,5);
    proof.querySelector('[data-hide]').click();assert.equal(proof.querySelectorAll('details[open]').length,0);
    doc.querySelector('.tf-quiz [data-correct=true]').click();assert.match(doc.querySelector('.feedback').textContent,/Richtig/);
    const progress=doc.querySelector('[data-progress]');progress.click();assert.equal(dom.window.localStorage.getItem('tfoml.progress.sheet01-ex1'),'done');
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
test('Geometry handles changing sample size, seed validation and the trivial mass case',async()=>{
  const {dom,doc,errors}=await load('blatt-01/aufgabe-2.html');
  try{
    const lab=doc.querySelector('[data-tf-lab=rectangles]');
    assert.equal(role(lab,'training').textContent,'0 %');assert.ok(role(lab,'geometry').querySelector('svg'));
    const before=role(lab,'geometry').innerHTML;role(lab,'new').click();assert.notEqual(role(lab,'geometry').innerHTML,before);
    input(dom,lab,'seed','');assert.match(role(lab,'status').textContent,/Seed/);
    input(dom,lab,'seed',42);input(dom,lab,'epsilon',.5);assert.match(role(lab,'status').textContent,/Zielmasse/);assert.equal(role(lab,'hits').children.length,0);
    role(lab,'reset').click();assert.equal(role(lab,'seed').value,'42');assert.equal(role(lab,'hits').children.length,4);
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
test('PAC simulation reports intervals and clears stale results after parameters change',async()=>{
  const {dom,doc}=await load('blatt-01/aufgabe-2.html');
  try{
    const lab=doc.querySelector('[data-tf-lab=pac]');
    assert.equal(role(lab,'minimum').textContent,'176');
    role(lab,'run').click();await tick(100);
    assert.match(role(lab,'simulation-status').textContent,/500 Stichproben/);assert.match(role(lab,'simulation-status').textContent,/95-%-Intervall/);
    assert.notEqual(role(lab,'estimate').textContent,'–');
    input(dom,lab,'m',100);assert.equal(role(lab,'estimate').textContent,'–');assert.match(role(lab,'simulation-status').textContent,/neu starten/);
    role(lab,'use').click();assert.equal(role(lab,'m').value,'176');assert.match(role(lab,'status').textContent,/erfüllt/);
    input(dom,lab,'seed',-1);role(lab,'run').click();assert.match(role(lab,'status').textContent,/Seed/);
  }finally{dom.window.close();}
});
test('VC lab explores all 16 masks and the fifth-point obstruction',async()=>{
  const {dom,doc}=await load('blatt-01/vc-dimension.html');
  try{
    const lab=doc.querySelector('[data-tf-lab=vc]');
    for(let i=0;i<16;i++){assert.match(role(lab,'status').textContent,/realisierbar/);assert.doesNotMatch(role(lab,'status').textContent,/Nicht/);role(lab,'next').click();}
    assert.match(role(lab,'count').textContent,/16 von 16/);
    role(lab,'five').click();assert.match(role(lab,'status').textContent,/Nicht realisierbar/);
    role(lab,'buttons').querySelector('[data-point="4"]').click();assert.doesNotMatch(role(lab,'status').textContent,/Nicht/);
  }finally{dom.window.close();}
});
test('Bundled MathJax parses and renders the complete written mathematics without errors',async()=>{
  const files=fs.readdirSync(path.join(project,'site'),{recursive:true}).filter(file=>file.endsWith('.html'));
  let total=0;
  for(const file of files){
    const dom=new JSDOM(read('site/'+file),{url:'https://example.test/tfoml/'+file,runScripts:'outside-only',pretendToBeVisual:true});
    try{
      const expected=dom.window.document.querySelectorAll('.arithmatex').length;total+=expected;
      dom.window.eval(read('docs/assets/javascripts/mathjax-config.js'));
      dom.window.eval(read('docs/assets/vendor/mathjax/tex-svg.js'));
      await dom.window.MathJax.startup.promise;
      assert.equal(dom.window.document.querySelectorAll('mjx-container').length,expected, file);
      assert.equal(dom.window.document.querySelectorAll('[data-mml-node="merror"]').length,0,file);
      assert.equal(dom.window.document.querySelectorAll('mjx-merror').length,0,file);
    }finally{dom.window.close();}
  }
  assert.ok(total>100,'Expected more than 100 mathematical expressions.');
});
