// ==================== Sakura Petals ====================
(function () {
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const petals = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const petalColors = [
        'rgba(255,183,197,0.7)',
        'rgba(255,167,182,0.6)',
        'rgba(255,200,210,0.65)',
        'rgba(252,180,195,0.55)',
        'rgba(255,190,200,0.5)'
    ];

    function createPetal() {
        return {
            x: Math.random() * width,
            y: -20,
            r: Math.random() * 8 + 4,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: Math.random() * 1.5 + 0.6,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.4 + 0.4,
            color: petalColors[Math.floor(Math.random() * petalColors.length)]
        };
    }

    for (let i = 0; i < 40; i++) {
        const p = createPetal();
        p.y = Math.random() * height;
        petals.push(p);
    }

    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < petals.length; i++) {
            const p = petals[i];
            p.x += p.speedX + Math.sin(p.y * 0.02) * 0.3;
            p.y += p.speedY;
            p.rotation += p.rotSpeed;

            if (p.y > height + 20) {
                p.y = -20;
                p.x = Math.random() * width;
            }
            if (p.x > width + 20) p.x = -20;
            if (p.x < -20) p.x = width + 20;

            drawPetal(p);
        }

        requestAnimationFrame(animate);
    }

    animate();
})();

// ==================== Cursor Follow ====================
(function () {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseover', function (e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
            e.target.closest('a') || e.target.closest('button')) {
            dot.classList.add('hover');
            ring.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', function (e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
            e.target.closest('a') || e.target.closest('button')) {
            dot.classList.remove('hover');
            ring.classList.remove('hover');
        }
    });

    function follow() {
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(follow);
    }
    follow();
})();

// ==================== Mood Rotator ====================
(function () {
    const isEn = document.documentElement.lang.startsWith('en');
    const moods = isEn ? [
        '☕️ Procrastinating on thesis...',
        '📊 Running Stata regressions — do not disturb',
        '💻 Polishing the Nth version of my resume',
        '🎧 Immersed in post-rock',
        '🌙 Coding late into the night',
        '📚 Literature progress: 0% today',
        '🍵 Brewing tea, then back to work',
        '🐱 Petting the cat, brb',
        '✨ Feeling incredibly inspired today',
        '🏃 Just came back from a run'
    ] : [
        '☕️ 正在摸鱼写论文...',
        '📊 Stata 跑回归中，勿扰',
        '💻 在改第 38 版简历',
        '🎧 耳机里放着后摇',
        '🌙 夜深了还在调试代码',
        '📚 今日文献阅读进度 0%',
        '🍵 泡杯茶接着干',
        '🐱 撸猫中，稍后回复',
        '✨ 今天灵感爆棚',
        '🏃 刚跑完步回来'
    ];
    const el = document.getElementById('mood-text');
    if (!el) return;

    let idx = 0;
    setInterval(function () {
        idx = (idx + 1) % moods.length;
        el.style.opacity = '0';
        setTimeout(function () {
            el.textContent = moods[idx];
            el.style.opacity = '1';
        }, 300);
    }, 6000);
})();

// ==================== Footer Quotes ====================
(function () {
    const quotes = [
        '"Stay hungry, stay foolish." — Steve Jobs',
        '"The best way to predict the future is to create it." — Peter Drucker',
        '"Done is better than perfect." — Sheryl Sandberg',
        '"Talk is cheap. Show me the code." — Linus Torvalds',
        '"Simplicity is the ultimate sophistication." — Leonardo da Vinci',
        '"Make it work, make it right, make it fast." — Kent Beck',
        '"First, solve the problem. Then, write the code." — John Johnson',
        '"There is no cloud. It\'s just someone else\'s computer." — Unknown'
    ];
    const el = document.getElementById('footer-quote');
    if (!el) return;

    let idx = 0;
    setInterval(function () {
        idx = (idx + 1) % quotes.length;
        el.style.opacity = '0';
        setTimeout(function () {
            el.textContent = quotes[idx];
            el.style.opacity = '1';
        }, 300);
    }, 8000);
})();

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== Scroll Animations ====================
var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .project-card, .timeline-item, .contact-item, .skill-category').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ==================== Active Nav Highlight ====================
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (section) {
        var sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(function (link) {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--color-accent)';
        }
    });
});

// ==================== Mobile Nav Toggle ====================
function toggleNav() {
    var menu = document.getElementById('nav-menu');
    var btn = document.getElementById('nav-toggle');
    menu.classList.toggle('open');
    btn.classList.toggle('active');
}

document.getElementById('nav-menu').addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        this.classList.remove('open');
        document.getElementById('nav-toggle').classList.remove('active');
    }
});

document.addEventListener('click', function (e) {
    var menu = document.getElementById('nav-menu');
    var btn = document.getElementById('nav-toggle');
    if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('active');
    }
});

// ==================== Friend Link Form ====================
function toggleFriendForm() {
    var form = document.getElementById('friend-form');
    if (form.style.display === 'none' || !form.style.display) {
        form.style.display = 'block';
        setTimeout(function () {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('friend-name').focus();
        }, 100);
    } else {
        form.style.display = 'none';
    }
}

function submitFriend() {
    var name = document.getElementById('friend-name').value.trim();
    var url = document.getElementById('friend-url').value.trim();
    var desc = document.getElementById('friend-desc').value.trim();
    var msg = document.getElementById('friend-msg');

    if (!name || !url) {
        msg.textContent = '请至少填写名字和链接～';
        msg.style.color = '#ef4444';
        return;
    }

    // Save to localStorage
    var friends = JSON.parse(localStorage.getItem('idky_friends') || '[]');
    friends.push({ name: name, url: url, desc: desc, time: new Date().toISOString() });
    localStorage.setItem('idky_friends', JSON.stringify(friends));

    msg.textContent = '✅ 友链已提交！我会尽快添加到页面上～';
    msg.style.color = '#10b981';

    // Clear form
    document.getElementById('friend-name').value = '';
    document.getElementById('friend-url').value = '';
    document.getElementById('friend-desc').value = '';

    // Reload friend list
    setTimeout(loadFriends, 1500);
}

function loadFriends() {
    var grid = document.getElementById('friends-grid');
    if (!grid) return;
    var stored = JSON.parse(localStorage.getItem('idky_friends') || '[]');

    // Remove old stored entries (keep default friend-items)
    var items = grid.querySelectorAll('.friend-item');
    for (var i = items.length - 1; i >= 6; i--) {
        items[i].remove();
    }

    // Only show last 5 submitted friends
    var recent = stored.slice(-5);
    recent.forEach(function (f) {
        var a = document.createElement('a');
        a.href = f.url;
        a.className = 'friend-item';
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML =
            '<span class="friend-title">' + escapeHTML(f.name) + '</span>' +
            '<span class="friend-sub">' + (f.desc ? escapeHTML(f.desc) : 'New friend') + '</span>';
        grid.appendChild(a);
    });
}

function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Load stored friends on page load
loadFriends();

// ==================== Dark Mode ====================
(function () {
    var STORAGE_KEY = 'idky-theme';
    var html = document.documentElement;
    var toggle = document.getElementById('theme-toggle');

    function getTheme() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') return stored;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    }

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        var isEn = html.lang.startsWith('en');
        if (toggle) {
            toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            toggle.setAttribute('title', theme === 'dark' ? (isEn ? 'Light mode' : '切换亮色模式') : (isEn ? 'Dark mode' : '切换暗色模式'));
            toggle.setAttribute('aria-label', toggle.getAttribute('title'));
        }
        // Sync Giscus
        var iframe = document.querySelector('.giscus-frame');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } }
            }, 'https://giscus.app');
        }
    }

    function toggleTheme() {
        var current = html.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    // Init
    applyTheme(getTheme());

    // Toggle button
    if (toggle) toggle.addEventListener('click', toggleTheme);

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
})();
