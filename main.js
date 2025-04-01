// ITEM CONTROLLER
const itemCtrl = (function() {
    // Item constructor
    const Item = function(id, description, amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }
    // Data structure
    const data = {
        items: []
    }
    // Public methods
    return {
        logData: function() {
            return data;
        },
        addMoney: function(description, amount) {
            // Create random id
            let ID = itemCtrl.createID();
            // Create new item
            newMoney = new Item(ID, description, amount);
            // Push it into the array
            data.items.push(newMoney);

            return newMoney;
        },
        createID: function() {
            // Create random id number between 0 and 10000
            const idNum = Math.floor(Math.random() * 10000);
            return idNum;
        },
        getIdNumber: function(item) {
            // Get the item id
            const amountId = (item.parentElement.id);
            // Break the id into an array
            const itemArr = amountId.split('-');
            // Get the id number
            const id = parseInt(itemArr[1]);

            return id;
        },
        deleteAmountArr: function(id) {
            // Get all the ids
            const ids = data.items.map(function(item) {
                // Return item with id
                return item.id;
            });
            // Get index
            const index = ids.indexOf(id)
            // Remove item
            data.items.splice(index, 1);
        }
    }
})();

// UI CONTROLLER
const UICtrl = (function() {
    // UI selectors
    const UISelectors = {
        incomeBtn: '#add__income',
        expenseBtn: '#add__expense',
        description: '#description',
        amount: '#amount',
        moneyEarned: '#amount__earned',
        moneyAvailable: '#amount__available',
        moneySpent: '#amount__spent',
        incomeList: '#income__container',
        expensesList: '#expenses__container',
        incomeItem: '.income__amount',
        expenseItem: '.expense__amount',
        itemsContainer: '.items__container'
    }
    // Public methods
    return {
        // Return UI selectors
        getSelectors: function() {
            return UISelectors
        },
        getDescriptionInput: function() {
            return {
                descriptionInput: document.querySelector(UISelectors.description).value
            }
        },
        getValueInput: function() {
            return {
                amountInput: document.querySelector(UISelectors.amount).value
            }
        },
        addIncomeItem: function(item) {
            // Create new div
            const div = document.createElement('div');
            // Add class
            div.classList = 'item income'
            // Add id to the item
            div.id = `item-${item.id}`
            // Add HTML
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__income">
                <p class="symbol">Rs</p>
                <span class="income__amount">${item.amount}</span>
            </div>
            <i class="far fa-trash-alt"></i>
            `;
            // Insert income into the list
            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend', div);
        },
        clearInputs: function() {
            document.querySelector(UISelectors.description).value = ''
            document.querySelector(UISelectors.amount).value = ''
        },
        updateEarned: function() {
            // All income elements
            const allIncome = document.querySelectorAll(UISelectors.incomeItem);
            // Array with all incomes
            const incomeCount = [...allIncome].map(item => +item.innerHTML);
            // Calculate the total earned
            const incomeSum = incomeCount.reduce(function(a, b) {
                return a + b
            }, 0);
            // Display the total earned
            const earnedTotal = document.querySelector(UISelectors.moneyEarned).innerHTML = incomeSum.toFixed(2);
        },
        addExpenseItem: function(item) {
            // Create new div
            const div = document.createElement('div');
            // Add class
            div.classList = 'item expense'
            // Add id to the item
            div.id = `item-${item.id}`
            // Add HTML
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__expense">
                <p class="symbol">Rs</p>
                <span class="expense__amount">${item.amount}</span>
            </div>
            <i class="far fa-trash-alt"></i>
            `;
            // Insert expense into the list
            document.querySelector(UISelectors.expensesList).insertAdjacentElement('beforeend', div);
        },
        updateSpent: function() {
            // All expense elements
            const allExpenses = document.querySelectorAll(UISelectors.expenseItem);
            // Array with all expenses
            const expenseCount = [...allExpenses].map(item => +item.innerHTML)
            // Calculate the total spent
            const expenseSum = expenseCount.reduce(function(a, b) {
                return a + b
            }, 0)
            // Display the total spent
            const expensesTotal = document.querySelector(UISelectors.moneySpent).innerHTML = expenseSum.toFixed(2);
        },
        updateAvailable: function() {
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent)
            const available = document.querySelector(UISelectors.moneyAvailable);
            available.innerHTML = ((+earned.innerHTML) - (+spent.innerHTML)).toFixed(2)
        },
        deleteAmount: function(id) {
            // Create the id we will select
            const amountId = `#item-${id}`;
            // Select the amount with the id we passed
            const amountDelete = document.querySelector(amountId);
            // Remove from UI
            amountDelete.remove();
        }
    }
})();

// APP CONTROLLER
const App = (function() {
    // Event listeners
    const loadEventListeners = function() {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();
        // Add new income
        document.querySelector(UISelectors.incomeBtn).addEventListener('click', addIncome);
        // Add new expense
        document.querySelector(UISelectors.expenseBtn).addEventListener('click', addExpense);
        // Delete item
        document.querySelector(UISelectors.itemsContainer).addEventListener('click', deleteItem);
    }

    // Add new income
    const addIncome = function() {
        // Get description and amount values
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        // If inputs are not empty
        if (description.descriptionInput !== '' && amount.amountInput !== '') {
            // Add new item
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
            // Add item to the list
            UICtrl.addIncomeItem(newMoney);
            // Clear inputs
            UICtrl.clearInputs();
            // Update earned
            UICtrl.updateEarned();
            // Calculate money available
            UICtrl.updateAvailable();
        }
    }

    // Add new expense
    const addExpense = function() {
        // Get description and amount values
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        // If inputs are not empty
        if (description.descriptionInput !== '' && amount.amountInput !== '') {
            // Add new item
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
            // Add item to the list
            UICtrl.addExpenseItem(newMoney);
            // Clear inputs
            UICtrl.clearInputs();
            // Update total spent
            UICtrl.updateSpent();
            // Calculate money available
            UICtrl.updateAvailable();
        }
    }

    // Delete item
    const deleteItem = function(e) {
        if (e.target.classList.contains('far')) {
            // Get id number
            const id = itemCtrl.getIdNumber(e.target)
            // Delete amount from UI
            UICtrl.deleteAmount(id);
            // Delete amount from data
            itemCtrl.deleteAmountArr(id);
            // Update earned
            UICtrl.updateEarned();
            // Update total spent
            UICtrl.updateSpent();
            // Calculate money available
            UICtrl.updateAvailable();
        }

        e.preventDefault()
    }

    // Init function
    return {
        init: function() {
            loadEventListeners();
        }
    }

})(itemCtrl, UICtrl);

App.init();
