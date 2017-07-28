$(document).ready(function() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=72cedb4fca6c462383f34ea6f40fb45e&";
    var query;
    var records;
    var beginYear;
    var endYear;
    var articleCount = 0;
    var articleSection;
    var articleDiv;
    var articleTitle
    var articleP;
    var articleLink;
    var articleImg;
    function clear() {
        query = '';
        beginYear = '';
        articleCount = 0;
        endYear = '';
    }
    $('#searchButton').on('click', function(event) {
        $('#searchResults').empty();
        event.preventDefault();
        query = escape($('#search').val().trim());
        records = $('#sel1').val();
        beginYear = $('#startYear').val() + '0101';
        endYear = $('#endYear').val() + '1231';
        url += 'q=' + query + '&sort=newest';
        if ($('#startYear').val()) {
            url += '&begin_Year=' + beginYear;
        }
        if ($('#endYear').val()) {
            url += '&end_Year=' + endYear;
        }
        console.log(url);
        if (records <= 10) {
            $.ajax({
                url: url,
                method: 'GET',
            }).done(function(result) {
                console.log(result);
                var article = result.response.docs;
                for (var i = 0; i < records; i++) {
                    articleCount++;
                    articleDiv = $('<div>').addClass('col-md-12 well');
                    articleTitle = '<h2><span class="badge">' + articleCount + '</span> ' + article[i].headline.main + '</h2>';
                    articleP = '<p>' + article[i].snippet + '</p>';
                    articleLink = '<a class="btn btn-default" href="' + article[i].web_url + '" target="_blank">Read Story</a>';
                    if (article[i].byline != null) {
                        articleSection = '<h4>In: ' + article[i].section_name + ' // ' + article[i].byline.original + '</h4>';
                    } else {
                        articleSection = '<h4>In: ' + article[i].section_name + '</h4>';
                    }
                    // Articles that don't have image
                    if (article[i].multimedia != '') {
                        articleImg = '<img src="http://nyt.com/' + article[i].multimedia[0].url + '" class="img-thumbnail img-responsive articleImage"/>';
                        articleDiv.append(articleTitle).append(articleSection).append(articleImg).append(articleP).append(articleLink);
                    } else {
                        articleDiv.append(articleTitle).append(articleSection).append(articleP).append(articleLink);
                    }
                    $('#searchResults').append(articleDiv);
                }
            }).fail(function(err) {
                throw err;
            });
        } else {
            $('#searchResults').html('<h2 class="text-centered">Sorry, I can only print up to 10 results at a time.')
        }
        clear();
    });
});