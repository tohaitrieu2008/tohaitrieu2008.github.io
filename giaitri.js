const INIT_BALANCE = 50000000;

let balance = INIT_BALANCE;
let pick = null;
let history = [];
let round = 0;
let forcedLoss = false;

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const evenBtn = document.getElementById("pick-even");
const oddBtn = document.getElementById("pick-odd");
const spinBtn = document.getElementById("spin");
const resetBtn = document.getElementById("reset");
const coins = document.querySelectorAll(".coin");
const resultText = document.getElementById("kqText");
const msg = document.getElementById("msg");
const warn = document.getElementById("warn");
const tableBody = document.querySelector("#historyTable tbody");

function money(n) {
    return n.toLocaleString("vi-VN") + " VND";
}

function updateBalance() {
    balanceEl.textContent = money(balance);
}

function setPick(value) {
    pick = value;
    evenBtn.classList.toggle("active", value === "Chẵn");
    oddBtn.classList.toggle("active", value === "Lẻ");
}

evenBtn.onclick = function () {
    setPick("Chẵn");
};

oddBtn.onclick = function () {
    setPick("Lẻ");
};

function randomCoin() {
    return Math.random() < 0.5 ? 0 : 1;
}

function spin() {
    const bet = Number(betEl.value);

    if (!bet || bet <= 0) {
        alert("Vui lòng nhập số tiền cược hợp lệ!");
        return;
    }

    if (bet > balance) {
        alert("Số tiền cược vượt quá số dư hiện có!");
        return;
    }

    if (pick === null) {
        alert("Vui lòng chọn CHẴN hoặc LẺ!");
        return;
    }

    const arr = [];
    for (let i = 0; i < 4; i++) {
        arr.push(randomCoin());
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    let kq = sum % 2 === 0 ? "Chẵn" : "Lẻ";

    if (balance >= INIT_BALANCE * 1.35) {
        forcedLoss = true;
        warn.style.display = "block";
    }

    if (forcedLoss && kq === pick) {
        const idx = Math.floor(Math.random() * 4);
        arr[idx] = arr[idx] === 1 ? 0 : 1;

        sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }

        kq = sum % 2 === 0 ? "Chẵn" : "Lẻ";
    }

    for (let i = 0; i < coins.length; i++) {
        coins[i].className = "coin hidden";
        coins[i].textContent = "⚪";

        (function (index) {
            setTimeout(function () {
                coins[index].classList.remove("hidden");

                if (arr[index] === 1) {
                    coins[index].classList.add("red");
                    coins[index].textContent = "🔴";
                } else {
                    coins[index].classList.add("white");
                    coins[index].textContent = "⚪";
                }
            }, index * 500);
        })(i);
    }

    setTimeout(function () {
        if (kq === pick && !forcedLoss) {
            balance += bet;
            resultText.textContent = "THẮNG (" + kq + ")";
            msg.textContent = "Chúc mừng bạn đã thắng!";
        } else {
            balance -= bet;
            resultText.textContent = "THUA (" + kq + ")";
            msg.textContent = forcedLoss && kq !== pick
                ? "Hệ thống đã can thiệp — Bạn thua!"
                : "Bạn đã thua!";
        }

        round++;
        history.push({
            round: round,
            bet: bet,
            pick: pick,
            kq: kq,
            balance: balance
        });

        updateBalance();
        renderHistory();

        if (balance <= 0) {
            alert("Bạn đã hết tiền! Vui lòng Reset để chơi lại.");
        }
    }, 2500);
}

function renderHistory() {
    tableBody.innerHTML = "";

    for (let i = 0; i < history.length; i++) {
        const h = history[i];
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = i + 1;

        const td2 = document.createElement("td");
        td2.textContent = h.bet.toLocaleString();

        const td3 = document.createElement("td");
        td3.textContent = h.pick;

        const td4 = document.createElement("td");
        td4.textContent = h.kq;

        const td5 = document.createElement("td");
        td5.textContent = h.balance.toLocaleString();

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tableBody.appendChild(tr);
    }
}

spinBtn.onclick = spin;

resetBtn.onclick = function () {
    if (confirm("Bạn có chắc muốn Reset trò chơi?")) {
        location.reload();
    }
};

updateBalance();