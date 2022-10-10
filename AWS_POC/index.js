

$(document).ready(function () {
  var listData = [];
  $("#addItemModal").submit(function (event) {
    var formData = {
      id: parseInt($("#id").val()),
      itemName: $("#item").val(),
      quantity: parseInt($("#quantity").val()),
    };
    console.log(formData);
    $('#addItemModal').modal('toggle');
    $.ajax({
      type: "POST",
      url: "https://quqbqj6lx7.execute-api.us-east-1.amazonaws.com/Prod/orders",
      data: JSON.stringify(formData),
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });
    event.preventDefault();
  });

  //Get all 
  getAll();

  $("#refresh").click(function (e) {
    console.log('refresh');
    $("#table tr").remove();
    getAll();
    e.preventDefault();
  });
});

function getAll() {
  $.ajax({
    url: "https://quqbqj6lx7.execute-api.us-east-1.amazonaws.com/Prod/orders",
    method: "GET",
    headers: { "Accept": "application/json; odata=verbose" },
  }).done(function (data) {
    listData = data;
    console.log(listData);
    for (var i = 0; i < data.length; i++) {

      const randomElement = data[i];
      var table = document.getElementById('table');
      var row = table.insertRow(-1);
      var id = row.insertCell(0);
      var itemName = row.insertCell(1);
      var quantity = row.insertCell(2);
      var action = row.insertCell(3);
      id.innerHTML = randomElement.id;
      itemName.innerHTML = randomElement.itemName;
      quantity.innerHTML = randomElement.quantity;
      action.innerHTML = `<td>
                              <a href="#editItemModal" class="edit" data-toggle="modal" onclick="edit(${i})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                              <a class="delete" onclick="remove(${i})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                              </td>`;
    }
  });
}
function edit(i) {
  // console.log(i,'edit',listData[i]);
  $("#editId").val(listData[i].id);
  $("#editItem").val(listData[i].itemName);
  $("#editQuantity").val(listData[i].quantity);

  $("#editItemModal").submit(function (event) {
    var formData = {
      id: parseInt($("#editId").val()),
      itemName: $("#editItem").val(),
      quantity: parseInt($("#editQuantity").val()),
    };
    console.log(formData);
    $('#editItemModal').modal('toggle');
    $.ajax({
      type: "PUT",
      url: "https://quqbqj6lx7.execute-api.us-east-1.amazonaws.com/Prod/orders/" + listData[i].id,
      headers: {
        "Accept": "application/json; odata=verbose",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",

      },
      data: JSON.stringify(formData),
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });
    event.preventDefault();
  });
}

function remove(i) {
  console.log(i, 'remove', listData[i]);
  // let url = "https://vhakgkd4u5.execute-api.us-east-1.amazonaws.com/Prod/orders/"+listData[i].id
  $.ajax({
    url: "https://quqbqj6lx7.execute-api.us-east-1.amazonaws.com/Prod/orders/" + listData[i].id,
    method: "DELETE",
    success: function (res) {
      console.log(res, 'res');
    },
    error: function (err) {
      console.log(err, 'err');
    }
  });
}

// Select All

$(document).ready(function () {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });
});