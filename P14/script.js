let sales = JSON.parse(
    localStorage.getItem("sales")
) || [];

renderTable();

function addSale(){

    let product =
        document.getElementById("product").value;

    let qty =
        parseInt(
            document.getElementById("qty").value
        );

    let price =
        parseInt(
            document.getElementById("price").value
        );

    if(
        product === "" ||
        isNaN(qty) ||
        isNaN(price)
    ){
        alert("Lengkapi data terlebih dahulu!");
        return;
    }

    let sale = {
        product,
        qty,
        price,
        total: qty * price
    };

    sales.push(sale);

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

    document.getElementById("product").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("price").value = "";

    renderTable();
}

function renderTable(){

    let table =
        document.getElementById("salesTable");

    table.innerHTML = "";

    let totalSales = 0;

    sales.forEach((sale,index)=>{

        totalSales += sale.total;

        table.innerHTML += `
            <tr>
                <td>${sale.product}</td>
                <td>${sale.qty}</td>
                <td>Rp ${sale.price.toLocaleString('id-ID')}</td>
                <td>Rp ${sale.total.toLocaleString('id-ID')}</td>
                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteSale(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById(
        "totalSales"
    ).innerText =
        "Rp " +
        totalSales.toLocaleString('id-ID');

    document.getElementById(
        "totalTransaction"
    ).innerText =
        sales.length;
}

function deleteSale(index){

    if(confirm("Hapus data ini?")){

        sales.splice(index,1);

        localStorage.setItem(
            "sales",
            JSON.stringify(sales)
        );

        renderTable();
    }
}