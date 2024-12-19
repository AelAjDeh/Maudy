 

// buat tampilin data yang udah dimasukkan
function displayData() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    users.forEach((user, index) => {
        tableBody.innerHTML += `
        <tr> 
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.alamat}</td>
            <td>${user.JenisKelamin}</td>
            <td>
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Hapus</button>
            </td>
        <tr>
        `;  
    });    
}

function editData (index) {
    const user = users [index];
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("alamat").value = user.alamat;
    document.getElementById("JenisKelamin").value = user.JenisKelamin;
}

// delete form
function deleteData (index) {
    users.splice(index, 1);
    displayData ();
}

    const daftarItem = [];
    let totalHarga = 0;

    const namaEl = document.getElementById('nama');
    const emailEl = document.getElementById('email');
    const noHpEl = document.getElementById('noHp');
    const alamatEl = document.getElementById('alamat');

    const jenisSampahEl = document.getElementById('jenisSampah');
    const beratEl = document.getElementById('berat');
    const tambahBtn = document.getElementById('tambah');
    const selesaiBtn = document.getElementById('selesai');
    const cetakStrukBtn = document.getElementById('cetakStruk');

    const daftarItemEl = document.getElementById('daftarItem');
    const totalHargaEl = document.getElementById('totalHarga');
    const strukNamaEl = document.getElementById('strukNama');
    const strukEmailEl = document.getElementById('strukEmail');
    const strukNoHpEl = document.getElementById('strukNoHp');
    const strukAlamatEl = document.getElementById('strukAlamat');

    let editIndex = -1;

    tambahBtn.addEventListener('click', () => {
        const jenis = jenisSampahEl.value;
        const berat = parseFloat(beratEl.value);

        if (isNaN(berat) || berat <= 0) {
            alert('Masukkan berat yang valid!');
            return;
        }

        const harga = berat * hargaPerKg[jenis];

        if (editIndex === -1) {
            // Tambah item baru
            daftarItem.push({ jenis, berat, harga });
        } else {
            // Update item yang sedang diedit
            daftarItem[editIndex] = { jenis, berat, harga };
            editIndex = -1;
        }

        totalHarga = daftarItem.reduce((sum, item) => sum + item.harga, 0);
        updateStruk();
        beratEl.value = '';
    });

    // ini buat form juga
    selesaiBtn.addEventListener('click', () => {
        if (namaEl.value.trim() === '' || emailEl.value.trim() === '' || noHpEl.value.trim() === '' || alamatEl.value.trim() === '') {
            alert('Harap isi semua data pelanggan!');
            return;
        }

        strukNamaEl.textContent = namaEl.value;
        strukEmailEl.textContent = emailEl.value;
        strukNoHpEl.textContent = noHpEl.value;
        strukAlamatEl.textContent = alamatEl.value;

        alert('Data pelanggan berhasil disimpan!');
    });

    cetakStrukBtn.addEventListener('click', () => {
        if (daftarItem.length === 0) {
            alert('Belum ada transaksi untuk dicetak!');
            return;
        }

        window.print();
    });

    //  update struk setiap ada pembaruan
    function updateStruk() {
        daftarItemEl.innerHTML = '';
        daftarItem.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${index + 1}. ${item.jenis} - ${item.berat} kg - Rp ${item.harga}
                <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Hapus</button>
            `;
            daftarItemEl.appendChild(li);
        });

        totalHargaEl.textContent = `Total Harga: Rp ${totalHarga}`;
    }

    // edit isi form
    window.editItem = (index) => {
        const item = daftarItem[index];
        jenisSampahEl.value = item.jenis;
        beratEl.value = item.berat;
        editIndex = index;
    };

    // hapus isi form
    window.deleteItem = (index) => {
        daftarItem.splice(index, 1);
        totalHarga = daftarItem.reduce((sum, item) => sum + item.harga, 0);
        updateStruk();
    };

