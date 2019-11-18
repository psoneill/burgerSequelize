$(document).ready(function () {
  // Getting a reference to the input field where user adds a new burger
  var $newItemInput = $("input.new-item");
  // Our new burgers will go inside the burgerContainer
  var burgerContainer = $(".burger-container");
  var finishedBurgerContainer = $('.finished-burger-container');
  // Adding event listeners for deleting, editing, and adding burgers
  $(document).on("click", "button.devoured", toggledevoured);
  $(document).on("submit", "#burger-form", insertburger);

  // Our initial burgers array
  var burgers = [];

  // Getting burgers from database when page loads
  getburgers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    burgerContainer.empty();
    finishedBurgerContainer.empty();

    var availableBurgers = [];
    var eatenBurgers = [];
    for (var i = 0; i < burgers.length; i++) {
      if (burgers[i].devoured) {
        eatenBurgers.push(createNewRow(burgers[i]));
      } else {
        availableBurgers.push(createNewRow(burgers[i]));
      }
    }
    burgerContainer.prepend(availableBurgers);
    finishedBurgerContainer.prepend(eatenBurgers);
  }

  // This function grabs burgers from the database and updates the view
  function getburgers() {
    $.get("/api/burgers", function (data) {
      burgers = data;
      initializeRows();
    });
  }

  // Toggles devoured status
  function toggledevoured(event) {
    event.stopPropagation();
    var burger = $(this).parent().data("burger");
    burger.devoured = !burger.devoured;
    updateburger(burger);
  }

  // This function updates a burger in our database
  function updateburger(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burger
    }).then(getburgers);
  }

  // This function constructs a burger-item row
  function createNewRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item d-flex justify-content-between align-items-center burger-item'>",
        "<span>",
        burger.burgerName,
        "</span>",
        "<button class='devoured btn btn-primary text-right'>Devour!</button>",
        "</li>"
      ].join("")
    );

    if (burger.devoured) {
      $newInputRow.find("button").hide();
    }

    $newInputRow.data("burger", burger);
    return $newInputRow;
  }

  // This function inserts a new burger into our database and then updates the view
  function insertburger(event) {
    event.preventDefault();
    var burger = {
      burgerName: $newItemInput.val().trim(),
      devoured: false
    };

    $.post("/api/burgers", burger, getburgers);
    $newItemInput.val("");
  }
});
