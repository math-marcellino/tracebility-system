## Melakukan Preview Website

Untuk menginstall dependency pada project, maka jalankan command berikut:
```
npm install
```

Setelah seluruh dependecy terinstall, maka development server dan preview website secara local dapat dilakukan. Bukalah terminal pada folder `tracebility-system`, lalu jalankan command berikut:

```bash
npm run dev
```

Setelah itu, bukalah [http://localhost:3000](http://localhost:3000) melalui browser untuk melihat hasil.

## Fungsionalitas
### 1. Menambah Data Supply Chain
Pada halaman utama, terdapat sebuah form untuk menambahkan data baru dan menyimpannya ke dalam smart contract pada jaringan Polygon (saat ini `Mumbai Testnet`, yaitu testnet dari `Polygon Mainnet`)

![image](https://user-images.githubusercontent.com/79161142/157717136-a29adfbd-5a62-406a-974b-058533b61ee1.png)

Ketika form telah diisi dan tombol submit ditekan, maka secara otomatis sistem akan meng-submit transaksi pada jaringan blockchain `Mumbai Testnet` menggunakan wallet dengan private key yang sudah didefinisikan dalam `.env`. Jika transaksi tersebut telah terkonfirmasi dalam beberapa block, maka data kemudian akan muncul di dalam tabel.

### 2. Navigation Menu
Pada setiap halaman yang ada pada webiste, terdapat suatu tombol yang berada pada kiri atas halaman. Tombol tersebut berfungsi sebagai navigasi untuk berpindah halaman. Pada navigation menu terdapat dua list pilihan halaman yang dapat kita tuju yaitu halaman menambah data (create Item) dan halaman tracing data (table).

![image](https://user-images.githubusercontent.com/79161142/157606346-c4c2e8f1-f17c-4840-bd35-35a30a80500d.png)

### 3. Username
Pada setiap halaman yang ada pada website, terdapat suatu text berupa nama user yang telah melakukan login. Text tersebut berada pada kanan atas halaman. Ketika user telah melakukan login pada website kemudian melakukan fitur menambah data, maka nama pemverifikasi akan otomatis tercatat sesuai dengan nama username yang melakukan login.

![image](https://user-images.githubusercontent.com/79161142/157717609-f0b56b80-6ab5-48ed-b6b3-601064af3e37.png)

### 4. Tracing Data Supply Chain
Pada halaman table, terdapat sebuah tabel yang menampilkan log dari seluruh transaksi penambahan data pada smart contract yang pernah terjadi.

![image](https://user-images.githubusercontent.com/79161142/157717743-c53a3566-0657-4bde-95f8-762fa6aac42f.png)

Note: Saat ini tabel masih menampilkan hanya ID makanan saja, tetapi untuk kedepannya smart contract akan diupdate agar dapat langsung menampilkan nama makanannya.

## TODO
#### 1. Menambahkan kolom berissi tombol `Update` pada tabel untuk data yang memiliki step 0-2 (karena step 3 merupakan tujuan akhir dari supply chain). Ketika tombol update ditekan, maka akan ditampilkan sebuah form untuk mengupdate kehalalan dari item tertentu beserta dengan pemverifikasinya.
