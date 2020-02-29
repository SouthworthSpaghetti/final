'use strict';

// let likeButtons = document.getElementsByTagName('button');//FEB28 ANTHONY
// let likeButtons = $('button');
$('.counter').click(function(){
  // let character = this.parent().css({"color": "red"})
  // let counter = character.$('span:first');
  let character = this.parentNode;//FEB28 ANTHONY
  let counter = character.getElementsByTagName('span')[0];
  let count = parseInt(counter.textContent);
  count++;
  counter.textContent = count;
});

// $('#loadMore').click(function () {//FEB28 ANTHONY
//   let X = 2;
//   $.ajax(`http://localhost:3000/characters?page=/${X}`, {method: 'GET', dataType: 'JSON'})
//   .then(data => {
//     console.log("*&*&**&*&*&&*&&", data)
//       const templateSource = $('.handleTemplate').html();
//       const myTemplate = Handlebars.compile(templateSource);
//       const context = {handleName, handleCount};
//       const html = myTemplate(context);
//       $('main').append(html);
//       X++;
//     })
//     .catch(error => { throw error; });
// })

// for (let i = 0; i < likeButtons.length; i++) {
//   // likeButtons[i].addEventListener('click', likeMe);//FEB28 ANTHONY
//   likeButtons[i].click(likeMe)
//   // console.log("/././././", i);//FEB28 ANTHONY
// }

// function likeMe(e) {
//   let character = e.target.parentNode;
//   let counter = character.getElementsByTagName('span')[0];
//   let count = parseInt(counter.textContent);
//   count++;
//   counter.textContent = count;
// }
