var budgetController = (function () {

  var Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget : 0,
    percentage : 0
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  }

  return {
    additem: function (type, desc, value) {
      var newItem, id;
      //Create the new ID
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      };


      //Create the new Item based on type
      if (type == 'exp') {
        newItem = new Expense(id, desc, value);
        console.log('exp created')
      } else if (type == 'inc') {
        newItem = new Income(id, desc, value);
        console.log('inc created')
      }

      //push the item into the array
      data.allItems[type].push(newItem);
      console.log('pushing item' + newItem)
      return newItem;
    },

    calculateBudget: function () {
      calculateTotal('exp');
      calculateTotal('inc');
      data.budget = data.totals.inc - data.totals.exp;
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      console.log(data.percentge)

    },
    getBudget: function(){
      console.log('a'+data.percentage);
    
      return {
        budget: data.budget,
        totalInc : data.totals.inc,
        totalExp : data.totals.exp,
        percentage: data.percentage
       
      };
    },

    testing: function () {
      console.log(data);
    }

  }

})();

var UIController = (function () {
  var DOMStrings = {
    add_type: '.add__type',
    add_desc: '.add__description',
    add_value: '.add__value',
    add_btn: '.add__btn',
    exp_list: '.expenses__list',
    inc_list: '.income__list'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.add_type).value,
        desc: document.querySelector(DOMStrings.add_desc).value,
        value: parseFloat(document.querySelector(DOMStrings.add_value).value)
      }
    },

    addListItem: function (obj, type) {

      var html;
      var element;

      if (type == 'inc') {
        element = DOMStrings.inc_list;
        html = '<div class="item clearfix" id="income-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix">' +
          '<div class="item__value">+ %value%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          '</div>' +
          '</div>' +
          '</div>';

      } else if (type == 'exp') {
        element = DOMStrings.exp_list;
        html = '<div class="item clearfix" id="expense-%id%">' +
          '<div class="item__description"> %description% </div>' +
          '<div class="right clearfix">' +
          '<div class="item__value">- %value%</div>' +
          '<div class="item__percentage">21%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          '</div>' +
          '</div>' +
          '</div>';
      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.desc);
      newHtml = newHtml.replace('%value%', obj.value);

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

    },

    clearFields: function () {

      var fields;

      fields = document.querySelectorAll(DOMStrings.add_desc + ', ' + DOMStrings.add_value);

      var fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function (current, index, array) {
        current.value = "";

      });
    },

    getDOMStrings: function () {
      return DOMStrings;
    }
  };

})();


var controller = (function (budgetCtrl, UICtrl) {


  var setUpEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.add_btn).addEventListener('click', function () {
      ctrlAddItem();
    });

    document.addEventListener('keypress', function (event) {
      if (event.key == 13 || event.which == 13) {
        ctrlAddItem();
      }
    });
  }

  var updateBudget = function () {

    //4. Calculate the budget
    budgetCtrl.calculateBudget();

    var budget = budgetCtrl.getBudget();
    console.log()
    console.log(budget);
    //5. Display the budgent on the UI


  }
  var ctrlAddItem = function () {
    //1. Get the field input data
    var input = UICtrl.getInput();
    if (input.description != '' && !isNaN(input.value) && input.value > 0) {
      //2. add the item to budget controller
      newItem = budgetCtrl.additem(input.type, input.desc, input.value);

      //3. Add the item ot the UI
      UIController.addListItem(newItem, input.type);

      UIController.clearFields();

      updateBudget();

    }
  };
  return {
    init: function () {
      console.log('App has started.')
      setUpEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();