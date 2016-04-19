"use strict";

const req = require('superagent')

let getImagesWithAjax = ()=> {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3333/images';
    req
      .get(url)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
}

let showImages = async () => {

  try {
    let images = await getImagesWithAjax(); //getImageWithAjaxが終了するまで待機
    const manipulationRoot = document.querySelector('.js-manipulation-root');
    images.forEach((img) => {
      manipulationRoot.insertAdjacentHTML('beforeend', `<div style="display: inline-block; width: 200px;"><img src="${img}" /></div>`);
    });
  } catch (err) {
    console.error(`処理中にエラーが発生しました。 ${err} `);
  }

}

showImages();
