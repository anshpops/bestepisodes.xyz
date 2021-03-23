$(document).ready(function(){
    $('.search,#search').keyup(function(){
        var searchValue;
        if ((($('.search').val() !== '' ) && ($('#search').val() === '' )) || (($('.search').val() != null ) && ($('#search').val() == null ))) {
            searchValue = ($('.search').val()).trim();
        } else if ((($('.search').val() === '' ) && ($('#search').val() !== '' )) || (($('.search').val() == null ) && ($('#search').val() != null ))) {
            searchValue = ($('#search').val()).trim();
        }

        if ((searchValue == '') || (searchValue == null)) {
            $('.results-wide,.results-narrow').empty();
        }else if (searchValue != null) {
            $.getJSON('/search.json', function(result){
                var list = result;
            var options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    "title"
                ]
            };
            var fuse = new Fuse(list, options);
            var searchResult = fuse.search(searchValue);
            console.log(searchResult);
            var view = $(window).width();
            if((searchResult.length > 0) && (view > 900) ) {
                $('.results-wide').empty();
                for(i = 0;i<searchResult.length;i++) {
                    $('.results-wide').append(`<div class="res"><h3 class="res-heading"><a href="${searchResult[i].item.uri}">${searchResult[i].item.title}</a></h3></div>`)

                }
            } else if ((searchResult.length > 0) && (view < 900)) {
                $('.results-narrow').empty();
                for(i = 0;i<searchResult.length;i++) {
                    $('.results-narrow').append(`<div class="res"><h3 class="res-heading"><a href="${searchResult[i].item.uri}">${searchResult[i].item.title}</a></h3></div>`)
                }
            }
            })
        }
    })
})
