const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIdx = 0;

function showSlide(index) {
    // အကုန်လုံးကို ဖျောက်ထားမယ်
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    // ရွေးထားတဲ့ slide ကို ပြမယ်
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

document.querySelector('.next-btn').addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % slides.length;
    showSlide(currentIdx);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    showSlide(currentIdx);
});

// ၅ စက္ကန့်တိုင်း အလိုအလျောက် လှည့်ပေးဖို့
setInterval(() => {
    currentIdx = (currentIdx + 1) % slides.length;
    showSlide(currentIdx);
}, 5000);
