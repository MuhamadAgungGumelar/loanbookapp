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

