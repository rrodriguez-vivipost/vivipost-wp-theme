/* vivipost-wp-theme - v1.0.0 - 2019-07-27*/
// var app = angular.module('vivipost', []);

if (window.location.hostname === 'vivipost.io'){
  var ports = ['4201'];
  ports.forEach(function(port) {
    var livereload = document.createElement('script');
    livereload.setAttribute('src','http://127.0.0.1:' + port + '/livereload.js');
    document.head.appendChild(livereload);
  });
}
