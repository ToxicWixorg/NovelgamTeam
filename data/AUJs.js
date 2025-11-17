// document.addEventListener("DOMContentLoaded", () => {
//     // --- تنظیمات اصلی ---
//     const API_KEY = "YOUR_API_KEY"; // <<<<<<<<<<<<<<< کلید API خود را اینجا قرار دهید
//     const MODEL_NAME = "gemini-1.0-pro-latest";

//     // --- دانش و اطلاعات اختصاصی شما ---
//     // این همان زمینه‌ای است که هوش مصنوعی از آن برای پاسخگویی استفاده می‌کند
//     const knowledgeBase = `
//         نام شرکت ما "فناوران پیشرو" است.
//         ما سه محصول اصلی داریم: نرم‌افزار حسابداری "حساب‌یار"، سیستم مدیریت مشتری "مشتری‌پلاس" و پلتفرم آموزش آنلاین "دانش‌جو".
//         ساعت کاری شرکت از شنبه تا چهارشنبه، ساعت ۹ صبح تا ۵ بعد از ظهر است.
//         دفتر مرکزی ما در تهران، خیابان ولیعصر قرار دارد.
//         برای پشتیبانی فنی، مشتریان باید به support@fanavaran.com ایمیل بزنند.
//         قیمت نرم‌افزار "حساب‌یار" سالانه ۲ میلیون تومان است.
//         "مشتری‌پلاس" یک نسخه رایگان با امکانات محدود دارد.
//     `;

//     // --- دسترسی به عناصر HTML ---
//     const userInput = document.getElementById("user-input");
//     const sendButton = document.getElementById("send-button");
//     const chatbotMessages = document.getElementById("chatbot-messages");
//     const loadingIndicator = document.getElementById("loading");

//     // --- توابع ---
//     const sendMessage = async () => {
//         const userQuestion = userInput.value.trim();
//         if (userQuestion === "") return;

//         appendMessage(userQuestion, "user-message");
//         userInput.value = "";
//         loadingIndicator.style.display = "block"; // نمایش لودینگ

//         try {
//             // ساخت پرامپت هوشمندانه
//             const prompt = `
//                 با توجه به اطلاعات زیر، به سوال کاربر پاسخ بده.
//                 پاسخ تو باید مودبانه و فقط بر اساس اطلاعات داده شده باشد.
//                 اگر پاسخ سوال در اطلاعات موجود نبود، به صورت محترمانه بگو "اطلاعاتی در این مورد ندارم."

//                 --- اطلاعات شرکت ---
//                 ${knowledgeBase}
//                 --------------------

//                 سوال کاربر: ${userQuestion}
//             `;

//             const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     contents: [{
//                         parts: [{
//                             text: prompt
//                         }]
//                     }]
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error("خطا در برقراری ارتباط با API");
//             }

//             const data = await response.json();
//             const botResponse = data.candidates[0].content.parts[0].text;

//             appendMessage(botResponse, "bot-message");

//         } catch (error) {
//             console.error("Error:", error);
//             appendMessage("متاسفانه مشکلی پیش آمد. لطفاً دوباره تلاش کنید.", "bot-message");
//         } finally {
//             loadingIndicator.style.display = "none"; // پنهان کردن لودینگ
//         }
//     };

//     const appendMessage = (text, className) => {
//         const messageElement = document.createElement("div");
//         messageElement.classList.add("message", className);
//         messageElement.innerText = text;
//         chatbotMessages.appendChild(messageElement);
//         chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
//     };

//     // --- رویدادها ---
//     sendButton.addEventListener("click", sendMessage);
//     userInput.addEventListener("keypress", (event) => {
//         if (event.key === "Enter") {
//             sendMessage();
//         }
//     });
// });
