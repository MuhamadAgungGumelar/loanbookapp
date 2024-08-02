# TECHNICAL TEST - Backend Developer - PT EIGEN TRI MATHEMA

## Description Test

Membuat sebuah API Endpoint untuk peminjaman Buku oleh Anggota menggunakan express.js, swagger API dan mongodb

## Fitur Utama

### 1. Anggota dapat meminjam buku dengan syarat dan ketentuan:

Anggota tidak boleh meminjam lebih dari 2 buku

Buku yang dipinjam tidak akan dipinjam oleh anggota lain

Anggota saat ini tidak sedang dikenakan penalti

### 2. Anggota mengembalikan buku dengan kondisi:

Buku yang dikembalikan adalah buku yang dipinjam oleh anggota

Jika buku dikembalikan setelah lebih dari 7 hari, anggota akan dikenakan denda. Anggota yang dikenakan denda tidak dapat meminjam buku selama 3 hari.

### 3. Periksa buku:

Menampilkan semua buku dan jumlahnya

Buku yang dipinjam tidak dihitung

### 4. Periksa Anggota:

Menampilkan semua anggota yang ada

Jumlah buku yang dipinjam oleh setiap anggota


## Teknologi yang Digunakan

Database: Mongodb

Programming Language": Node.js v20.16.0

Framework: Express.js 

API Endpoint Tools: Swagger API

Unit Testing: Jest dan Supertest

## Panduan Penggunaan Aplikasi

### 1. Clone Repository
    https://github.com/MuhamadAgungGumelar/loanbookapp.git
    
### 2. Install Dependencie
    npm install

### 3. Setup Environment

Atur konfigurasi database mongodb dan port yang digunakan sesuai environment yang dimiliki pada file .env

    MONGO_URI=mongodb://localhost:27017/(sesuaikan dengan database yang dimiliki)
    PORT=5000

### 4. Menjalankan Aplikasi

    npm run dev

### 5. Mengakses swagger API
    http://localhost:5000/api-docs/

### 6. Menjalankan Unit Test

    npm run test

## Mock Data

Catatan: Gunakan Mock Data untuk menguji masing-masing dari Endpoint API yang disediakan

### Book
    [
        {
            code: "JK-45",
            title: "Harry Potter",
            author: "J.K Rowling",
            stock: 1
        },
        {
            code: "SHR-1",
            title: "A Study in Scarlet",
            author: "Arthur Conan Doyle",
            stock: 1
        },
        {
            code: "TW-11",
            title: "Twilight",
            author: "Stephenie Meyer",
            stock: 1
        },
        {
            code: "HOB-83",
            title: "The Hobbit, or There and Back Again",
            author: "J.R.R. Tolkien",
            stock: 1
        },
        {
            code: "NRN-7",
            title: "The Lion, the Witch and the Wardrobe",
            author: "C.S. Lewis",
            stock: 1
        },
    ]

### Member
    [
        {
            code: "M001",
            name: "Angga",
        },
        {
            code: "M002",
            name: "Ferry",
        },
        {
            code: "M003",
            name: "Putri",
        },
    ]

## Penggunaan Endpoint API

### Book

#### Menampilkan Semua Data Buku
    GET /api/books

#### Menambahkan Data Buku ke Database  
    POST /api/books

### Member

#### Menampilkan Semua Data Member
    GET /api/members

#### Menambahkan Data Member ke Database  
    POST /api/members

#### Mengajukan Peminjaman Buku oleh Member  
    POST /api/members/borrow

#### Menambahkan Pengembalian Buku oleh Member  
    POST /api/members/return

## ALGORITMA TEST - Backend Developer - PT EIGEN TRI MATHEMA

### 1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

    function reverseAlphabet(str) {
        const alphabets = str.match(/[A-Za-z]/g);
        const numbers = str.match(/\d+/g);
        
        const reversedAlphabets = alphabets.reverse().join('');
        
        return reversedAlphabets + (numbers ? numbers.join('') : '');
    }

    const result1 = reverseAlphabet("NEGIE1");
    console.log(result1);

### 2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

    function longestWord(sentence) {
        const words = sentence.split(' ');
        let longest = words[0];
        
        for (let word of words) {
            if (word.length > longest.length) {
                longest = word;
            }
        }
        
        return longest;
    }

    const sentence = "Saya sangat senang mengerjakan soal algoritma";
    const longest = longestWord(sentence);
    console.log(`${longest}: ${longest.length} character`);

### 3. Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

    function countOccurrences(input, query) {
        const counts = query.map(q => input.filter(item => item === q).length);
        return counts;
    }

    const INPUT = ['xc', 'dz', 'bbb', 'dz'];
    const QUERY = ['bbb', 'ac', 'dz'];
    const result3 = countOccurrences(INPUT, QUERY);
    console.log(result3);

### 4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN

    function diagonalDifference(matrix) {
        let primaryDiagonal = 0;
        let secondaryDiagonal = 0;
        
        for (let i = 0; i < matrix.length; i++) {
            primaryDiagonal += matrix[i][i]; 
            secondaryDiagonal += matrix[i][matrix.length - 1 - i];
        }
        
        return Math.abs(primaryDiagonal - secondaryDiagonal);
    }

    const matrix = [
        [1, 2, 0],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const result4 = diagonalDifference(matrix);
    console.log(result4);


