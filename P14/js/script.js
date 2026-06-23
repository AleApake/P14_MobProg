// ===============================
// LOCAL STORAGE
// ===============================

let sales = JSON.parse(localStorage.getItem("sales")) || [];

// ===============================
// INISIALISASI
// ===============================

window.onload = function () {
    renderTable();
    showTodayDate();
};

// ===============================
// MENAMPILKAN TANGGAL
// ===============================

function showTodayDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("todayDate").innerText =
        today.toLocaleDateString("id-ID", options);
}

// ===============================
// TAMBAH DATA
// ===============================

function addSale() {

    const product = document.getElementById("product").value.trim();

    const qty = parseInt(
        document.getElementById("qty").value
    );

    const price = parseInt(
        document.getElementById("price").value
    );

    if (
        product === "" ||
        isNaN(qty) ||
        isNaN(price) ||
        qty <= 0 ||
        price <= 0
    ) {

        alert("Silakan lengkapi data dengan benar.");

        return;
    }

    const sale = {

        product,

        qty,

        price,

        total: qty * price

    };

    sales.push(sale);

    saveData();

    clearInput();

    renderTable();

}

// ===============================
// MENAMPILKAN DATA
// ===============================

function renderTable() {

    const table =
        document.getElementById("salesTable");

    table.innerHTML = "";

    let totalSales = 0;

    sales.forEach((sale, index) => {

        totalSales += sale.total;

        table.innerHTML += `

        <tr class="fade">

            <td>${index + 1}</td>

            <td>${sale.product}</td>

            <td>${sale.qty}</td>

            <td>
                Rp ${sale.price.toLocaleString("id-ID")}
            </td>

            <td>
                Rp ${sale.total.toLocaleString("id-ID")}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteSale(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("tableCount").innerText =
        sales.length;

    document.getElementById("totalTransaction").innerText =
        sales.length;

    document.getElementById("totalSales").innerText =
        "Rp " +
        totalSales.toLocaleString("id-ID");

    const average =
        sales.length === 0
            ? 0
            : totalSales / sales.length;

    document.getElementById("avgSales").innerText =
        "Rp " +
        Math.round(average).toLocaleString("id-ID");

}

// ===============================
// HAPUS DATA
// ===============================

function deleteSale(index) {

    const konfirmasi =
        confirm("Yakin ingin menghapus data ini?");

    if (!konfirmasi) return;

    sales.splice(index, 1);

    saveData();

    renderTable();

}

// ===============================
// SIMPAN KE LOCAL STORAGE
// ===============================

function saveData() {

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

}

// ===============================
// BERSIHKAN INPUT
// ===============================

function clearInput() {

    document.getElementById("product").value = "";

    document.getElementById("qty").value = "";

    document.getElementById("price").value = "";

    document.getElementById("product").focus();

}

// ===============================
// SCROLL TO TOP
// ===============================

const scrollBtn =
    document.getElementById("scrollTop");

window.onscroll = function () {

    if (window.scrollY > 250) {

        scrollBtn.style.display = "block";

    } else {

        scrollBtn.style.display = "none";

    }

};

scrollBtn.onclick = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};