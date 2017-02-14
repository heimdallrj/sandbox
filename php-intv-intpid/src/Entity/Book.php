<?php
namespace IntrepidGroup\SampleApplication\Entity;

/**
 * Class Book
 *
 * This entity represents a single book and it's properties
 *
 * @package IntrepidGroup\SampleApplication\Entity
 */
class Book
{
    private $id = 0;
    private $title = '';
    private $author = '';
    private $language = '';
    private $year = 1970;

    public function __construct($id, $title, $author, $language, $year)
    {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->language = $language;
        $this->year = $year;
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * @return int
     */
    public function getYear()
    {
        return $this->year;
    }
}