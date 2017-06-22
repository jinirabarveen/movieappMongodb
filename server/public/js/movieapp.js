function fnlocal()
{
        localStorage.setItem("username", "");
        localStorage.setItem("username", document.getElementById('username').value);
}
 /*function for search movies in tmdb */
 function findmovies() {
         $.ajax({
             url: '/movie/search',
             type: 'GET',
             data: {
                 moviename: document.getElementById('moviename').value
             },
             error: function() {
                 $('#movies').html('<p>An error has occurred</p>');
             },
             success: function(data) {
                 var json_obj = $.parseJSON(data); //parse JSON
                 var total = json_obj.total_results;
                 if (total > 10) {
                     total = 10;
                 }

                 var movieHTML = '';
                 //var movieHead += '<tr><th>Title</th><th>Poster</th><th>ReleaseDate</th><th>Add to Favourites</th></tr>';
                 for (var i = 0; i < total; i++) {
                     var posterpath = 'http://image.tmdb.org/t/p/w185/' + json_obj.results[i].poster_path;
                     var movobj = {
                         title: json_obj.results[i].title,
                         poster: posterpath,
                         release_date: json_obj.results[i].release_date
                     };
                     var strobj = JSON.stringify(movobj);

                     movieHTML += '<tr>'
                     movieHTML += '<td>' + json_obj.results[i].title + '</td>';
                     movieHTML += '<td>' + '<img src=' + posterpath + '>' + '</td>';
                     movieHTML += '<td>' + json_obj.results[i].release_date + '</td>';
                     movieHTML += "<td><button onclick='addfavourites(event)' value='" + strobj + "'><span class='glyphicon glyphicon-heart'></span>Add to Favourite</button></td>";
                     movieHTML += '</tr>';
                 }
                 

                 //$("#movies thead").html(movieHead);
                 $("#movies tbody").html(movieHTML);

             }

         });
     }
     //var favourites = [];
     /*function for add the fav movies in the database */
 function addfavourites(event) {
     $.ajax({
         url: '/movie/add',
         type: 'POST',
         data: {data : event.target.value,
                username: localStorage.getItem("username")}

     });
 }

 

 /*function for dispaly the fav movies in the database */
 function displayfavourites() {
         $.ajax({
             url: '/movie/view',
             type: 'GET',
             data :{username : localStorage.getItem("username")},
             success: function(data) {
                 var movieHTML = '';
                 for (let i = 0; i < data.length; i++) {
                     var deletemovie = data[i].title;
                     //var posterpath='http://image.tmdb.org/t/p/w185/'+favourites.results[i].poster_path
                     //movieHTML += '<tr><th>Title</th><th>Poster</th><th>ReleaseDate</th></tr>';
                     movieHTML += '<tr>';
                     movieHTML += '<td>' + data[i].title + '</td>';
                     movieHTML += '<td>' + '<img src=' + data[i].poster + '>' + '</td>';
                     movieHTML += '<td>' + data[i].release_date + '</td>';
                     movieHTML += "<td><button onclick='deletefavourites(event)' value='" + deletemovie + "'>delete</button></td>";
                     movieHTML += '</tr>';

                 }
                 $("#movies tbody").html(movieHTML);
             },
             error: function(err) {
                 exit;
                 console.log(err);

             }
         });

     }
     /*function for delete the fav movies in the database */
 function deletefavourites(event) {
     $.ajax({
         url: '/movie/delete',
         type: 'GET',
         data: {
             title: event.target.value,
             username : localStorage.getItem("username")
         },
         success: function(data) {
             alert("You have deleted a Movie from favourite");
             displayfavourites();
         }
     });
 }