// Basic Variables and Arrays
var books = [
    // CSE Books
    { id: 1, title: "Data Structures in C", author: "Reema Thareja", dept: "CSE", total: 5, available: 5 },
    { id: 2, title: "Operating Systems Principles", author: "Abraham Silberschatz", dept: "CSE", total: 5, available: 5 },
    { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", dept: "CSE", total: 5, available: 5 },

    // CCE Books
    { id: 4, title: "Data Communications", author: "William Stallings", dept: "CCE", total: 5, available: 5 },
    { id: 5, title: "Wireless Networks", author: "Theodore Rappaport", dept: "CCE", total: 5, available: 5 },
    { id: 6, title: "Advanced Communication Systems", author: "Wayne Tomasi", dept: "CCE", total: 5, available: 5 },

    // ICB Books
    { id: 7, title: "Introduction to IoT", author: "Raj Kamal", dept: "ICB", total: 5, available: 5 },
    { id: 8, title: "Cyber Security Principles", author: "Charles J. Brooks", dept: "ICB", total: 5, available: 5 },
    { id: 9, title: "Blockchain Basics", author: "Daniel Drescher", dept: "ICB", total: 5, available: 5 },

    // AI & ML Books
    { id: 10, title: "Introduction to AI", author: "Stuart Russell", dept: "AI & ML", total: 5, available: 5 },
    { id: 11, title: "Machine Learning", author: "Tom M. Mitchell", dept: "AI & ML", total: 5, available: 5 },
    { id: 12, title: "The World of Bots", author: "Alan Turing", dept: "AI & ML", total: 5, available: 5 },

    // Mechanical Books
    { id: 13, title: "Engineering Mechanics", author: "S.S. Bhavikatti", dept: "Mechanical", total: 5, available: 5 },
    { id: 14, title: "Thermodynamics", author: "Yunus Cengel", dept: "Mechanical", total: 5, available: 5 },
    { id: 15, title: "Fluid Mechanics", author: "R.K. Bansal", dept: "Mechanical", total: 5, available: 5 },

    // Biotech Books
    { id: 16, title: "Principles of Biochemistry", author: "Albert Lehninger", dept: "Biotech", total: 5, available: 5 },
    { id: 17, title: "Genetics", author: "B.D. Singh", dept: "Biotech", total: 5, available: 5 },
    { id: 18, title: "Bioinformatics Basics", author: "Ignacimuthu", dept: "Biotech", total: 5, available: 5 },

    // CSD Books
    { id: 19, title: "Design Thinking", author: "Tim Brown", dept: "CSD", total: 5, available: 5 },
    { id: 20, title: "UI/UX Principles", author: "Don Norman", dept: "CSD", total: 5, available: 5 },
    { id: 21, title: "Graphic Design History", author: "Philip Meggs", dept: "CSD", total: 5, available: 5 },

    // ECE Books
    { id: 22, title: "Basic Electronics", author: "D.P. Kothari", dept: "ECE", total: 5, available: 5 },
    { id: 23, title: "Microprocessors", author: "Ramesh Gaonkar", dept: "ECE", total: 5, available: 5 },
    { id: 24, title: "Digital Logic Design", author: "Morris Mano", dept: "ECE", total: 5, available: 5 },

    // ETC Books
    { id: 25, title: "Telecommunication Systems", author: "T. Viswanathan", dept: "ETC", total: 5, available: 5 },
    { id: 26, title: "Antenna and Wave Propagation", author: "K.D. Prasad", dept: "ETC", total: 5, available: 5 },
    { id: 27, title: "Satellite Communications", author: "Timothy Pratt", dept: "ETC", total: 5, available: 5 }
];

// Check if we have saved data in the browser (localStorage)
var savedData = localStorage.getItem("ksit_books");
if (savedData != null) {
    // Load the saved data if it exists
    var loadedBooks = JSON.parse(savedData);
    
    // Simple check: if we added new books to the code but localstorage only has 4, we should ignore localstorage 
    // so our new 27 books actually show up!
    if(loadedBooks.length === books.length) {
        books = loadedBooks;
    }
}

// Function to show all books on the webpage
function displayBooks() {
    var bookGrid = document.getElementById("bookGrid");
    bookGrid.innerHTML = ""; // Clear existing books

    // Loop through each book using a basic for loop
    for (var i = 0; i < books.length; i++) {
        var currentBook = books[i];

        // Create HTML for each book
        var bookHTML = "<div class='book-card'>";
        bookHTML += "<h3>" + currentBook.title + "</h3>";
        bookHTML += "<p><b>Author:</b> " + currentBook.author + "</p>";
        bookHTML += "<p><b>Department:</b> " + currentBook.dept + "</p>";

        // Check copies to change color and text
        if (currentBook.available > 1) {
            bookHTML += "<p style='color: green;'><b>Available Copies: " + currentBook.available + "/" + currentBook.total + "</b></p>";
            bookHTML += "<button onclick='borrowBook(" + i + ")'>Borrow Book</button>";
        } 
        else if (currentBook.available == 1) {
            bookHTML += "<p style='color: orange;'><b>Last Copy Left! (1/5)</b></p>";
            bookHTML += "<button onclick='borrowBook(" + i + ")'>Borrow Book</button>";
        } 
        else {
            bookHTML += "<p style='color: red;'><b>No Copies Available (0/5)</b></p>";
            // Pass the index 'i' to the download function so it knows which book to reset
            bookHTML += "<button style='background-color: gray;' onclick='downloadPDF(" + i + ")'>Download PDF</button>";
        }

        bookHTML += "</div>";

        // Add the book HTML to the grid
        bookGrid.innerHTML += bookHTML;
    }
}

// Function to borrow a book
function borrowBook(index) {
    if (books[index].available > 0) {
        books[index].available = books[index].available - 1; // Reduce by 1
        
        // Save to browser
        localStorage.setItem("ksit_books", JSON.stringify(books));
        
        // Refresh the books on the screen
        displayBooks();
    }
}

// Function to download PDF and reset the book count
function downloadPDF(index) {
    alert("PDF download starting... The book stock will now be restocked!");
    
    // Reset the available copies back to the total (5)
    books[index].available = books[index].total;
    
    // Save the new restocked count to the browser
    localStorage.setItem("ksit_books", JSON.stringify(books));
    
    // Refresh the books on the screen
    displayBooks();
}

// Function to calculate fine
function calculateFine() {
    var days = document.getElementById("daysKept").value;
    var fine = 0;
    
    if (days > 14) {
        var extraDays = days - 14;
        fine = extraDays * 2; // Rs 2 per day
        document.getElementById("fineResult").innerText = "Fine to pay: Rs " + fine;
        document.getElementById("fineResult").style.color = "red";
    } else {
        document.getElementById("fineResult").innerText = "No fine. Book returned on time.";
        document.getElementById("fineResult").style.color = "green";
    }
}

// Run this function when the page loads
window.onload = function() {
    displayBooks();
};
