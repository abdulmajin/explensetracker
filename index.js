const expenseListEl = document.getElementById("expenseListEl");
let itemCount = document.getElementById("itemCount");
let sortEl = document.getElementById("sortEl");
const totalExpenseEl = document.getElementById("totalExpense");
let me = [];

let expense = [];
function clearLocal() {
  localStorage.removeItem("expense");
  expense = [];
  itemCount.innerHTML = "0";
  loadExpenseDB();
  renderIntial();
}
const wipeLocalrage = document.getElementById("wipeLocalrage");
wipeLocalrage.addEventListener("click", clearLocal);

let selected = () => {
  const selectval = sortEl.value;
  if (selectval === "accend") {
    mysortAtoZ();
  } else if (selectval === "decent") {
    mysortZtoA();
  } else if (selectval === "lowtohigh") {
    sortLowtoHigh();
  } else if (selectval === "hightolow") {
    sortHightoLow();
  } else if (selectval === "initialorder") {
    renderIntial();
  }
  //console.log(selectval);
};
sortEl.addEventListener("input", selected);

function loadExpenseDB() {
  const getExpeneItem = localStorage.getItem("expense");
  if (getExpeneItem) {
    expense = JSON.parse(getExpeneItem);
  }
}

function totalExpense() {
  loadExpenseDB();

  let sum = 0;
  expense.forEach((items) => {
    sum += parseFloat(items.amount);
  });

  totalExpenseEl.innerHTML = `  $ ${sum.toFixed(2)}`;
  console.log(sum);
}

function deletef(index) {
  expense.splice(index, 1);
  updateLocalStoraage();
  selected();
  itemCount.innerHTML = expense.length;
}

function renderIntial() {
  loadExpenseDB();
  totalExpense();

  expenseListEl.innerHTML = "";

  if (!expense.length) {
    expenseListEl.innerHTML = "Expense Is Empty";
  } else {
    if (!expense.length) {
      itemCount.innerHTML = 0;
    } else {
      itemCount.innerHTML = expense.length;
    }
    expense.forEach((items, index) => {
      const li = document.createElement("li");
      const deleteBnt = document.createElement("button");
      deleteBnt.textContent = "delete";
      deleteBnt.classList.add("del");
      deleteBnt.onclick = () => {
        deletef(index);
      };
      li.textContent = ` ${items.item} - $ ${items.amount} - ${items.date}`;
      li.appendChild(deleteBnt);
      expenseListEl.appendChild(li);
    });
  }
}

function sortLowtoHigh() {
  loadExpenseDB();
  totalExpense();

  expenseListEl.innerHTML = "";
  let sorttolowHigh = expense.sort((a, b) => a.amount - b.amount);
  if (!sorttolowHigh.length) {
    expenseListEl.innerHTML = "Expense Is Empty";
  } else {
    if (!sorttolowHigh.length) {
      itemCount.innerHTML = 0;
    } else {
      itemCount.innerHTML = sorttolowHigh.length;
    }
    sorttolowHigh.forEach((items, index) => {
      const li = document.createElement("li");
      const deleteBnt = document.createElement("button");
      deleteBnt.textContent = "delete";
      deleteBnt.classList.add("del");
      deleteBnt.onclick = () => {
        deletef(index);
      };
      li.textContent = ` ${items.item} - $ ${items.amount} - ${items.date}`;
      li.appendChild(deleteBnt);
      expenseListEl.appendChild(li);
    });
  }
}
function sortHightoLow() {
  loadExpenseDB();
  totalExpense();

  expenseListEl.innerHTML = "";

  let sorthightolow = expense.sort((a, b) => b.amount - a.amount);
  if (!sorthightolow.length) {
    expenseListEl.innerHTML = "Expense Is Empty";
  } else {
    if (!sorthightolow.length) {
      itemCount.innerHTML = 0;
    } else {
      itemCount.innerHTML = sorthightolow.length;
    }
    sorthightolow.forEach((items, index) => {
      const li = document.createElement("li");
      const deleteBnt = document.createElement("button");
      deleteBnt.textContent = "delete";
      deleteBnt.classList.add("del");
      deleteBnt.onclick = () => {
        deletef(index);
      };
      li.textContent = ` ${items.item} - $ ${items.amount} - ${items.date}`;
      li.appendChild(deleteBnt);
      expenseListEl.appendChild(li);
    });
  }
}
function mysortAtoZ() {
  loadExpenseDB();
  totalExpense();

  expenseListEl.innerHTML = "";

  let sortaccend = expense.sort((a, b) => a.item.localeCompare(b.item));
  if (!sortaccend.length) {
    expenseListEl.innerHTML = "Expense Is Empty";
  } else {
    if (!sortaccend.length) {
      itemCount.innerHTML = 0;
    } else {
      itemCount.innerHTML = sortaccend.length;
    }
    sortaccend.forEach((items, index) => {
      const li = document.createElement("li");
      const deleteBnt = document.createElement("button");
      deleteBnt.textContent = "delete";
      deleteBnt.classList.add("del");
      deleteBnt.onclick = () => {
        deletef(index);
      };
      li.textContent = ` ${items.item} - $ ${items.amount} - ${items.date}`;
      li.appendChild(deleteBnt);
      expenseListEl.appendChild(li);
    });
  }
}

function mysortZtoA() {
  loadExpenseDB();
  totalExpense();

  expenseListEl.innerHTML = "";
  let sortaccend = expense.sort((a, b) => b.item.localeCompare(a.item));
  if (!sortaccend.length) {
    expenseListEl.innerHTML = "Expense Is Empty";
  } else {
    if (!sortaccend.length) {
      itemCount.innerHTML = 0;
    } else {
      itemCount.innerHTML = sortaccend.length;
    }
    sortaccend.forEach((items, index) => {
      const li = document.createElement("li");
      const deleteBnt = document.createElement("button");
      deleteBnt.textContent = "delete";
      deleteBnt.classList.add("del");
      deleteBnt.onclick = () => {
        deletef(index);
      };
      li.textContent = ` ${items.item} - $ ${items.amount} - ${items.date}`;
      li.appendChild(deleteBnt);
      expenseListEl.appendChild(li);
    });
  }
}

function updateLocalStoraage() {
  localStorage.setItem("expense", JSON.stringify(expense));
}

addBtnExpenseEl.addEventListener("click", () => {
  const inputexExpense = document.getElementById("expenseNameEl").value;
  const inputedAmount = document.getElementById("expenseAmouneEl").value;
  const expenseDateEl = document.getElementById("expenseDateEl");
  const selectedDate = expenseDateEl.value;
  const newItem = {
    item: inputexExpense,
    amount: inputedAmount,
    date: selectedDate,
  };
  if (inputedAmount && inputexExpense && selectedDate) {
    expense.push(newItem);
    updateLocalStoraage();
    selected();
    document.getElementById("expenseNameEl").value = "";
    document.getElementById("expenseAmouneEl").value = "";
    document.getElementById("expenseDateEl").value = "";
  } else {
    alert("fill out the input field");
  }
});

window.addEventListener("load", () => {
  loadExpenseDB();
  renderIntial();
});
