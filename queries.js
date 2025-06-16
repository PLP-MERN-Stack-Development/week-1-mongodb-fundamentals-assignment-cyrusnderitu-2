// # 🗄️ Week 1: MongoDB – Data Layer Fundamentals and Advanced Techniques


// ## 📂 Tasks

// && Task 1: MongoDB Setup

//&& Task 2: Basic CRUD Ops
    // Find all books in a specific genre
db.books.find({ genre: "Fiction" })
    // Find books published after 1980
db.books.find({ published_year: { $gt: 1980 } })
    // Find books published by a specific author
db.books.find({ author: "George Orwell" })
    // Update the price of a soecific book
db.books.updateOne(
    { title: "The Alchemist" },
    { $set: { price: 15.99 } }
);
    // Delete book by title
db.books.deleteOne({ title: "The Alchemist" });

//&& Task 3: Advanced Queries
    // Query a book that are both in stock and published after 2010
db.books.find({in_stock: true, published_year: {$gt: 2010 }});
    // Use projection to return only the title, author, and price fields in your queries
db.books.find({}, { title: 1, author: 1, price: 1 });
    // Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 }); // Ascending order
db.books.find().sort({ price: -1 }); // Descending order
    // Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().limit(5).skip(0); // First page
db.books.find().skip(5).limit(5); // Second page (skips the first 5 books)

//&& Task 4: Aggregation Pipeline
    // Aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([{
        $group: {
            _id: "$genre",
            avgPrice: { $avg: "$price" }
        }
    }
]);
    //  Aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
    {
        // Group by author and count the number of books for each author.
        $group: {
            _id: "$author",
            bookCount: { $sum: 1 }
        }
    },
    {
        // Sort in descending order by bookCount to get the author with the most books.
        $sort: { bookCount: -1 }
    },
    // Limit to get only the top author.
    {
        $limit: 1
    }
]);
    // Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        // Group by the 'decade' field and count the number of books in each decade
        $group: {
            _id: {$floor: { $divide:["$published_year", 10] }},
            bookCount: { $sum: 1 }
        }
    },
    {
        // Sort by decade in ascending order
        $sort: { _id: 1 }
    }
]);
