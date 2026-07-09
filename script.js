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
// ၃။ Google Sheet မှ ပစ္စည်းများ ဆွဲယူမည့် နေရာ
// ==========================================
async function fetchGroceryProducts() {
    const gridContainer = document.getElementById('grocery-grid');
    
    // ဒီ ID မရှိရင် (ဥပမာ index.html ပေါ်မှာဆိုရင်) ဒီတင်ပဲ ရပ်မယ်၊ အမှားမပြစေရဘူး
    if (!gridContainer) return; 

    // ⚠️ သင့် Google Sheet ID ကို ဒီနေရာမှာ သေချာစွာ အစားထိုးပါ
    const SHEET_ID = '1z91vQGTeCvj6iYYZP4i9ANBn7x0dd54tb9tFgthisxc'; 
    const SHEET_TITLE = 'Sheet1'; 
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/1z91vQGTeCvj6iYYZP4i9ANBn7x0dd54tb9tFgthisxc/edit?usp=sharing`;

    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.text();
        const rows = data.split('\n').slice(1); 
        
        gridContainer.innerHTML = ''; // အဟောင်းတွေကို ရှင်းထုတ်မယ်

        rows.forEach(row => {
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length < 4) return; 

            const id = columns[0].replace(/"/g, '').trim();
            const title = columns[1].replace(/"/g, '').trim();
            const price = columns[2].replace(/"/g, '').trim();
            const image = columns[3].replace(/"/g, '').trim();

            const productCard = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${image}" alt="${title}">
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
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        gridContainer.innerHTML = '<p style="text-align:center; width:100%;">ပစ္စည်းများ တင်နေစဉ် အမှားအယွင်းရှိခဲ့ပါသည်။</p>';
    }
}

// Page အားလုံး ပွင့်လာတာနဲ့ Google Sheet ဖတ်ဖို့ အဆင်သင့်လုပ်ထားမယ်
document.addEventListener('DOMContentLoaded', fetchGroceryProducts);
