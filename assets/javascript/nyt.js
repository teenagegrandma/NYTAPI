 <script type="text/javascript">
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fb83d3c238d447ed9f3fe3f79a3c06e3";
$(document).ready(function() {
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fb83d3c238d447ed9f3fe3f79a3c06e3";
  var query;
  var numRecords;
  var beginYear;
  var endYear;
  var articleCount = 0;
  
  // Creates areas for article content
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
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fb83d3c238d447ed9f3fe3f79a3c06e3";
  }  
  $('.submit').on('click',function(event) {
    //Empty out previous results
    $('#searchResults').empty();
    event.preventDefault();
    // INPUTS
    query = escape($('#searchTerm').val().trim());
    numRecords = $('#numRecords').val();
    // years
    beginYear = $('#startYear').val() + '0101';
    endYear = $('#endYear').val() + '1231';
    
  
    url += 'q=' + query + '&sort=newest';
    // IF date provided
    if ($('#startYear').val()){
      url += '&begin_Year=' + beginYear;
    }
    if ($('#endYear').val()) {
      url += '&end_Year=' + endYear;
    }
    console.log(url);
    // RESULTS
    if (numRecords <= 10){
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        console.log(result);
        var article = result.response.docs;
        for (var i = 0; i < numRecords; i++) {
          articleCount++;
          articleDiv = $('<div>').addClass('col-md-12 well');
          articleTitle = '<h2><span class="badge">' + articleCount + '</span> ' + article[i].headline.main +'</h2>';
          articleP = '<p>' + article[i].snippet + '</p>';
          articleLink = '<a class="btn btn-default" href="' + article[i].web_url + '" target="_blank">Read Story</a>';
      
          if (article[i].byline != null) {
            articleSection = '<h4>In: ' + article[i].section_name + ' // ' + article[i].byline.original + '</h4>';
          }
          else {
            articleSection = '<h4>In: ' + article[i].section_name + '</h4>';
            
          }
          
          // Articles that don't have image
          if (article[i].multimedia != '') {
            articleImg = '<img src="http://nyt.com/' + article[i].multimedia[0].url + '" class="img-thumbnail img-responsive articleImage"/>';
            articleDiv.append(articleTitle).append(articleSection).append(articleImg).append(articleP).append(articleLink);
          }
          else {
            articleDiv.append(articleTitle).append(articleSection).append(articleP).append(articleLink);
          }
          
          $('#searchResults').append(articleDiv);
        }
        
      }).fail(function(err) {
        throw err;
      });
    }
    else {
      $('#searchResults').html('<h2 class="text-centered">Sorry, I can only print up to 10 results at a time.')
    }
    
    clear();
  
  });
    
});