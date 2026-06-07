const App = {
    data: JSON.parse(localStorage.getItem('kasir_data')) || {
        toko: { nama: "KASIR TOKO SAYA", alamat: "Jl. UMKM" },
        produk: [], // Array untuk simpan barang
        transaksi: [] // Array untuk simpan riwayat
    },

    save() { localStorage.setItem('kasir_data', JSON.stringify(this.data)); },

    // Tambah Produk Baru
    tambahProduk(nama, harga, stok) {
        this.data.produk.push({ sku: 'P' + Date.now(), nama, harga, stok });
        this.save();
        alert("Produk berhasil ditambah!");
    },

    // Proses Jual
    jual(sku, qty) {
        const p = this.data.produk.find(x => x.sku === sku);
        if (!p || p.stok < qty) {
            alert("Stok tidak cukup!");
            return;
        }
        p.stok -= qty;
        this.data.transaksi.push({
            sku, nama: p.nama, qty, total: p.harga * qty, date: new Date().toLocaleDateString()
        });
        this.save();
        alert("Transaksi berhasil!");
    }
};
