const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.hero-dots');
let currentIdx = 0;

// ၁။ ပုံအရေအတွက်အတိုင်း အစက်ကလေးတွေကို အလိုအလျောက် တည်ဆောက်ခြင်း
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // ပထမဆုံးတစ်ခုကို active လုပ်မယ်
        
        // အစက်ကို နှိပ်ရင် အဲဒီပုံကို သွားဖို့
        dot.addEventListener('click', () => {
            currentIdx = index;
            showSlide(currentIdx);
        });
        
        dotsContainer.appendChild(dot);
    });
}

// ၂။ Slide ပြောင်းလဲခြင်း Function
function showSlide(index) {
    const allDots = document.querySelectorAll('.dot');
    
    // အကုန်လုံးကို ဖျောက်/Active ဖြုတ်
    slides.forEach(s => s.classList.remove('active'));
    allDots.forEach(d => d.classList.remove('active'));

    // ရွေးထားတဲ့ Slide နဲ့ Dot ကို ပြန်ပြ
    slides[index].classList.add('active');
    allDots[index].classList.add('active');
}

// ၃။ Next/Prev ခလုတ်များအတွက် Logic
document.querySelector('.next-btn').addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % slides.length;
    showSlide(currentIdx);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    showSlide(currentIdx);
});

// ၄။ အစက်တွေကို စတင်တည်ဆောက်ပြီး Auto-slide လုပ်ခိုင်းခြင်း
createDots();

setInterval(() => {
    currentIdx = (currentIdx + 1) % slides.length;
    showSlide(currentIdx);
}, 5000);

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

let mybutton = document.getElementById("backToTop");

// User က အောက်ကို ၂၀px ဆွဲလိုက်တာနဲ့ ခလုတ်ပေါ်လာမယ်
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

// ခလုတ်နှိပ်ရင် အပေါ်ဆုံးကို ပို့ပေးမယ်
mybutton.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

// သင့် Google Sheet ရဲ့ ID ကို ဒီနေရာမှာ အစားထိုးပါ
const SHEET_ID = '1z91vQGTeCvj6iYYZP4i9ANBn7x0dd54tb9tFgthisxc'; 
const SHEET_TITLE = 'Sheet1'; // Sheet အောက်ခြေက နာမည် (ပုံမှန် Sheet1 ပါ)
const SHEET_URL = `https://docs.google.com/spreadsheets/d/1z91vQGTeCvj6iYYZP4i9ANBn7x0dd54tb9tFgthisxc/edit?usp=sharing`;

// ၎င်း Function သည် Google Sheet ထဲက အချက်အလက်များကို ဆွဲယူပေးမည်
async function fetchGroceryProducts() {
    const gridContainer = document.getElementById('grocery-grid');
    if (!gridContainer) return; // အကယ်၍ ၎င်း Page တွင် Grid မရှိပါက ရပ်မည်

    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        
        // CSV Data ကို စာကြောင်းအလိုက် ခွဲထုတ်ခြင်း
        const rows = data.split('\n').slice(1); // ခေါင်းစဉ်တန်းကို ဖယ်ထုတ်သည်
        
        gridContainer.innerHTML = ''; // အစောပိုင်း Loading စာသားကို ရှင်းထုတ်သည်

        rows.forEach(row => {
            // ကော်မာ (,) များအလိုက် ခွဲထုတ်ပြီး အကွက်ထဲက စာသားများကို သန့်စင်ခြင်း
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length < 4) return; // အချက်အလက် မပြည့်စုံလျှင် ကျော်မည်

            const id = columns[0].replace(/"/g, '').trim();
            const title = columns[1].replace(/"/g, '').trim();
            const price = columns[2].replace(/"/g, '').trim();
            const image = columns[3].replace(/"/g, '').trim();

            // HTML Product Card ကို အလိုအလျောက် တည်ဆောက်ခြင်း
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
        gridContainer.innerHTML = '<p>ပစ္စည်းများ တင်နေစဉ် အမှားအယွင်းရှိခဲ့ပါသည်။</p>';
    }
}

// Page ပွင့်လာတာနဲ့ ၎င်း Function ကို စတင်အလုပ်လုပ်ခိုင်းမည်
document.addEventListener('DOMContentLoaded', fetchGroceryProducts);
