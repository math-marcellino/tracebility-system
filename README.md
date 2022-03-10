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

![image](https://user-images.githubusercontent.com/81855912/157589350-548e70f8-7c96-431b-8e25-f5336c5999fc.png)

Ketika form telah diisi dan tombol submit ditekan, maka secara otomatis sistem akan meng-submit transaksi pada jaringan blockchain `Mumbai Testnet` menggunakan wallet dengan private key yang sudah didefinisikan dalam `.env`. Jika transaksi tersebut telah terkonfirmasi dalam beberapa block, maka data kemudian akan muncul di dalam tabel.

### 2. Tracing Data Supply Chain
Pada bagian bawah form, terdapat sebuah tabel yang menampilkan log dari seluruh transaksi penambahan data pada smart contract yang pernah terjadi.

![image](https://user-images.githubusercontent.com/81855912/157590077-207238cd-44ea-416b-92a9-7ca6fe5d0db1.png)

Note: Saat ini tabel masih menampilkan hanya ID makanan saja, tetapi untuk kedepannya smart contract akan diupdate agar dapat langsung menampilkan nama makanannya.

## TODO
#### 1. Menambahkan kolom berissi tombol `Update` pada tabel untuk data yang memiliki step 0-2 (karena step 3 merupakan tujuan akhir dari supply chain). Ketika tombol update ditekan, maka akan ditampilkan sebuah form untuk mengupdate kehalalan dari item tertentu beserta dengan pemverifikasinya.
