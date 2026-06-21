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
    const moods = [
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

// ==================== Resume Password Modal ====================
function openResumeModal() {
    var modal = document.getElementById('resume-modal');
    modal.classList.add('active');
    setTimeout(function () { document.getElementById('resume-password').focus(); }, 100);
}

function closeResumeModal() {
    var modal = document.getElementById('resume-modal');
    modal.classList.remove('active');
    var err = document.getElementById('resume-error');
    if (err) err.style.display = 'none';
    var pwd = document.getElementById('resume-password');
    if (pwd) pwd.value = '';
    var success = document.getElementById('resume-success');
    if (success) success.style.display = 'none';
    // Restore modal content if hidden
    var box = document.querySelector('#resume-modal .modal-box');
    var descP = box.querySelector('p:nth-of-type(1)');
    var hintP = box.querySelector('p:nth-of-type(2)');
    if (descP) descP.style.display = '';
    if (hintP) hintP.style.display = '';
    var input = box.querySelector('.modal-input');
    if (input) input.style.display = '';
    var actions = box.querySelector('.modal-actions');
    if (actions) actions.style.display = '';
}

document.addEventListener('click', function (event) {
    var modal = document.getElementById('resume-modal');
    if (modal && event.target === modal) {
        closeResumeModal();
    }
});

function checkResumePwd() {
    var input = document.getElementById('resume-password').value;
    var errorEl = document.getElementById('resume-error');
    // password → MD5
    var correctHash = 'ac3f5ae36f5a6601d9768855f5472d7d';
    var hash = md5(input);
    if (hash === correctHash) {
        errorEl.style.display = 'none';
        document.getElementById('resume-success').style.display = 'block';
        var box = document.querySelector('#resume-modal .modal-box');
        box.querySelector('p:nth-of-type(1)').style.display = 'none';
        box.querySelector('p:nth-of-type(2)').style.display = 'none';
        box.querySelector('.modal-input').style.display = 'none';
        box.querySelector('.modal-actions').style.display = 'none';
    } else {
        errorEl.textContent = '密码错误，请重试 🔒';
        errorEl.style.display = 'block';
    }
}

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

// ==================== Simple MD5 ====================
function md5(string) {
    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    }
    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
    function md5blk(s) {
        var md5blks = [], i;
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }
    var hex_chr = '0123456789abcdef'.split('');
    function rhex(n) {
        var s = '', j = 0;
        for (; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }
    function hex(x) {
        for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
        return x.join('');
    }
    function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
    return hex(md5cycle([1732584193, -271733879, -1732584194, 271733878], md5blk(string)));
}
