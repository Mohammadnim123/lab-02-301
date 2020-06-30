'use strict'
var optionsArr=[];
console.log(optionsArr);
// "image_urll": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
// "title": "UniWhal",
// "description": "A unicorn and a narwhal nuzzling their horns",
// "keyword": "narwhal",
// "horns": 1
let hornClone = $('.photo-template');
function Horn(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
}
// $.get('./data/page-1.json')

const ajaxSettings = {
    method: 'get',
    datatype: 'json'
}

let wichClick = 'page-1';

$( "#page1" ).click(function() {
    wichClick = 'page-1';
    $('main').html('')
    takeValues()
  });

  
  $( "#page2" ).click(function() {
    wichClick = 'page-2';
    $('main').html('')

    takeValues()
   });

  function takeValues(){
$.ajax(`./data/${wichClick}.json`, ajaxSettings)
    .then(data => {
        $('main').html('')

        data.forEach((val, idx) => {
            let HornObject = new Horn(val.image_url, val.title, val.description, val.keyword, val.horns);
            HornObject.render();
            HornObject.renderOption();
            console.log("second",wichClick);
    console.log("first",wichClick);
        })
    });
}
takeValues()

// <section id="photo-template">
//     <h2></h2>
//     <img src="" alt="">
//     <p></p>
//   </section>
Horn.prototype.render = function () {
    // let hornClone = $('#photo-template').clone();
    // hornClone.attr('class',`photoTemplate ${this.keyword}`);
    // hornClone.removeAttr('#photo-template');
    // hornClone.find('h2').text(this.title);
    // hornClone.find('img').attr('src', this.image_url);
    // hornClone.find('p').text(this.description);
    // $('main').append(hornClone);

    let musTemplate = $('#horn-template').html();
  // Mustache.render(string,object)
  let newObj = Mustache.render(musTemplate,this);
  $('main').append(newObj);
};
{/* <select>
<option class="optionClass" value="default">Filter by Keyword</option>
</select> */}
Horn.prototype.renderOption = function () {
    if (optionsArr.includes(this.keyword) !== true){
        optionsArr.push(this.keyword);
        let optionClone = $('.optionClass').clone();
        optionClone.removeAttr('class');
        optionClone.text(this.keyword);
        optionClone.attr('value',this.keyword);
        $('select').append(optionClone);
    }};

    // function sortingRender() {
    //   var x = $("select");
    //   console.log(x);
    //   $("h4").text("You selected: " + x);
    // }
    $("select").change(function(){
        let selectedE = $(this).children("option:selected").val(); 
        $('.photoTemplate').addClass('off');
        $('.'+selectedE).removeClass('off');
    });