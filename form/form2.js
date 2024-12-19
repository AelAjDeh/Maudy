// js form
document.addEventListener("DOMContentLoaded", function () {
    const namaInput = document.getElementById("nama");
    const emailInput = document.getElementById("email");
    const alamatInput = document.getElementById("alamat");
    const jenisSampahInput = document.getElementById("jenisSampah");
    const beratInput = document.getElementById("berat");
    const tambahButton = document.getElementById("tambah");
    const selesaiButton = document.getElementById("selesai");
    const cetakButton = document.getElementById("cetakStruk");
    const daftarItem = document.getElementById("daftarItem");
    const totalHargaElement = document.getElementById("totalHarga");
    const tableBody = document.getElementById("tableBody");
    const strukElement = document.getElementById("struk"); // Elemen struk

    let totalHarga = 0;

    // harga barang
    const hargaPerKg = {
        "Sisa Makanan": 4000,
        "Sisa Kulit Buah": 5000,
        "Sisa Sayur sayuran": 4500,
        "Daun Kering": 5500,
        "Rotan": 4000,
        "Ranting Pohon": 3500,
        "Kemasan": 700,
        "Styrofoam Bersih": 3000,
        "Seng": 1900,
        "Besi": 3400,
        "Alumunium": 9000,
        "Tembaga": 39000,
        "Per Kasur": 3000,
        "Arsip": 1700,
        "Majalah / Duplek / Karton": 1300,
        "Dus / Kardus": 2500,
        "Kertas Campur": 1500,
        "Duplek telur": 1000,
        "Koran": 3300,
        "Beling": 2000,
        "Botol bir bintang ukuran besar": 2500,
    };

    // struk table
    function tambahItem() {
        const nama = namaInput.value;
        const email = emailInput.value;
        const alamat = alamatInput.value;
        const jenisSampah = jenisSampahInput.options[jenisSampahInput.selectedIndex].text;
        const berat = parseFloat(beratInput.value);

        if (!nama || !email || !alamat || !berat || berat <= 0) {
            alert("Harap lengkapi data pelanggan dan masukkan berat yang valid!");
            return;
        }

        const jenisKey = jenisSampah.split(" (")[0];
        const hargaItem = berat * (hargaPerKg[jenisKey] || 0);
        totalHarga += hargaItem;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${nama}</td>
            <td>${email}</td>
            <td>${alamat}</td>
            <td>${jenisSampah}</td>
            <td>${berat} kg</td>
            <td>
                <button class="edit" style="margin-right: 5px; width: 50px">Edit</button>
                <button class="hapus" style="width: 70px">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);

        totalHargaElement.textContent = `Total Harga: Rp ${totalHarga.toLocaleString()}`;
        beratInput.value = "";
    }

    // struktur teks
    function selesaiTransaksi() {
        if (totalHarga === 0) {
            alert("Tidak ada transaksi untuk diselesaikan!");
            return;
        }
        document.getElementById("strukNama").textContent = namaInput.value;
        document.getElementById("strukEmail").textContent = emailInput.value;
        document.getElementById("strukAlamat").textContent = alamatInput.value;
        document.getElementById("strukSampah").textContent = alamatInput.value;
        document.getElementById("strukBerat").textContent = alamatInput.value;

        alert("Transaksi selesai. Struk sudah dibuat!");
    }

    function cetakStruk() {
        if (totalHarga === 0) {
            alert("Tidak ada data untuk dicetak!");
            return;
        }

        let strukHTML = `
            <h2>Struk Transaksi</h2>
            <p><strong>Nama:</strong> ${namaInput.value}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>Alamat:</strong> ${alamatInput.value}</p>
            <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr>
                        <th>Jenis Sampah</th>
                        <th>Berat (kg)</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // array untuk menyimpan, mengakses dan memanipulasi kumpulan data dalam satu variabel
        Array.from(tableBody.children).forEach((row) => {
            const cells = row.children;
            strukHTML += `
                <tr>
                    <td>${cells[3].textContent}</td>
                    <td>${cells[4].textContent}</td>
                    <td>${cells[5].textContent}</td>
                </tr>
            `;
        });

        strukHTML += `
                </tbody>
            </table>
            <p><strong>Total Harga:</strong> Rp ${totalHarga.toLocaleString()}</p>
        `;

        strukElement.innerHTML = strukHTML;
        window.print();
    }

    tambahButton.addEventListener("click", tambahItem);
    selesaiButton.addEventListener("click", selesaiTransaksi);
    cetakButton.addEventListener("click", cetakStruk);

    // btn edit dan delete
    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit")) {
            editItem(event.target);
        } else if (event.target.classList.contains("hapus")) {
            hapusItem(event.target);
        }
    });

    // function edit
    function editItem(button) {
        const row = button.parentElement.parentElement;
        const cells = row.children;

        namaInput.value = cells[0].textContent;
        emailInput.value = cells[1].textContent;
        alamatInput.value = cells[2].textContent;
        beratInput.value = parseFloat(cells[4].textContent.split(" ")[0]);

        const jenisKey = cells[3].textContent.split(" (")[0];
        jenisSampahInput.value = jenisKey;

        const beratLama = parseFloat(cells[4].textContent.split(" ")[0]);
        totalHarga -= beratLama * hargaPerKg[jenisKey];

        tableBody.removeChild(row);
        totalHargaElement.textContent = `Total Harga: Rp ${totalHarga.toLocaleString()}`;
    }

    // function delete
    function hapusItem(button) {
        const row = button.parentElement.parentElement;
        const cells = row.children;

        const jenisKey = cells[3].textContent.split(" (")[0];
        const berat = parseFloat(cells[4].textContent.split(" ")[0]);
        const hargaItem = berat * hargaPerKg[jenisKey];

        totalHarga -= hargaItem;
        totalHargaElement.textContent = `Total Harga: Rp ${totalHarga.toLocaleString()}`;
        tableBody.removeChild(row);
    }
});
