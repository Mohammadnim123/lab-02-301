'use strict'
var optionsArr = [];
var sortedArr = [];
Horn.unsorted = [];
Horn.sortedByName = [];
Horn.sortedByNumber = [];
let hornClone = $('.photo-template');
function Horn(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    Horn.sortedByName.push(this);
    Horn.unsorted.push(this);
    Horn.sortedByNumber.push(this);
}
const ajaxSettings = {
    method: 'get',
    datatype: 'json'
}
let wichClick = 'page-1';

$("#page1").click(function () {
    wichClick = 'page-1';
    $('main').html('')
    takeValues()
});


$("#page2").click(function () {
    wichClick = 'page-2';
    $('main').html('')

    takeValues()
});

function takeValues() {
    $.ajax(`./data/${wichClick}.json`, ajaxSettings)
        .then(data => {
            $('main').html('');
            Horn.unsorted = [];
            Horn.sortedByName = [];
            Horn.sortedByNumber = [];
            data.forEach((val, idx) => {
                let HornObject = new Horn(val.image_url, val.title, val.description, val.keyword, val.horns);
                HornObject.renderOption();
            })
            Horn.sortedByName.sort((a, b) => {
                if (a.title > b.title) return 1;
                else if (a.title < b.title) return -1;
                else return 0;
            });
            Horn.sortedByNumber.sort((a, b) => {
                if (a.horns > b.horns) return 1;
                else if (a.horns < b.horns) return -1;
                else return 0;
            });
            render(Horn.unsorted);
        });
}
takeValues();
Horn.prototype.renderOption = function () {
    if (optionsArr.includes(this.keyword) !== true) {
        optionsArr.push(this.keyword);
        let optionClone = $('#firstFillterOption').clone();
        optionClone.removeAttr('id');
        optionClone.removeAttr('class');
        optionClone.text(this.keyword);
        optionClone.attr('value', this.keyword);
        optionClone.attr('class', wichClick);
        $('#selectFillter').append(optionClone);
    }
};

// ------------- For Filltering
$("#selectFillter").change(function () {
    let selectedE = $(this).children("option:selected").val();
    $('.photoTemplate').addClass('off');
    $('.' + selectedE).removeClass('off');
});
// ------------- For Sorting

$("#selectSort").change(function () {
    let selectedE = $(this).children("option:selected").val();
    $('main').html('');
    if ('sortedByNumber' == selectedE) {
        render(Horn.sortedByNumber)
    }
    else if ('sortedByName' == selectedE) {
        render(Horn.sortedByName)
    }
    else {
        render(Horn.unsorted);
    }
});



function render(objArr) {
    objArr.forEach(element => {
        let musTemplate = $('#horn-template').html();
        let newObj = Mustache.render(musTemplate, element);
        $('main').append(newObj);
    });
}



