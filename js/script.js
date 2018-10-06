$("#input").keyup(function (e) {
  if (e.which == 13) {
    $("#submit").click();
  }
});

function submit() {
  var url = document.getElementById('input').value;
  $('#max').fadeOut();
  $('#hq').fadeOut();
  $('#mq').fadeOut();
  parser(url);
}

function parser(url) {
  var rules = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(rules);
  var id = (match && match[1].length == 11) ? match[1] : false;
  if (id != false) {
    download(id);
  } else {
    $('#error').fadeIn();
  }

}

function download(id) {
  var maxres = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
  var hqres = "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";
  var mqres = "https://img.youtube.com/vi/" + id + "/mqdefault.jpg";

  document.getElementById('input').value = "";

  $('#intro').fadeOut();
  $('#process').fadeIn();

  checkMax();

  function checkMax() {
    var maximg = $("<img />").attr('src', maxres)
      .on('load', function () {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalHeight == 90) {
          checkHq();
        } else {
          $("#maximg").html(maximg);
          $('#maxlink').attr("href", maxres);
          $("#max").slideDown(600);
        }
      });
  }

  function checkHq() {
    var hqimg = $("<img />").attr('src', hqres)
      .on('load', function () {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalHeight == 90) {
          checkmq();
        } else {
          $("#hqimg").html(hqimg);
          $('#hqlink').attr("href", hqres);
          $("#hq").slideDown(600);
        }
      });
  }

  function checkMq() {
    var mqimg = $("<img />").attr('src', mqres)
      .on('load', function () {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalHeight == 90) {
          checkmq();
        } else {
          $("#mqimg").html(mqimg);
          $('#mqlink').attr("href", mqres);
          $("#mq").slideDown(600);
        }
      });
  }


}
$('.back').click(function () {
  $('#process').slideUp();
  setTimeout(() => {
    $('#intro').fadeIn();
  }, 400);
});