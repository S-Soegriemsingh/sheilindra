/**
 * Gulp is a toolkit to automate and enhance the workflow. This file is used to
 * define Gulp tasks, which will use piplines to execute commands in order.
 *
 * A Gulp Task can be called from the command line by using the "npx gulp" command
 * followed by the given task name (first parameter). e.g. npx gulp watch
 *
 * Most used functions:
 * TASK: Define a Gulp task
 * SRC:  Creates a Stream for reading Vinyl (metadata that describes a file) objects
 * PIPE: Chain Transform or Writable Streams
 * DEST: Creates a Stream for writing Vinyl (metadata that describes a file) objects
 *
 * Documentation: https://gulpjs.com/docs/en/api/concepts
 *
 * @author: Sheik Soegriemsingh
 * @version: 2.0.0
 */

// Load Modules
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

/**
 * Compile, Minify and Rename CSS
 * The sass function needs a relative path to the files in order to start
 * watching them.
 */
gulp.task('sass', function()
{
    return (
        // Get the SCSS files to mutate
        gulp.src('./assets/css/**/*.scss')
        
        // Chain an additional Stream
        .pipe(
            // Compile the SCSS files
            sass({
                // Minify the SCSS files
                outputStyle: 'compressed'
            })
        )

        // Chain an additional Stream
        .pipe(
            // Prefix the CSS
            autoprefixer()
        )

        // Chain an additional Stream
        .pipe(
            // Rename the SCSS files
            rename({
                // Add the suffix .min e.g. .min.css
                suffix: '.min'
            })
        )
        
        // Chain an additional Stream
        .pipe(
            // Dynamically set the destination of the files
            gulp.dest(function(file) {
                // Return the original destination of the file
                return file.base;
            })
        )
    )
});

/**
 * Compile, Minify and Rename JS
 * The uglify function does not needs a relative path to the files in order to start
 * watching them.
 */
 gulp.task('js', function()
 {
     return (
         // Get the JS files to mutate
         // Exclude the .min.js files
         gulp.src(['./assets/js/**/!(*.min)*.js'])

         // Chain an additional Stream
         .pipe(
             // Compile the JS files
             uglify()
         )

         // Chain an additional Stream
         .pipe(
             // Rename the JS files
             rename({
                 // Add the suffix .min e.g. .min.js
                 suffix: '.min'
             })
         )
         
         // Chain an additional Stream
         .pipe(
             // Dynamically set the destination of the files
             gulp.dest(function(file) {
                 // Return the original destination of the file
                 return file.base;
             })
         )
     )
 });

/**
 * Watch Files
 * 
 * The watch function needs a relative path to the files in order to start
 * watching them.
 */
gulp.task('watcher', function()
{
    // Watch the SCSS files
    gulp.watch('./assets/css/**/*.scss', gulp.series(['sass']));

    // Watch the JS files
    gulp.watch('./assets/js/**/!(*.min)*.js', gulp.series(['js']));
});