const { src, dest, series, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const notify = require('gulp-notify')
const rename = require('gulp-rename')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const htmlMin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const uglify = require('gulp-uglify-es').default
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')

const clean = () => {
    return del(['app/css/']);
}

const styles = () => {
    return src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }
        ).on('error', notify.onError()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/css'))
        .pipe(browserSync.stream())
}

const cssToApp = () => {
    return src('./src/css/**/*.css')
        .pipe(dest('./app/css'))
}

const htmlMinify = () => {
    return src('./src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(dest('./app'))
        .pipe(browserSync.stream())
}

const fonts = () => {
    return src('./src/fonts/*')
        .pipe(dest('./app/fonts'))
}

const jsToApp = () => {
    return src('./src/js/vendor/**/*.js')
        .pipe(dest('./app/js/vendor'))
}

const scripts = () => {
    return src('./src/js/*.js')

        .pipe(webpackStream({
            output: {
                filename: 'main.min.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: "defaults" }]
                                ]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', notify.onError()))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/js'))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('./src/img/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: './sprite.svg'
                }
            }
        }))
        .pipe(dest('./app/img'))
}

const imgToApp = () => {
    return src([
        './src/img/**/*.jpg',
        './src/img/**/*.png',
        './src/img/*.svg',
        './src/img/**/*.jpeg',
        './src/img/**/*.webp'
    ])
        .pipe(dest('./app/img'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    })
}

watch('./src/**/*.html', htmlMinify)
watch('src/fonts/*', fonts)
watch('./src/sass/**/*.scss', styles)
watch('./src/css/**/*.css', cssToApp)
watch('./src/images/svg/**/*.svg', svgSprites)
watch('./src/img/**/*.jpg', imgToApp)
watch('src/img/**/*.png', imgToApp)
watch('src/img/**/*.jpeg', imgToApp)
watch('src/img/**/*.webp', imgToApp)
watch('src/img/*.svg', imgToApp)
watch('src/js/**/*.js', scripts)
watch('./src/js/vendor/**/*.js', jsToApp)

exports.default = series(clean, parallel(htmlMinify, scripts, fonts, jsToApp, cssToApp, svgSprites, imgToApp), styles, watchFiles)


const images = () => {
    return src([
        './src/img/**/*.jpg',
        './src/img/**/*.png',
        './src/img/*.svg',
        './src/img/**/*.jpeg',
        './src/img/**/*.webp'
    ])
        .pipe(image())
        .pipe(dest('./app/img'))
}

const stylesBuild = () => {
    return src('./src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }
        ).on('error', notify.onError()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('./app/css'))
}


const scriptsBuild = () => {
    return src('./src/js/*.js')
        .pipe(webpackStream({
            output: {
                filename: 'main.min.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: "defaults" }]
                                ]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(uglify().on('error', notify.onError()))
        .pipe(dest('./app/js'))
}

exports.build = series(clean, parallel(htmlMinify, scriptsBuild, fonts, jsToApp, cssToApp, svgSprites, images), stylesBuild)