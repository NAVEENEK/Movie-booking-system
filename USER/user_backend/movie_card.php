<?php

include("../../db.php");

header("Content-Type: application/json");

/* NOW SHOWING */
$nowShowingQuery = "SELECT 
                        movie_id,
                        title AS movie_name,
                        genre,
                        poster,
                        rating
                    FROM movie
                    ORDER BY movie_id DESC";

$nowResult = $conn->query($nowShowingQuery);

$nowShowing = [];

while($row = $nowResult->fetch_assoc()){
    $nowShowing[] = $row;
}


/* TOP RATED */
$topRatedQuery = "SELECT 
                        movie_id,
                        title AS movie_name,
                        genre,
                        poster,
                        rating
                 FROM movie
                 ORDER BY rating DESC, movie_id DESC
                 LIMIT 6";

$topResult = $conn->query($topRatedQuery);

$topRated = [];

while($row = $topResult->fetch_assoc()){
    $topRated[] = $row;
}


/* FINAL OUTPUT */
echo json_encode([
    "nowShowing" => $nowShowing,
    "topRated" => $topRated
]);

?>