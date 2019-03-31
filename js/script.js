$("#input").on("paste", function () {
  setTimeout(function() {
      submit();
  });
});
$("#input").keyup(function (e) {
  if (e.which == 13) {
    submit();
  }
});

function submit() {
  var url = document.getElementById('input').value;
  parser(url);
}

function parser(url) {
  var rules = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(rules);
  var id = (match && match[1].length == 11) ? match[1] : false;
  if (id != false) {
    download(id);
    $('#intro').fadeOut();
    $('#max').fadeOut();
    $('#hq').fadeOut();
    $('#mq').fadeOut();
  } else {
    $('#input').addClass('error');
    setTimeout(() => {
      $('#input').removeClass('error');
    }, 2000);
  }

}

function download(id) {
  var maxres = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
  var hqres = "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";
  var mqres = "https://img.youtube.com/vi/" + id + "/mqdefault.jpg";
  
  setTimeout(() => {
    $('.loader').fadeIn();
  }, 400);


  checkMax();

  function checkMax() {
    var maximg = $("<img />").attr('src', maxres)
      .on('load', function () {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalHeight == 90) {
          checkHq();
        } else {
          $("#maximg").html(maximg);
          $('.maxlink').attr("href", maxres);
          setTimeout(() => {
            $('.loader').fadeOut();
            $("#max").fadeIn(600);
          }, 600);

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
          $('.hqlink').attr("href", hqres);
          setTimeout(() => {
            $('.loader').fadeOut();
            $("#hq").fadeIn(600);
          }, 600);
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
          $('.mqlink').attr("href", mqres);
          setTimeout(() => {
            $('.loader').fadeOut();
            $("#mq").fadeIn(600);
          }, 600);
        }
      });
  }

  setTimeout(() => {
    document.getElementById('input').value = "";
  }, 600);


}
$('.back').click(function () {
  $('#max').fadeOut();
  $('#hq').fadeOut();
  $('#mq').fadeOut()
  setTimeout(() => {
    $('#intro').fadeIn();
  }, 500);
});