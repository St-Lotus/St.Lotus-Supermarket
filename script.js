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
    if (!gridContainer) return; 

    const SHEET_ID = '1z91vQGTeCvj6iYYZP4i9ANBn7x0dd54tb9tFgthisxc'; 
    const SHEET_TITLE = 'Sheet1'; 
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_TITLE}`;

    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const sheetData = await response.text(); 
        
        // 💡 ဒေတာတွေ ရောက်/မရောက် Console မှာ စာသားထုတ်ကြည့်မယ်
        console.log("=== Google Sheet Data ===");
        console.log(sheetData);
        console.log("=========================");
        
        // စာကြောင်းများကို ခွဲထုတ်ခြင်း (Windows ရော Mac ပါ အဆင်ပြေအောင် \r\n ကော \n ပါ စစ်ပါမယ်)
        const rows = sheetData.split(/\r?\n/).slice(1); 
        gridContainer.innerHTML = ''; 

        let hasProducts = false;

        rows.forEach(row => {
            // CSV parsing အတွက် ပိုမိုစိတ်ချရသော ပုံစံပြောင်းလဲခြင်း
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length < 4) return; 

            const id = columns[0].replace(/"/g, '').trim();
            const title = columns[1].replace(/"/g, '').trim();
            const price = columns[2].replace(/"/g, '').trim();
            const image = columns[3].replace(/"/g, '').trim();

            // အကယ်၍ အချက်အလက်အလွတ်ဖြစ်နေလျှင် ကျော်မည်
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
            gridContainer.innerHTML = '<p style="text-align:center; width:100%;">Google Sheet ထဲတွင် ပစ္စည်းများ ရှာမတွေ့ပါ။ ခေါင်းစဉ်များကို စစ်ဆေးပါ။</p>';
        }

    } catch (error) {
        console.error('Error fetching sheet data:', error);
        gridContainer.innerHTML = '<p style="text-align:center; width:100%;">ပစ္စည်းများ တင်နေစဉ် အမှားအယွင်းရှိခဲ့ပါသည်။</p>';
    }
}

// DomContentLoaded တည်ဆောက်မှု
document.addEventListener('DOMContentLoaded', fetchGroceryProducts);
