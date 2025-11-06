const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const question = document.getElementById('question');
const message = document.getElementById('message');
const jsConfetti = window.confetti; 

const noMessages = [
    "ไม่จริงน่ะ... (0_0)", "ลองคิดอีกทีสิ...", "ใจร้ายจัง T_T", "ชั้นรักแกนะ...", 
    "แกแน่ใจเหรอ?", "แกจะทำแบบนี้กับชั้นจริงๆ เหรอ?", "ไม่เป็นไร ชั้นรอได้...", 
    "โอเค ชั้นยอมแพ้... (แต่แกต้องกด Yes)", "Yes คือคำตอบเดียวที่ชั้นต้องการ!", 
    "วันนี้เป็นวันของเรานะ!", "ลองดูสิว่าปุ่มนี้จะหนีได้นานแค่ไหน...",
];

let noCount = 0; 

// ฟังก์ชันสำหรับแสดง Confetti
function launchConfetti() {
    jsConfetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#f9bec7', '#4CAF50', '#FFFF00', '#007FFF'],
        shapes: ['circle', 'square', 'heart', 'star'], 
    });
}

// ฟังก์ชันสำหรับจัดการเมื่อกดปุ่ม "Yes"
function handleYes() {
    question.classList.add('hidden'); 
    document.querySelector('.button-group').classList.add('hidden'); 
    message.classList.remove('hidden'); 
    
    // **เรียก Confetti Effect!**
    launchConfetti();
    
    // หยุดปุ่ม No
    noButton.onmouseover = null;
    noButton.onclick = null;
    noButton.style.display = 'none';
}

// ฟังก์ชันสำหรับจัดการเมื่อเมาส์เข้าใกล้ปุ่ม "No" หรือคลิก
function handleNoAction() {
    noCount++;

    // เปลี่ยนข้อความบนปุ่ม "No"
    const newNoMessage = noMessages[noCount % noMessages.length];
    noButton.textContent = newNoMessage;

    // ทำให้ปุ่ม Yes ใหญ่ขึ้นเรื่อยๆ
    yesButton.style.transform = `scale(${1 + noCount * 0.2})`;

    // คำนวณขอบเขตที่ปลอดภัย (เว้นขอบ 20px)
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const safePadding = 20;
    
    // คำนวณขอบเขตสูงสุดที่ปุ่มจะไปถึง
    const maxX = window.innerWidth - buttonWidth - safePadding;
    const maxY = window.innerHeight - buttonHeight - safePadding;
    
    // คำนวณตำแหน่งสุ่มให้อยู่ภายในขอบเขตที่ปลอดภัย
    const randomX = Math.random() * (maxX - safePadding) + safePadding;
    const randomY = Math.random() * (maxY - safePadding) + safePadding;

    // กำหนดตำแหน่งใหม่โดยใช้ fixed position
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

// ผูกฟังก์ชันเข้ากับเหตุการณ์
noButton.onmouseover = handleNoAction;
noButton.onclick = handleNoAction;