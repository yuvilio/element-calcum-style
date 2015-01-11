//gulp automation (for documenatation generation)

var gulp = require('gulp');
var swig = require('gulp-swig');
var watchify = require('watchify');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var sass = require('gulp-ruby-sass');
var vss = require('vinyl-source-stream');
var autoprefixer = require('gulp-autoprefixer');

var deployGh = require('gulp-gh-pages');


// pass along gulp reference to have tasks imported
require('gulp-release-tasks')(gulp);

//html generation from swig templates
var swigopts  = {
  defaults: {
    cache: false
  }
};

var port = 4276;

//conveniences
var examplesPath = './examples'; //the lab is were we code
var distPath = './dist'; //the dist is the processed results


// gulp.task('gen-examples', function () {
//   gulp.src('./examples/index.swig')
//   .pipe(swig(swigopts))
//   .pipe(gulp.dest(  './dist/' ));
//
// });

//  watch the js with watchify and if it changes rebuild, refresh browser
// browserify bundle js (and watch for future changes to trigger it again)
gulp.task('watchify', function(){

  //mostly similary to the watchify task right above with one addition
  var bundleShare = function(b) {

    return b.bundle() //recall b (the watchify/browserify object alreadyknows the source files). carry out the bundling
    .on("error", function(err) {
      console.log("Browserify error:", err);
    })
    .pipe(vss( distPath + '/js/source.js'))
    .pipe(gulp.dest('./'))
    //after you're done bundling, inform browserSync to reload the page
    .pipe(browserSync.reload({stream:true, once: true}));
  };

  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  //files we'll bundle and watch for changes to trigger bundling
  b.add(examplesPath + '/js/source.js');
  // b.add(examplesPath + '/index.nunj');


  //wrap
  b = watchify(b);

  //whenever a file we're bundling is updated
  b.on('update', function(paths){
    //give some sort of gulp indication that a save occured on one of the watched files
    console.log('watchify rebundling: ', paths);
    bundleShare(b); //browserify away
  });

  // b.on('error', function (error) { // Catch any js errors and prevent them from crashing gulp
  //   console.error(error);
  //   this.emit('end');
  // })

  //while we're here let's do a one time browserify bundling
  bundleShare(b);

});


//compile sass -> css
gulp.task('sass', function() {
  return gulp.src(examplesPath + '/sass/styles.scss')
  .pipe(sass({
    //disabling sourmaps for now fir gulp-ruby-sass work with gulp-autoprefixer
    //see http://stackoverflow.com/questions/26979433/gulp-with-gulp-ruby-sass-error-style-css-map31-unknown-word
    "sourcemap=none": true,

    //have some more stylesheets you may want to use? Add them here
    "loadPath" : ['assets/scss']
  }))
  .on('error', function (error) { // Catch any SCSS errors and prevent them from crashing gulp
    console.error(error);
    this.emit('end');
  })
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(distPath + '/css'))
  .pipe(browserSync.reload({ stream:true, once: true }));
});


//generate the html from the swig templates
gulp.task('gen-html', function() {

  console.log('gen-html: generating html to %s', distPath);

  var swigopts  = {
    defaults: {
      cache: false
    }
  };
  return gulp.src(examplesPath + '/index.swig')
  .pipe(swig(swigopts))
  .pipe(gulp.dest(distPath));
});

//watching non-specialized files (like sas changes)
gulp.task('watch', function(){
  //when the scss changes, run gulp-sass task
  gulp.watch(examplesPath + '/sass/styles.scss', ['sass']);

  //when the html (swig template) changes
  gulp.watch(examplesPath + '/**/*.swig', ['gen-html']);

})

//we'll kick off watchify which will take care of the bundling and inform us
// ex: $ gulp browserSync --batch svg-pocket-guide --name svg-001-test
gulp.task('browserSync', ['watchify', 'watch'], function() {
  browserSync(
  {
    server: { //have browser-synce be the static site
      baseDir: "./", //the root /
      directory: true //alternatly the root can just be the directory and you click the file
    },
    port: port,
    // browserSync will have some watching duties as well. whenever the
    // generated html changes we'll have refresh
    files: [ distPath + '/index.html' ]
  });

});

//
gulp.task('deploy-gh-pages', function () {

  //fetch docs from generated area
  return gulp.src('./dist/**/*')
  .pipe(deployGh());
});
