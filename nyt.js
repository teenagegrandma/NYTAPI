$function() {


    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json" + apiKey;
    var apiKey = "72cedb4fca6c462383f34ea6f40fb45e";

    $.ajax({
        url: queryURL,
        methoid: "GET"
    }).done(function(response) {
        var results = response.data;

    })
}