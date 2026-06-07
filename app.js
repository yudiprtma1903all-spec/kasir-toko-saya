const App = {
    data: JSON.parse(localStorage.getItem('kasir_data')) || {
        toko: { nama: "Toko Saya", alamat: "Jl. Contoh" },
        produk: [],
        transaksi: []
    },
    save() { localStorage.setItem('kasir_data', JSON.stringify(this.data)); },
    render(view) {
        const app = document.getElementById('app');
        if (view === 'kasir') {
            app.innerHTML = `<h1>Halaman Kasir</h1><p>Data Produk: ${this.data.produk.length}</p>`;
        } else {
            app.innerHTML = `<h1>Dashboard</h1><p>Omzet: 0</p>`;
        }
    }
};
App.render('dashboard');
