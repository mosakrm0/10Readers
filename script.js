const readings = {
    'حفص': { 
      text: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", 
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", 
        "الرَّحْمَٰنِ الرَّحِيمِ", 
        "مَٰلِكِ يَوْمِ الدِّينِ", 
        "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ", 
        "ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ", 
        "صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمْ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمْ وَلَا ٱلضَّآلِّينَ"
      ], 
      audio: '/audio/حفص.mp3' 
    },
    'شعبة': { 
      text: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ(1)", 
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", 
        "الرَّحْمَٰنِ الرَّحِيمِ", 
        "مَٰلِكِ يَوْمِ الدِّينِ", 
        "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ", 
        "ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ", 
        "صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمْ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمْ وَلَا ٱلضَّآلِّينَ"
      ], 
      audio: '/audio/شعبة.mp3' 
    },
    'ورش': { 
      text: [
        "(1)",
        "(2)",
        "(3)",
        "(4)",
        "(5)",
        "(6)",
        "(7)"
      ], 
      audio: 'audio/ورش.mp3' 
    },
    'قالون': { 
      text: [
        "(1)",
        "(2)",
        "(3)",
        "(4)",
        "(5)",
        "(6)",
        "(7)"
      ], 
      audio: 'audio/qalun.mp3' 
    }
  };

  // متابعة القراءات المختارة
  let selectedReadings = new Set();
  
  function toggleReading(reading, element) {
    element.classList.toggle('selected');
    if (selectedReadings.has(reading)) {
      selectedReadings.delete(reading);
    } else {
      selectedReadings.add(reading);
    }
    filterAyat(); // تحديث العرض عند تغيير الاختيار
  }
  
  function filterAyat() {
    const start = parseInt(document.getElementById('start-ayah').value) || 1;
    const end = parseInt(document.getElementById('end-ayah').value) || 7;
    
    if (start < 1 || end > 7 || start > end) {
      alert('الرجاء إدخال مدى صحيح للآيات (من 1 إلى 7)');
      return;
    }
    
    const container = document.getElementById('reading-container');
    container.innerHTML = '';
    
    selectedReadings.forEach(reading => {
      const readingData = readings[reading];
      const filteredText = readingData.text.slice(start - 1, end).join('<br>');
      const div = document.createElement('div');
      div.classList.add('reading-card');
      div.innerHTML = `
        <h3>${reading}</h3>
        <p>${filteredText}</p>
        <audio controls src="${readingData.audio}"></audio>
      `;
      container.appendChild(div);
    });
  }
  
  // إعداد وتبديل الثيم (Light/Dark)
  document.addEventListener("DOMContentLoaded", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    function setTheme() {
      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      updateThemeIcon(savedTheme);
    }

    setTheme();
    themeToggleBtn.addEventListener("click", toggleTheme);
  });