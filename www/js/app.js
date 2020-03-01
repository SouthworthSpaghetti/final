'use strict';

// let likeButtons = document.getElementsByTagName('button');//FEB28 ANTHONY
// let likeButtons = $('button');
// $('.counter').click(function(){
//   // let character = this.parent().css({"color": "red"})
//   // let counter = character.$('span:first');
//   let character = this.parentNode;//FEB28 ANTHONY
//   let counter = character.getElementsByTagName('span')[0];
//   let count = parseInt(counter.textContent);
//   count++;
//   counter.textContent = count;
// });

$('#loadMore').click(function () {//FEB28 ANTHONY
  let X = $('#loadMore').attr("class");
  $.ajax(`http://localhost:3000/characters?page=${X}`, { method: 'GET', dataType: 'JSON' })
    // .then(data => console.log(data))
    .then(data => {
      //   console.log("*&*&**&*&*&&*&&", data)
      const templateSource = $('#handleTemplate').html();//ADDING MORE CHARACTERS BY API, PAGE#X
      const myTemplate = Handlebars.compile(templateSource);
      data.results.forEach(person => {
        const context = { handleName: person.name, handleCount: person.likes };
        const html = myTemplate(context);
        $(`#${X}`).append(html);
      });

      const newArticleSource = $('#newArticle').html();//ADDING ARTICLE AND UPDATING BUTTON ID++ FOR POSSIBLE NEXT ADDING OF MORE CHARACTERS
      const myArticle = Handlebars.compile(newArticleSource);
      X++;
      const articleContext = { nextPage: X}
      const htmlForSight = myArticle(articleContext);
      $('section').append(htmlForSight);
      $('#loadMore').attr('class', X)

    })
    .catch(error => { throw error; });
})

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
