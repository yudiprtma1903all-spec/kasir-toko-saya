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
// Tambahkan fungsi ini di dalam object App di app.js
App.renderProduk = function() {
    const list = document.getElementById('list-produk');
    list.innerHTML = '<h3>Daftar Produk:</h3>';
    this.data.produk.forEach(p => {
        list.innerHTML += `
            <div class="produk-item">
                <b>${p.nama}</b> - Rp ${p.harga} (Stok: ${p.stok})
            </div>
        `;
    });
};

// Pasang Event Listener untuk Form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-produk');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const harga = parseInt(document.getElementById('harga').value);
            const stok = parseInt(document.getElementById('stok').value);
            
            App.tambahProduk(nama, harga, stok);
            form.reset();
            App.renderProduk(); // Refresh list
        });
    }
    App.renderProduk(); // Load list saat pertama buka
});
