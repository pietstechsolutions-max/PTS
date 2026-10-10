/* Piets calculators — statement effective-rate check and equipment payment estimator.
   Both run on numbers the visitor types in. Nothing is saved and nothing is sent.
   Neither one is an offer, a quote or a rate. Piets Technology Solutions Inc · 631-871-5957
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";

  function money(v) {
    if (!isFinite(v) || !v) return "\u2014";
    return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function num(el) {
    if (!el) return 0;
    var v = parseFloat(String(el.value).replace(/[^0-9.\-]/g, ""));
    return isNaN(v) ? 0 : v;
  }

  /* ---------------- 1. Effective rate from your own statement ---------------- */
  (function () {
    var root = document.getElementById("rateCheck");
    if (!root) return;

    root.innerHTML =
      '<div class="calc">' +
        '<div class="calcf">' +
          '<div class="f"><label for="rcVol">Card volume last month</label>' +
            '<div class="inp"><span>$</span><input type="number" id="rcVol" value="" placeholder="0" min="0" step="100" inputmode="decimal"></div>' +
            '<span class="hint">The total your customers paid you by card &mdash; the deposits line, before fees.</span></div>' +
          '<div class="f"><label for="rcFees">Total fees on that statement</label>' +
            '<div class="inp"><span>$</span><input type="number" id="rcFees" value="" placeholder="0" min="0" step="1" inputmode="decimal"></div>' +
            '<span class="hint">Every line: discount rate, per-item, monthly, PCI, statement, gateway, batch. All of it.</span></div>' +
          '<div class="f"><label for="rcTx">Number of card transactions</label>' +
            '<div class="inp"><span>#</span><input type="number" id="rcTx" value="" placeholder="0" min="0" step="1" inputmode="numeric"></div>' +
            '<span class="hint">Optional. It tells you what each swipe actually costs you.</span></div>' +
        '</div>' +
        '<div class="calcout">' +
          '<span class="cap">Your effective rate</span>' +
          '<div class="big" id="rcRate">&mdash;</div>' +
          '<div class="l"><span>Cost per transaction</span><b id="rcPer">&mdash;</b></div>' +
          '<div class="l"><span>Fees per year at this volume</span><b id="rcYear">&mdash;</b></div>' +
          '<p class="dis">This is just your own arithmetic: fees divided by volume. It is not a quote and not a ' +
          'promise of anything. Bring the actual statement &mdash; all pages &mdash; and Piets will read it line by ' +
          'line with you and tell you straight whether it is worth moving.</p>' +
        '</div>' +
      '</div>';

    function run() {
      var vol = num(document.getElementById("rcVol"));
      var fees = num(document.getElementById("rcFees"));
      var tx = num(document.getElementById("rcTx"));
      var rate = vol > 0 ? (fees / vol) * 100 : 0;
      document.getElementById("rcRate").textContent = vol > 0 ? rate.toFixed(2) + "%" : "—";
      document.getElementById("rcPer").textContent = tx > 0 ? money(fees / tx) : "—";
      document.getElementById("rcYear").textContent = fees > 0 ? money(fees * 12) : "—";
    }
    root.addEventListener("input", run);
    run();
  })();

  /* ---------------- 2. Equipment payment estimator ---------------- */
  (function () {
    var root = document.getElementById("finCalc");
    if (!root) return;

    var terms = [24, 36, 48, 60];
    var state = { term: 36 };

    root.innerHTML =
      '<div class="calc">' +
        '<div class="calcf">' +
          '<div class="f"><label for="fcAmt">Amount you want to finance</label>' +
            '<div class="inp"><span>$</span><input type="number" id="fcAmt" value="" placeholder="0" min="0" step="100" inputmode="decimal"></div>' +
            '<span class="hint">The quoted job total &mdash; equipment, wire and labour together.</span></div>' +
          '<div class="f"><label id="fcTermLbl">Term</label>' +
            '<div class="mseg" role="group" aria-labelledby="fcTermLbl">' +
              terms.map(function (t) {
                return '<button type="button" data-term="' + t + '" aria-pressed="' + (t === state.term) + '">' +
                  t + ' months</button>';
              }).join("") +
            '</div></div>' +
          '<div class="f"><label for="fcApr">Annual rate the lender quoted you</label>' +
            '<div class="inp"><input type="number" id="fcApr" value="" placeholder="0" min="0" max="40" step="0.1" inputmode="decimal"><span>%</span></div>' +
            '<span class="hint">Put in the number from your own approval. Piets does not set this and cannot ' +
            'promise it &mdash; leave it alone and the figure below is only a shape, not an offer.</span></div>' +
        '</div>' +
        '<div class="calcout">' +
          '<span class="cap">Estimated monthly payment</span>' +
          '<div class="big" id="fcPay">&mdash;</div>' +
          '<div class="l"><span>Term</span><b id="fcTermOut">36 months</b></div>' +
          '<div class="l"><span>Total of payments</span><b id="fcTot">&mdash;</b></div>' +
          '<div class="l"><span>Cost of financing</span><b id="fcInt">&mdash;</b></div>' +
          '<p class="dis">A calculator, not an offer of credit. Piets Technology Solutions is not a lender and ' +
          'does not approve, decline or price financing. Equipment financing is provided by third-party lenders, ' +
          'and every term &mdash; rate, length, deposit, fees &mdash; comes from them after their own review. ' +
          'Use this to picture a monthly number, then get the real terms in writing from the lender.</p>' +
        '</div>' +
      '</div>';

    function run() {
      var p = num(document.getElementById("fcAmt"));
      var apr = num(document.getElementById("fcApr")) / 100;
      var n = state.term;
      var pay;
      if (p <= 0 || n <= 0) { pay = 0; }
      else if (apr <= 0) { pay = p / n; }
      else {
        var i = apr / 12;
        pay = p * i / (1 - Math.pow(1 + i, -n));
      }
      var total = pay * n;
      document.getElementById("fcPay").textContent = pay > 0 ? money(pay) : "—";
      document.getElementById("fcTermOut").textContent = n + " months";
      document.getElementById("fcTot").textContent = total > 0 ? money(total) : "—";
      document.getElementById("fcInt").textContent = total > 0 ? money(Math.max(0, total - p)) : "—";
    }

    root.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-term]") : null;
      if (!b || !root.contains(b)) return;
      state.term = +b.getAttribute("data-term");
      root.querySelectorAll("[data-term]").forEach(function (x) {
        x.setAttribute("aria-pressed", String(+x.getAttribute("data-term") === state.term));
      });
      run();
    });
    root.addEventListener("input", run);
    run();
  })();
})();
