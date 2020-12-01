$(document).ready(() => {
  generateBtn.click(handleGenerate);
});

// Variables
var count = 0;
var shibaArray = [];
var shibaArrayForAnimation = [];
var generateBtn = $("#generate-btn");
var clearBtn = $("#clear-btn");
var preview = $(".preview");

// Handle Generate Button Click
function handleGenerate() {
  let color = $("input[name='color']:checked").val();
  let shape = $("input[name='shape']:checked").val();
  let shiba = $("input[name='shiba']:checked").val();

  let shibaUrl = shibaArray[count];

  if (shiba === "true" && shibaArray.length < 1) {
    // Make AJAX Request For Shiba Images if true and no images have previously been fetched
    $.ajax({
      type: "GET",
      dataType: "json",
      url:
        "https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=30&urls=true&httpsUrls=true",
      success: function (data) {
        // Update data
        shibaArray = data;
        shibaUrl = shibaArray[count];
        count++;

        // Add Image to DOM for Preview
        preview.css("background-image", "url(" + shibaUrl + ")").addClass("`color`");

        // Add Image to Canvas
        var addToCanvas = preview
          .css("background-image", "url(" + shibaUrl + ")")
          .clone();
        $(".canvas").append(addToCanvas);
      },
      error: function (data) {
        console.log("error", data);
      },
    });
  } else if (shiba === "true" && shibaArray.length >= 1) {
    // Get images from shibaArray since images have previously been fetched
    shibaArray[count];
    count++;

    // Add Image to DOM for Preview
    preview.css("background-image", "url(" + shibaUrl + ")");

    // Add Image to Canvas
    var addToCanvas = preview
      .css("background-image", "url(" + shibaUrl + ")")
      .clone();
    $(".canvas").append(addToCanvas);
  } else {
      preview.removeClass('orange green blue square triangle circle').addClass(color).addClass(shape);
  }
}
