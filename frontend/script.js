// Basic JavaScript Interactivity

// Modal Toggles
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// Search Mock
function handleSearch() {
    const query = document.getElementById('mainSearch').value;
    const resultMsg = document.getElementById('searchResult');
    
    if (query.trim() === '') {
        resultMsg.style.color = 'var(--accent-warning)';
        resultMsg.textContent = 'Please enter a book title or author.';
        return;
    }
    
    resultMsg.style.color = 'var(--accent-success)';
    resultMsg.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Searching for "${query}"...`;
    
    setTimeout(() => {
        resultMsg.textContent = `Found results for "${query}". Scroll down to view.`;
        document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// Tab Switching
function switchTab(event, tabId) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all buttons
    const tabBtns = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('active');
    }
    
    // Show current tab and set active class
    document.getElementById(tabId).style.display = "block";
    setTimeout(() => {
        document.getElementById(tabId).classList.add('active');
    }, 10);
    event.currentTarget.classList.add('active');
}

// Fine Calculator
function calculateFine() {
    const daysKept = parseInt(document.getElementById('daysKept').value);
    const resultDiv = document.getElementById('fineResult');
    
    if (isNaN(daysKept) || daysKept < 0) {
        resultDiv.style.color = 'var(--accent-warning)';
        resultDiv.textContent = 'Please enter a valid number of days.';
        return;
    }
    
    const maxDays = 14;
    const finePerDay = 2; // ₹2
    
    if (daysKept <= maxDays) {
        resultDiv.style.color = 'var(--accent-success)';
        resultDiv.textContent = 'No fine. Book returned on time.';
    } else {
        const extraDays = daysKept - maxDays;
        const totalFine = extraDays * finePerDay;
        resultDiv.style.color = 'var(--accent-danger)';
        resultDiv.textContent = `Fine Pending: ₹${totalFine} (${extraDays} days late)`;
    }
}

// --- Dynamic Book Management System ---

const initialBooks = [
    {
        id: 'bk-1',
        title: 'Data Structures using C',
        author: 'Reema Thareja',
        rack: 'CSE-04',
        shelf: '2',
        coverClass: 'book-physics',
        totalCopies: 5,
        availableCopies: 5
    },
    {
        id: 'bk-2',
        title: 'Artificial Intelligence',
        author: 'Stuart Russell',
        rack: 'AIML-01',
        shelf: '1',
        coverClass: 'book-ai',
        totalCopies: 5,
        availableCopies: 1
    },
    {
        id: 'bk-3',
        title: 'Cryptography and Network Security',
        author: 'William Stallings',
        rack: 'ICB-02',
        shelf: '3',
        coverClass: 'book-cyber',
        totalCopies: 5,
        availableCopies: 0
    },
    {
        id: 'bk-4',
        title: 'Thermodynamics',
        author: 'Yunus A. Cengel',
        rack: 'MECH-09',
        shelf: '5',
        coverClass: 'book-history',
        totalCopies: 5,
        availableCopies: 3
    }
];

let ksitBooks = [];

function initBooks() {
    const stored = localStorage.getItem('ksit_books_data');
    if (stored) {
        ksitBooks = JSON.parse(stored);
    } else {
        ksitBooks = JSON.parse(JSON.stringify(initialBooks));
        localStorage.setItem('ksit_books_data', JSON.stringify(ksitBooks));
    }
    renderBooks();
}

function renderBooks() {
    const grid = document.getElementById('bookGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    ksitBooks.forEach(book => {
        let statusHtml = '';
        let buttonHtml = '';
        
        if (book.availableCopies > 1) {
            statusHtml = `<span class="status available" style="background-color: #4caf50;">Available: ${book.availableCopies} / ${book.totalCopies} copies</span>`;
            buttonHtml = `<button class="btn btn-primary" onclick="borrowBook('${book.id}', this)">Borrow Book</button>`;
        } else if (book.availableCopies === 1) {
            statusHtml = `<span class="status warning" style="background-color: #ff9800; color: #fff;">Last copy left! (1/${book.totalCopies})</span>`;
            buttonHtml = `<button class="btn btn-primary" style="background-color: #ff9800; color: #fff;" onclick="borrowBook('${book.id}', this)">Borrow Book</button>`;
        } else {
            statusHtml = `<span class="status unavailable" style="background-color: #f44336;">All copies issued (0/${book.totalCopies})</span>`;
            buttonHtml = `<button class="btn btn-secondary" onclick="downloadPdf('${book.title}')"><i class="fas fa-download"></i> Download PDF</button>`;
        }

        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-cover ${book.coverClass}">
                ${statusHtml}
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <div class="locator">
                    <span><i class="fas fa-th"></i> Rack: <strong>${book.rack}</strong></span>
                    <span><i class="fas fa-layer-group"></i> Shelf: <strong>${book.shelf}</strong></span>
                </div>
                ${buttonHtml}
            </div>
        `;
        grid.appendChild(card);
    });
}

function borrowBook(id, btnElement) {
    const bookIndex = ksitBooks.findIndex(b => b.id === id);
    if (bookIndex > -1 && ksitBooks[bookIndex].availableCopies > 0) {
        
        // Button click feedback
        const originalText = btnElement.innerText;
        btnElement.innerText = "Processing...";
        btnElement.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            ksitBooks[bookIndex].availableCopies -= 1;
            localStorage.setItem('ksit_books_data', JSON.stringify(ksitBooks));
            renderBooks(); // Re-render to update UI
        }, 300);
    }
}

function downloadPdf(title) {
    alert(`Initiating PDF download for "${title}"...`);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initBooks);
