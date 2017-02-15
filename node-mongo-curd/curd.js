//Filename: crud.js
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var MongoClient = require('mongodb').MongoClient;
var dbHost = 'mongodb://localhost:27017/test';
var myCollection = "crud";
var dbConn;

var bookInsertHandler = function(err, recs){
  if(err) throw err;
  console.log("Successfully inserted the book into database");
  printMenu(dbConn);
}

var bookUpdateHandler = function(err, recs){
  if(err) throw err;
  console.log("Successfully updated the book");
  printMenu(dbConn);
}
var bookDeleteHandler = function(err, recs){
  if(err) throw err;
  console.log("Successfully deleted the book");
  printMenu(dbConn);
}
var printMenu = function(db){
  console.log("Welcome to CRUD demo using Node.js and MongoDB");
  console.log("1. Insert a new Book");
  console.log("2. List all the books");
  console.log("3. Update the book by ISBN");
  console.log("4. Delete the book by ISBN");
  console.log("5. Quit");
  rl.question("Enter your choice: ", function(answer){
    console.log("Choice entered is: " + answer);
    switch(answer){
      case "1":
        insertBook(dbConn);
        break;
      case "2":
        listBooks(dbConn);
        break;
      case "3":
        updateBook(dbConn);
        break;
      case "4":
        deleteBook(dbConn);
        break;
      case "5":
        console.log("Press Ctrl+C to exit the program");
        return;
    }

  })
}

var insertBook = function(db){
  rl.question("Enter the name of the book: ", function(bookName){
     rl.question("Enter the ISBN of the book: ", function(isbn){
       rl.question("Enter the authors of the book[Comma separated if more than 1]: ", function(author){
         rl.question("Enter the total number of pages: ", function(pageCount){
           db.collection(myCollection).find({isbn: isbn},{},{}).toArray(
             function(err, docs){
               if ( docs.length > 0){
                 console.log("Book with ISBN " + isbn + " already exists");
                 printMenu(dbConn);
               }else{
                 db.collection(myCollection).insert({
                    'name':bookName,
                    'isbn': isbn,
                    'author': author,
                    'pages': pageCount
                  }, bookInsertHandler);
               }
             }
           );
         });
       });
     });
  });
}

var listBooks = function(db){
  db.collection(myCollection).find({},{},{}).toArray(
    function(err, docs){
      for(index in docs){
        console.log(docs[index]);
      }
      printMenu(dbConn);
    }
  );
}

var updateBook = function(db){
  rl.question("Enter the ISBN of the book you want to update: ", function(answer){

    db.collection(myCollection).find({isbn: answer},{},{}).toArray(
      function(err, docs){
        if ( docs.length == 0){
          console.log("Book with ISBN " + isbn + " not found");
          printMenu(dbConn);
        }else{
          rl.question("Enter the name of the book: ", function(bookName){
               rl.question("Enter the authors of the book[Comma separated if more than 1]: ", function(author){
                 rl.question("Enter the total number of pages: ", function(pageCount){
                         db.collection(myCollection).update({"isbn":answer}, {
                            'name':bookName,
                            'author': author,
                            'pages': pageCount,
                            'isbn':answer
                          }, bookUpdateHandler);
                 });
               });
          });
        }
      });
  });
}

var deleteBook = function(db){
  rl.question("Enter the ISBN of the book you want to update: ", function(answer){
    db.collection(myCollection).find({isbn: answer},{},{}).toArray(
      function(err, docs){
        if ( docs.length == 0){
          console.log("Book with ISBN " + answer + " not found");
          printMenu(dbConn);
        }else{
          db.collection(myCollection).remove({"isbn":answer}, bookDeleteHandler);
        }
      });
  });
}

MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbConn = db;
  printMenu();
});
