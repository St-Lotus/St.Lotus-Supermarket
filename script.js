// ==========================================
// ၁။ Mobile Menu အတွက် Safe Code
// ==========================================
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

// ==========================================
// ၂။ Back to Top Button အတွက် Safe Code
// ==========================================
window.onscroll = function() {
    const mybutton = document.getElementById("backToTop");
    if (mybutton) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
};

const mybutton = document.getElementById("backToTop");
if (mybutton) {
    mybutton.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
}

// ==========================================
// ၃။ Google Sheet မှ ပစ္စည်းများ ဆွဲယူမည့် ဘုံ Function (General Function)
// ==========================================
async function fetchProductsFromSheet(gridId, sheetTitle) {
    const gridContainer = document.getElementById(gridId);
    
    // အကယ်၍ ၎င်း Page တွင် ရှာဖွေနေသော Grid ID မရှိပါက ဆက်မလုပ်ဘဲ ရပ်မည်
    if (!gridContainer) return; 

    const SHEET_ID = '1z91vQGTeCvj6iYYZP4i9ANBn7x0dd54tb9tFgthisxc'; 
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetTitle}`;

    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const sheetData = await response.text(); 
        const rows = sheetData.split(/\r?\n/).slice(1); 
        gridContainer.innerHTML = ''; 

        let hasProducts = false;

        rows.forEach(row => {
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length < 4) return; 

            const id = columns[0].replace(/"/g, '').trim();
            const title = columns[1].replace(/"/g, '').trim();
            const price = columns[2].replace(/"/g, '').trim();
            const image = columns[3].replace(/"/g, '').trim();

            if (!title || !price) return;
            hasProducts = true;

            const productCard = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${image}" alt="${title}" onerror="this.src='https://placehold.co/300x300?text=No+Image';">
                    </div>
                    <div class="product-info">
                        <h3>${title}</h3>
                        <p class="price">${price} ကျပ်</p>
                        <button class="add-to-cart">ခြင်းထဲထည့်မည်</button>
                    </div>
                </div>
            `;
            gridContainer.innerHTML += productCard;
        });

        if (!hasProducts) {
            gridContainer.innerHTML = '<p style="text-align:center; width:100%;">ပစ္စည်းများ ရှာမတွေ့ပါ။</p>';
        }

    } catch (error) {
        console.error('Error fetching sheet data:', error);
        gridContainer.innerHTML = '<p style="text-align:center; width:100%;">ပစ္စည်းများ တင်နေစဉ် အမှားအယွင်းရှိခဲ့ပါသည်။</p>';
    }
}

// ==========================================
// ၄။ Page အလိုက် သက်ဆိုင်ရာ Sheet Tab ကို လှမ်းခေါ်ခြင်း
// ==========================================
function initApp() {
    // grocery.html အတွက် -> 'grocery-grid' ID ထဲကို 'Sheet1' ထဲက ဒေတာတွေ ထည့်မယ်
    fetchProductsFromSheet('grocery-grid', 'Sheet1');

    // electronics.html အတွက် -> 'electronics-grid' ID ထဲကို 'Electronics' Tab ထဲက ဒေတာတွေ ထည့်မယ်
    fetchProductsFromSheet('electronics-grid', 'Electronics');
}

// Page ပွင့်လာတာနဲ့ စတင်အလုပ်လုပ်ခိုင်းမည်
document.addEventListener('DOMContentLoaded', initApp);
