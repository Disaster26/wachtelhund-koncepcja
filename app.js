(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  var tk=false;function sc(){if(tk)return;tk=true;requestAnimationFrame(function(){top.classList.toggle('sc',window.pageYOffset>8);if(window.pageYOffset<innerHeight*.5)links.forEach(function(l){l.classList.remove('on')});tk=false})}addEventListener('scroll',sc,{passive:true});
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});
    var mapa=document.getElementById('mapa');
    var mo=new IntersectionObserver(function(es){if(es[0].isIntersecting){var f=document.createElement('iframe');f.src=mapa.dataset.src;f.title='Mapa dojazdu: ul. Łabędzia 33, Mrągowo';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(f);mo.disconnect()}},{rootMargin:'400px'});
    mo.observe(mapa);
  }
  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var down=false,sx=0,sl=0,moved=false;
    function step(){var k=tor.children[0];return k?k.getBoundingClientRect().width+10:300}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||tor.scrollWidth<=tor.clientWidth+2)return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;tor.classList.remove('drag')});
    tor.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('[data-nav="'+tor.id+'"]');
    function upd(){if(!nav)return;nav.style.visibility=tor.scrollWidth>tor.clientWidth+2?'visible':'hidden'}
    if(nav)nav.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:step()*(+b.dataset.k),behavior:'smooth'})})});
    addEventListener('load',function(){requestAnimationFrame(upd)});addEventListener('resize',upd);
  });
  /* lightbox */
  var lb=document.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p'),grupa=[],idx=0,ost=null;
  function pokaz(i){idx=(i+grupa.length)%grupa.length;var f=grupa[idx],im=f.querySelector('img');li.src=im.currentSrc||im.src;li.alt=im.alt;lp.textContent=(f.dataset.lb||'')+'  ('+(idx+1)+'/'+grupa.length+')'}
  function otworz(f){var r=f.closest('[data-tor],.fotki,.fotcol')||document.body;grupa=[].slice.call(r.querySelectorAll('[data-lb]'));ost=document.activeElement;pokaz(grupa.indexOf(f));lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('.x').focus()}
  function zam(){lb.classList.remove('open');document.body.style.overflow='';if(ost)ost.focus()}
  document.querySelectorAll('[data-lb]').forEach(function(f){f.tabIndex=0;f.setAttribute('role','button');f.addEventListener('click',function(){otworz(f)});f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();otworz(f)}})});
  lb.querySelector('.x').addEventListener('click',zam);
  lb.querySelector('.pv').addEventListener('click',function(){pokaz(idx-1)});
  lb.querySelector('.nx').addEventListener('click',function(){pokaz(idx+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)zam()});
  var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)pokaz(idx+(d<0?1:-1))});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){zamknij();if(lb.classList.contains('open'))zam()}if(lb.classList.contains('open')){if(e.key==='ArrowRight')pokaz(idx+1);if(e.key==='ArrowLeft')pokaz(idx-1)}});
  var f=document.getElementById('form'),msg=document.getElementById('msg');
  f.addEventListener('submit',function(e){e.preventDefault();var ok=true;[].forEach.call(f.querySelectorAll('[required]'),function(i){var v=i.type==='checkbox'?(i.checked?'1':''):i.value.trim();var bad=!v||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));i.setAttribute('aria-invalid',bad);if(bad&&ok){ok=false;i.focus()}});if(!ok)return;msg.hidden=false;f.reset();msg.scrollIntoView({block:'nearest',behavior:'smooth'})});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
