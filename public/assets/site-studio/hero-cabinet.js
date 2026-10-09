/* Hero: live cabinet wall — interactive finish picker. Piets Technology Solutions Inc · 631-871-5957 */
(function (g) {
  'use strict';
  var H = g.PietsHeroes; var A = {"css": ".hcard .sc-wall{position:absolute;right:6%;top:12%;width:88%;height:80%;transform-style:preserve-3d;--fin:#ece8e1;--fd:rgba(0,0,0,.3);--fl:rgba(255,255,255,.35)}\n.hcard .sc-glow{position:absolute;inset:-6% -8%;background:radial-gradient(60% 50% at 50% 38%,rgba(255,214,150,.2),transparent 70%);opacity:0;transition:opacity 1.2s}\n.hcard .sc-wall.lit .sc-glow{opacity:1}\n.hcard .sc-up{position:absolute;left:0;right:0;top:0;height:35%;display:flex;gap:1.1%;transform-style:preserve-3d}\n.hcard .sc-crown{position:absolute;left:-1.2%;right:-1.2%;top:-3.6%;height:3.6%;background:linear-gradient(rgba(255,255,255,.2),rgba(0,0,0,.3)),var(--fin);transition:background-color .9s;box-shadow:0 6px 14px rgba(0,0,0,.4)}\n.hcard .sc-u{flex:1;position:relative;transform-style:preserve-3d}\n.hcard .sc-int{position:absolute;inset:0;background:\n  linear-gradient(#e0c28e,#e0c28e) 14% 30%/16% 20% no-repeat,\n  linear-gradient(#8e5a38,#8e5a38) 40% 25%/11% 25% no-repeat,\n  linear-gradient(#efe6d6,#efe6d6) 62% 36%/17% 14% no-repeat,\n  linear-gradient(#9fb2c4,#9fb2c4) 22% 71%/13% 20% no-repeat,\n  linear-gradient(#d4b078,#d4b078) 52% 74%/20% 17% no-repeat,\n  linear-gradient(#6b8a6a,#6b8a6a) 78% 70%/10% 21% no-repeat,\n  repeating-linear-gradient(transparent 0 47%,rgba(255,255,255,.16) 47% 50%),\n  linear-gradient(#2a1c10,#120a05);\n  box-shadow:inset 0 0 0 3px var(--fin),inset 0 -10px 22px rgba(0,0,0,.6);transition:filter 1s;filter:brightness(.55)}\n.hcard .sc-wall.lit .sc-int{filter:brightness(1.12)}\n.hcard .sc-int::after{content:\"\";position:absolute;left:3px;right:3px;top:3px;height:6%;background:linear-gradient(#fff3d6,rgba(255,236,190,0));opacity:0;transition:opacity 1s}\n.hcard .sc-wall.lit .sc-int::after{opacity:1}\n.hcard .sc-door{position:absolute;inset:0;background:var(--fin);border:1px solid var(--fd);transform-origin:left center;transition:transform 1.05s cubic-bezier(.6,.05,.2,1),background-color .9s;box-shadow:0 10px 24px rgba(0,0,0,.4)}\n.hcard .sc-door::before{content:\"\";position:absolute;inset:9%;border:2px solid var(--fd);box-shadow:inset 0 0 0 1px var(--fl)}\n.hcard .sc-door::after{content:\"\";position:absolute;bottom:8%;right:12%;width:9px;height:9px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f6dcae,#a0732f);box-shadow:0 2px 3px rgba(0,0,0,.5)}\n.hcard .sc-u:nth-child(even) .sc-door{transform-origin:right center}\n.hcard .sc-u:nth-child(even) .sc-door::after{right:auto;left:12%}\n.hcard .sc-u.open .sc-door{transform:rotateY(-82deg)}\n.hcard .sc-u:nth-child(even).open .sc-door{transform:rotateY(82deg)}\n.hcard .sc-splash{position:absolute;left:0;right:0;top:35.5%;height:6.5%;background:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3.2%),linear-gradient(#1a1410,#120d09)}\n.hcard .sc-ct{position:absolute;left:-1.6%;right:-1.6%;top:42%;height:4.4%;background:linear-gradient(#4a413b,#251e19);border-bottom:2px solid #000;box-shadow:0 14px 26px rgba(0,0,0,.5)}\n.hcard .sc-lo{position:absolute;left:0;right:0;top:46.8%;height:47%;display:flex;gap:1.1%;transform-style:preserve-3d}\n.hcard .sc-b{flex:1;position:relative;display:flex;flex-direction:column;gap:2.2%;transform-style:preserve-3d}\n.hcard .sc-dw{flex:1;background:var(--fin);border:1px solid var(--fd);position:relative;transition:transform .95s cubic-bezier(.3,.7,.2,1),box-shadow .95s,background-color .9s}\n.hcard .sc-dw.sm{flex:.34}\n.hcard .sc-dw::before{content:\"\";position:absolute;inset:11%;border:2px solid var(--fd);box-shadow:inset 0 0 0 1px var(--fl)}\n.hcard .sc-dw::after{content:\"\";position:absolute;left:36%;right:36%;top:16%;height:4px;border-radius:2px;background:linear-gradient(#f6dcae,#a0732f);box-shadow:0 2px 3px rgba(0,0,0,.45)}\n.hcard .sc-dw.out{transform:translateZ(110px) translateY(7%);box-shadow:0 34px 44px -12px rgba(0,0,0,.75),0 0 0 1px rgba(240,200,140,.3)}\n.hcard .sc-toe{position:absolute;left:0;right:0;top:94.2%;height:5%;background:#08050a}\n\n.hcard .cbx{position:relative;aspect-ratio:16/10;overflow:hidden;perspective:1700px;perspective-origin:50% 42%;background:radial-gradient(70% 60% at 50% 35%,rgba(201,133,79,.25),transparent 70%),linear-gradient(#1a130c,#0c0906 70%)}\n.hcard .cbx:before{content:\"\";position:absolute;left:0;right:0;bottom:0;height:9%;background:linear-gradient(#3a2a1c,#20160e);border-top:1px solid #4a3522}\n.hcard .cbx .cfloor{position:absolute;left:0;right:0;bottom:0;height:9%;background:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 12%)}\n.hcard .cbx .clab{position:absolute;left:12px;top:10px;font:600 .6rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:#e0aa78;background:rgba(12,9,6,.7);border:1px solid #54402c;padding:5px 9px;border-radius:4px;z-index:3}\n.hcard .cbx .cdim{position:absolute;left:6%;right:6%;top:5%;height:1px;background:#e0aa78;opacity:.5;z-index:2}\n.hcard .cbx .cdim:before,.hcard .cbx .cdim:after{content:\"\";position:absolute;top:-4px;width:1px;height:9px;background:#e0aa78}.hcard .cbx .cdim:before{left:0}.hcard .cbx .cdim:after{right:0}\n.hcard .cbx .cdim span{position:absolute;left:50%;top:-8px;transform:translateX(-50%);font:600 .55rem var(--mono);letter-spacing:.12em;color:#e0aa78;background:#130d08;padding:0 6px}\n"};
  var HF = [['oxblood', 'Oxblood', '#6e2b24'], ['slate', 'Slate blue', '#5b7590'], ['white', 'White', '#ece8e1'], ['oak', 'Natural oak', '#b98f5e'], ['char', 'Charcoal', '#2f3338']];
  H.list.cabinet = {
    css: A.css,
    build: function (c) {
      var up = '', lo = '';
      for (var i = 0; i < 5; i++) {
        up += '<div class="sc-u"><div class="sc-int"></div><div class="sc-door"></div></div>';
        lo += '<div class="sc-b"><div class="sc-dw sm"></div><div class="sc-dw"' + (i % 2 ? ' style="flex:1.4"' : '') + '></div>' + (i % 2 ? '' : '<div class="sc-dw"></div>') + '</div>';
      }
      return {
        title: 'Live build · ' + c.biz, status: 'Oxblood finish',
        stage: '<div class="cbx"><span class="clab">Kitchen wall · elevation A</span><div class="cdim"><span>12’-6”</span></div><div class="sc-wall" id="wall"><div class="sc-glow"></div><div class="sc-crown"></div><div class="sc-up">' + up + '</div><div class="sc-splash"></div><div class="sc-ct"></div><div class="sc-lo">' + lo + '</div><div class="sc-toe"></div></div><div class="cfloor"></div></div>',
        gauges: [['run', 'Wall run', '12.5', 'FT'], ['boxes', 'Cabinets', '10', 'BOXES'], ['soft', 'Soft-close', '100', '%'], ['fin', 'Finish', 'Oxblood', '']],
        dock: HF.map(function (f) { return [f[0], f[1], '<circle cx="12" cy="12" r="8" fill="' + f[2] + '" stroke="#e0aa78"/>']; }),
        dockOn: 0, dockLabel: 'Preview a finish',
        msg: '<b>Doors open, drawers glide, finish changes.</b> Tap a color to see your kitchen in it.',
        data: { HF: HF, biz: c.biz }
      };
    },
    run: function (root, D, K) {
      var wall = root.querySelector('#wall'), ups = [].slice.call(wall.querySelectorAll('.sc-u')), cols = [].slice.call(wall.querySelectorAll('.sc-b')), fi = 0, held = 0;
      function lum(h) { var n = parseInt(h.slice(1), 16); return ((n >> 16 & 255) * .299 + (n >> 8 & 255) * .587 + (n & 255) * .114) / 255; }
      function setFin(i, user) {
        fi = i; var f = D.HF[i], lt = lum(f[2]) > .55;
        wall.style.setProperty('--fin', f[2]); wall.style.setProperty('--fd', lt ? 'rgba(0,0,0,.3)' : 'rgba(0,0,0,.45)'); wall.style.setProperty('--fl', lt ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.2)');
        K.status(f[1] + ' finish'); K.gauge('fin', f[1]); K.press('data-k', f[0]);
        if (user) { held = Date.now(); K.say('<b>' + f[1] + '.</b> Shaker doors, soft-close hinges and full-extension drawers. ' + D.biz + ' brings real samples to your kitchen.', 'Kitchen'); }
      }
      K.onDock(function (k) { for (var i = 0; i < D.HF.length; i++) if (D.HF[i][0] === k) setFin(i, true); });
      setFin(0);
      if (K.reduced) { wall.classList.add('lit'); ups.forEach(function (u, i) { if (i % 2 === 0) u.classList.add('open'); }); return; }
      var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
      (async function loop() {
        await sleep(900);
        for (;;) {
          wall.classList.add('lit');
          for (var a = 0; a < ups.length; a++) { ups[a].classList.add('open'); await sleep(230); }
          await sleep(450);
          for (var b = 0; b < cols.length; b++) { [].slice.call(cols[b].children).forEach(function (d, k) { setTimeout(function () { d.classList.add('out'); }, k * 120); }); await sleep(150); }
          await sleep(2900);
          for (var c = 0; c < cols.length; c++) { [].slice.call(cols[c].children).forEach(function (d) { d.classList.remove('out'); }); await sleep(90); }
          await sleep(500);
          for (var e = 0; e < ups.length; e++) { ups[e].classList.remove('open'); await sleep(140); }
          await sleep(700); wall.classList.remove('lit'); await sleep(500);
          if (Date.now() - held > 12000) setFin((fi + 1) % D.HF.length);
          await sleep(1700);
        }
      })();
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
