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
