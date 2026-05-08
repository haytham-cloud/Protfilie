// Header Scroll
var header = document.getElementById('header');
var scrollWrapper = document.getElementById('scrollWrapper');
scrollWrapper.addEventListener('scroll', function() {
  header.classList.toggle('scrolled', scrollWrapper.scrollTop > 30);
});

// Mobile Menu
var hamburger = document.getElementById('hamburger');
var navList = document.getElementById('navList');
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});
document.querySelectorAll('.nav-list a').forEach(function(link) {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  });
});

// Swiper Testimonials



// Reveal on scroll
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});

// Tools animation
var toolsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.tool-fill').forEach(function(fill, i) {
        setTimeout(function() {
          fill.style.width = fill.getAttribute('data-width');
        }, i * 200);
      });
    }
  });
}, { threshold: 0.3 });

var toolsGrid = document.querySelector('.tools-grid');
if (toolsGrid) toolsObserver.observe(toolsGrid);

// Contact form
function goToStep2() {
  var name = document.getElementById('senderName').value.trim();
  var email = document.getElementById('senderEmail').value.trim();
  var msg = document.getElementById('senderMessage').value.trim();
  if (!name || !email || !msg) { alert('يرجى ملء جميع الحقول'); return; }
  document.getElementById('prevName').textContent = name;
  document.getElementById('prevEmail').textContent = email;
  document.getElementById('prevMsg').textContent = msg;
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  document.getElementById('step3').style.display = 'none';
}

function goToStep1() {
  document.getElementById('step1').style.display = 'block';
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'none';
}

function sendEmail() {
  var name = document.getElementById('senderName').value.trim();
  var email = document.getElementById('senderEmail').value.trim();
  var msg = document.getElementById('senderMessage').value.trim();
  var realEmail = 'omarabdalltef159@gmail.com';
  var formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', msg);
  formData.append('_subject', 'رسالة جديدة من: ' + name);
  formData.append('_to', realEmail);

  fetch('https://formsubmit.co/ajax/' + realEmail, { method: 'POST', body: formData })
  .then(function(response) {
    if (response.ok) {
      document.getElementById('step2').style.display = 'none';
      document.getElementById('step3').style.display = 'block';
      document.getElementById('step3Title').textContent = 'تم الإرسال بنجاح! ✅';
      document.getElementById('step3Msg').textContent = 'شكراً ' + name + '، تم استلام رسالتك وسنقوم بالرد عليك قريباً.';
      document.getElementById('msgForm').reset();
    } else { throw new Error('Failed'); }
  })
  .catch(function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('step3Title').textContent = 'حدث خطأ! ❌';
    document.getElementById('step3Msg').innerHTML = 'تعذر الإرسال حالياً. يرجى المحاولة لاحقاً أو التواصل معنا عبر التليجرام: <a href="https://t.me/O5M71" style="color:var(--red);">@O5M71</a>';
  });
}

// Theme toggle
var themeBtn = document.getElementById('themeToggle');
var body = document.body;
var icon = themeBtn.querySelector('i');

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', function() {
  body.classList.toggle('light');
  if (body.classList.contains('light')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

