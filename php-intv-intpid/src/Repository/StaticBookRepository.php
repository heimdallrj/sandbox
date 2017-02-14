<?php
namespace IntrepidGroup\SampleApplication\Repository;

use IntrepidGroup\SampleApplication\Entity\Book;

/**
 * Class StaticBookRepository
 *
 * This class returns acts as a Book Repository for a statically defined list of books
 *
 * @package IntrepidGroup\SampleApplication\Repository
 */
class StaticBookRepository implements BookRepositoryInterface
{
    private $books = array();

    public function __construct()
    {
        $this->preloadStaticBooks();
    }

    /**
     * Retrieve and return a collection of all books with no filtering
     *
     * @return Book[]
     */
    public function fetchAll($filter)
    {
        if ($filter) {
          $filter = explode("-",$filter);
          $filterKey = $filter[0];
          $filterVal = $filter[1];

          $books = array_filter($this->books, function($book) use (&$filterVal) {
              $lang = $book->getLanguage();
              return $lang === $filterVal;
          });
          return $books;
        }

        return $this->books;
    }

    /**
     *
     * @return []
     */
    public function getSorted($books, $sortedBy) {
      $booksToSort = $books;
      $length=count($booksToSort);

      for ($i=1; $i<$length; $i++) {
        $obj = $booksToSort[$i];
        $j = $i;

        switch ($sortedBy) {
          case "Year":
            while($j>0 && $booksToSort[$j-1]->getYear()>$obj->getYear()) {
              $booksToSort[$j] = $booksToSort[$j-1];
              $j = $j-1;
            }
            break;

          default:
            // XX: Need to improve this sorting logic here;
            // This is buggy for string sorting
            $handler = strcmp($booksToSort[$j-1]->getTitle(), $obj->getTitle());
            $flag = true;
            if ((int)$handler < 0) { $flag = false; }
            while($j>0 && $flag) {
              $booksToSort[$j] = $booksToSort[$j-1];
              $j = $j-1;
            }
            break;
        }

        $booksToSort[$j] = $obj;
      }

      return $booksToSort;
    }

    /**
     *
     * @return []
     */
    public function getAllLanguages() {
      $languages = array();

      array_filter($this->books, function($book) use (&$languages) {
          $lang = $book->getLanguage();
          $languages[] = $lang;
      });

      return array_unique($languages);
    }

    /**
     *
     * @return []
     */
    public function getAllTitles() {
      return ["Title", "Author", "Year", "Language"];
    }

    /**
     * Preload the static list of books
     */
    private function preloadStaticBooks()
    {
        $this->books[] = new Book('1', 'Finnegans Wake', 'Janes Joyce', 'English', 1941);
        $this->books[] = new Book('2', 'Don Quixote', 'Miguel De Cervantes', 'Spanish', 1615);
        $this->books[] = new Book('3', 'The Making of Americans', 'Gertrude Stein', 'English', 1925);
        $this->books[] = new Book('4', 'The Stranger', 'Albert Camus', 'French', 1942);
        $this->books[] = new Book('5', 'Pilgrims Progress', 'John Bunyan', 'English', 1684);
        $this->books[] = new Book('6', 'In Search of Lost Time', 'Marcel Proust', 'French', 1913);
        $this->books[] = new Book('7', 'Pale Fire', 'Valdimir Nabokov', 'English', 1962);
        $this->books[] = new Book('8', 'The Trial', 'Franz Kafka', 'German', 1925);
        $this->books[] = new Book('9', 'Ulysses', 'James Joyce', 'English', 1922);
        $this->books[] = new Book('10', 'The Name of the Rose', 'Umberto Eco', 'Italian', 1980);
        $this->books[] = new Book('11', 'The Gulag Archipelago', 'Aleksandr Solzhenitsyn', 'Russian', 1973);
        $this->books[] = new Book('12', 'The Diary of a Young Girl', 'Anne Frank', 'Dutch', 1947);
        $this->books[] = new Book('13', 'Gravity\'s Rainbow', 'Thomas Pynchon', 'English', 1973);
        $this->books[] = new Book('14', 'One Hundred Years of Solitude', 'Gabriel García Márquez', 'Spanish', 1967);
        $this->books[] = new Book('15', 'The Sound and the Fury', 'William Faulkner', 'English', 1929);
        $this->books[] = new Book('16', 'Confusion of Feelings', 'Stefan Zweig', 'German', 1927);
        $this->books[] = new Book('17', 'The Public Burning', 'Robert Coover', 'English', 1977);
        $this->books[] = new Book('18', 'The Joke', 'Milan Kundera', 'Czech', 1967);
    }
}