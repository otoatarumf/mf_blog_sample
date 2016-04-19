"use strict";

const Promise = require('bluebird');　// Promise用の補助ライブラリ bluebird (http://bluebirdjs.com/docs/getting-started.html)

let serveAppetizers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(' 前菜の準備ができました ');
      resolve(' 前菜 ');　// 戻り値を返して、処理のコントロールをGeneratorに返す。
    }, 1000);
  })
}

let serveSoup = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(' スープの準備ができました ');
      resolve(' スープ ');
    }, 100);
  })
}

let serveMainDish = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(' メインディッシュの準備ができました ');
      resolve(' メインディッシュ ');
    }, 1000);
  })
}

let serveDesertAndCoffee = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(' デザートとコーヒーの準備ができました ');
      resolve(' デザートとコーヒー ');
    }, 100);
  })
}

let serveFullCourse = () => {
 return Promise.coroutine(function* () {
    let set = ''
    set += yield serveAppetizers();      //serveAppetizers()がresolveするまで待機
    set += yield serveSoup();            //serveSoup()がresolveするまで待機
    set += yield serveMainDish();        //serveMainDish()がresolveするまで待機
    set += yield serveDesertAndCoffee(); //serveDesertAndCoffee()がresolveするまで処理を待機

    console.log(`お客様に${set}を提供しました。`);
  })();
}

serveFullCourse();
