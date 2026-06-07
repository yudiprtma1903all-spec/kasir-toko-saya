const App = {
    data: JSON.parse(localStorage.getItem('kasir_data')) || {
        toko: { nama: "KASIR TOKO SAYA", alamat: "Jl. UMKM No. 1" },
        produk: [],
        transaksi: []
    },

    save() {
        localStorage.setItem('kasir_data', JSON.stringify(this.data));
    },

    // 1. Fitur Produk
    tambahProduk(produk) {
        this.data.produk.push({ ...produk, sku: 'SKU-' + Date.now() });
        this.save();
    },

    // 2. Fitur Kasir (Proses Transaksi)
    prosesCheckout(cart, metode) {
        const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
        const transaksi = {
            id: `TRX-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Date.now().toString().slice(-4)}`,
            date: new Date().toLocaleString(),
            items: cart,
            total: total,
            metode: metode
        };
        
        this.data.transaksi.push(transaksi);
        
        // Update Stok
        cart.forEach(item => {
            let p = this.data.produk.find(p => p.sku === item.sku);
            if (p) p.stok -= item.qty;
        });

        this.save();
        return transaksi;
    },

    // 3. Render Engine Sederhana
    render(view) {
        const app = document.getElementById('app');
        if (view === 'dashboard') {
            const omzet = this.data.transaksi.reduce((s, t) => s + t.total, 0);
            app.innerHTML = `
                <div class="card">
                    <h2>${this.data.toko.nama}</h2>
                    <p>Total Omzet: Rp ${omzet.toLocaleString()}</p>
                    <button onclick="App.render('kasir')">Buka Kasir</button>
                    <button onclick="App.render('produk')">Kelola Produk</button>
                </div>
            `;
        } else if (view === 'produk') {
            app.innerHTML = `<h2>Data Produk</h2><button onclick="App.render('dashboard')">Kembali</button>`;
            // Tambahkan list produk di sini
        }
    }
};

// Inisialisasi awal
App.render('dashboard');
