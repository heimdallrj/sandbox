<?php
use IntrepidGroup\SampleApplication\Repository\StaticBookRepository;
require_once __DIR__.'/vendor/autoload.php';

// set template env.
$twig = new Twig_Environment(new Twig_Loader_Filesystem(__DIR__.'/src/templates'));

$bookRepository = new StaticBookRepository();
$filter = null;

// handle $_GET Requests
// list-all
if (isset($_GET['list']) && $_GET['list'] === "all") {
  $books = $bookRepository->fetchAll($filter);

  $twig->display('home.twig', array(
    'filtered' => false,
    'books' => $books
  ));
  return;
}

// list-filtered
if (isset($_GET['list']) && $_GET['list'] === "filtered") {
  if (isset($_GET['filter']) && $_GET['filter']) {
    $filter = htmlspecialchars($_GET['filter']);
    
    $books = $bookRepository->fetchAll($filter);
      $twig->display('home.twig', array(
        'filtered' => true,
        'books' => $books,
        'language' => explode("-", $filter)[1],
        'hideLanguagesField' => true
      ));    
  } else {
    // if invalid URL params;
    // redirect to index
    header("location:index.php");
  }
  return;
}

// list-sorted
if (isset($_GET['list']) && $_GET['list'] === "sorted") {
  if (isset($_GET['by']) && $_GET['by']) {
    $sortedBy = htmlspecialchars($_GET['by']);
    
    $books = $bookRepository->fetchAll($filter);
    $sorted = $bookRepository->getSorted($books, $sortedBy);

      $twig->display('home.twig', array(
        'sorted' => true,
        'books' => $sorted,
        'sortedBy' => $sortedBy
      ));    
  } else {
    // if invalid URL params;
    // redirect to index
    header("location:index.php");
  }
  return;
}

// Render the homepage
$languages = $bookRepository->getAllLanguages();
$titles = $bookRepository->getAllTitles();

$twig->display('index.twig', array(
  'languages' => $languages,
  'titles' => $titles
));
