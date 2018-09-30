function submit(){
    var url = document.getElementById('input').value;
    parser(url);
  }
  
  function parser(url){
      var rules = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
      var match = url.match(rules);
      var id = (match&&match[1].length==11)? match[1] : false;
      if( id != false){
        download(id);
      }else{
        document.getElementById('error').style.display = 'block';
      }
      
  }
  
  function download(id) {
    var output = "https://img.youtube.com/vi/"+ id +"/maxresdefault.jpg";
    var win = window.open(output, '_blank');
    win.focus();
    document.getElementById('input').value = "";
  }