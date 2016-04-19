'use strict'

const gulp = require('gulp');
const plugins = require("gulp-load-plugins")();
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const glob = require('glob');

let startWatchify = () => {

    const srcDir = 'src/'; // コンパイル対象ファイルのディレクトリ名
    const distDir = './dist'; // コンパイル先ディレクトリ
    const sources = glob.sync(`${srcDir}**/*.js`); // コンパイル対象のファイル

    sources.forEach((entryPoint) => {
        let distFileName = entryPoint.replace(srcDir, '')

        // browserify: オプション群
        let browserifyOptions = {
            // コンパイル対象となるファイル
            entries: [entryPoint],
            // babel-transform-runtime, e2015, stage-2 プリセットを適用しつつ、babelifyを使って対象をコンパイルする。
            // http://babeljs.io/docs/plugins/
            transform: babelify.configure({presets: ["es2015", "stage-3"], plugins: ['transform-runtime']}),
            debug: true,
            //watchifyの差分ビルドを有効化
            cache: {},
            packageCache: {}
        };

        let watchifyStream = watchify(browserify(browserifyOptions));

        let execBundle = () => {
            plugins.util.log(` ${entryPoint}をビルドしています...`);
            return watchifyStream
                .bundle()　// バンドル化
                .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))　//Errorが発生した場合にはログに出力
                .pipe(plugins.plumber())　//Errorが発生してもタスクを止めない
                .pipe(source(distFileName))　//streamingをvinyl file objectへと変換する
                .pipe(buffer())　//vinyl file objectをvinyl buffered object形式に変換する
                .pipe(gulp.dest(distDir)) //distディレクトリに出力
        };

        // 対象ファイルの変更を検知
        watchifyStream.on('update', execBundle);
        watchifyStream.on('log', plugins.util.log);
        return execBundle();
    });

};

gulp.task('default', startWatchify);
