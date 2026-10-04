/**
 * Bibhu Shrestha - Portfolio Scripts
 * Lightweight, accessible, performant vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const contactForm = document.getElementById('contactForm');
  const formTimestamp = document.getElementById('formTimestamp');
  const formStatus = document.getElementById('formStatus');
  const toast = document.getElementById('toast');
  const currentYearSpan = document.getElementById('currentYear');

  // 1. Dynamic Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Set timestamp on load for spam protection
  if (formTimestamp) {
    formTimestamp.value = Date.now().toString();
  }

  // Set _next redirect for FormSubmit if running on HTTP/HTTPS
  const formNext = document.getElementById('formNext');
  if (formNext && window.location.href.startsWith('http')) {
    formNext.value = window.location.origin + window.location.pathname + '?status=success#contact';
  }

  // Check URL parameters for successful submission redirect
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('status') === 'success' && formStatus) {
    formStatus.className = 'form-status success';
    formStatus.style.display = 'block';
    formStatus.innerHTML = `<strong>Thank you!</strong> Your message has been sent directly to Bibhu's email inbox.`;
    showToast('Message sent successfully!');
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname + '#contact');
    }
  }

  // Privacy & Terms Modal
  const privacyModal = document.getElementById('privacyModal');
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const closePrivacyBtn = document.getElementById('closePrivacyBtn');

  if (privacyModal && openPrivacyBtn && closePrivacyBtn) {
    openPrivacyBtn.addEventListener('click', () => {
      if (typeof privacyModal.showModal === 'function') {
        privacyModal.showModal();
      }
    });

    closePrivacyBtn.addEventListener('click', () => {
      privacyModal.close();
    });

    privacyModal.addEventListener('click', (e) => {
      const rect = privacyModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        privacyModal.close();
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle
  function toggleMobileMenu() {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  }

  function closeMobileMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('open');
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Close when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close when clicking outside of navbar on mobile
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(event.target) &&
        !hamburgerBtn.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
        hamburgerBtn.focus();
      }
    });
  }

  // 4. Scroll Header Shadow & Active Section Spy
  function onScroll() {
    // Subtle shadow on scroll
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.06)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Scroll Spy for navigation items
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once initially

  // 5. Toast Notification System
  let toastTimer = null;
  function showToast(message, duration = 3000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, duration);
  }

  // 6. Copy Email to Clipboard
  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for non-https or older browsers
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied!';
        copyEmailBtn.style.color = '#16a34a';
        copyEmailBtn.style.borderColor = '#86efac';
        showToast('Email copied to clipboard: ' + email);

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.style.color = '';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        showToast('Could not copy automatically. Email: ' + email);
      }
    });
  }

  // 7. Secure Client-Side Contact Form Validation & Anti-Spam
  if (contactForm) {
    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const subjectInput = document.getElementById('senderSubject');
    const messageInput = document.getElementById('senderMessage');
    const honeypot = document.getElementById('company_website');
    const submitBtn = document.getElementById('submitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Email regex validator
    function isValidEmail(email) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
    }

    // Clear error messages on input
    nameInput.addEventListener('input', () => { nameError.textContent = ''; });
    emailInput.addEventListener('input', () => { emailError.textContent = ''; });
    messageInput.addEventListener('input', () => { messageError.textContent = ''; });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let hasError = false;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const rawSubject = subjectInput.value.trim();
      const subject = rawSubject ? `Portfolio Message: ${rawSubject}` : `Portfolio Inquiry from ${name}`;
      const message = messageInput.value.trim();

      // Anti-Spam Check 1: Honeypot
      if (honeypot && honeypot.value !== '') {
        console.warn('Spam detected via honeypot.');
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Submission blocked.';
        return;
      }

      // Anti-Spam Check 2: Submission Velocity Check
      const loadTime = parseInt(formTimestamp.value, 10);
      const now = Date.now();
      if (!isNaN(loadTime) && now - loadTime < 1000) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Submission was too fast. Please take your time.';
        return;
      }

      // Validation
      if (!name) {
        nameError.textContent = 'Please provide your name.';
        hasError = true;
      } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long.';
        hasError = true;
      }

      if (!email) {
        emailError.textContent = 'Please enter your email address.';
        hasError = true;
      } else if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      if (!message) {
        messageError.textContent = 'Please enter a message.';
        hasError = true;
      } else if (message.length < 10) {
        messageError.textContent = 'Message should be at least 10 characters.';
        hasError = true;
      }

      if (hasError) {
        return;
      }

      // Loading State on Submit Button
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn-icon spinner-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Sending Message...</span>
      `;
      formStatus.className = 'form-status';
      formStatus.textContent = '';
      formStatus.style.display = 'none';

      // When opened locally via file://, browser CORS prohibits fetch() calls to external endpoints.
      // Submit via standard HTML form POST directly so FormSubmit handles it and triggers activation.
      if (window.location.protocol === 'file:') {
        contactForm.submit();
        return;
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/bibhustha5@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: subject,
            message: message,
            _captcha: 'false',
            _template: 'table'
          })
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true)) {
          formStatus.className = 'form-status success';
          formStatus.style.display = 'block';
          formStatus.innerHTML = `<strong>Thank you, ${escapeHtml(name)}!</strong> Your message has been sent directly to Bibhu's email inbox. I will get back to you shortly.`;
          showToast('Message sent directly to Bibhu\'s email!');
          contactForm.reset();
          formTimestamp.value = Date.now().toString();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          return;
        } else {
          // If AJAX requires first-time verification or has an issue, submit via standard form
          console.warn('FormSubmit AJAX needs verification, submitting directly:', result);
          contactForm.submit();
          return;
        }
      } catch (err) {
        console.warn('Direct fetch error, falling back to standard form submission:', err);
        contactForm.submit();
        return;
      }
    });
  }

  // Basic HTML Escaper for XSS prevention in display messages
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

  // 8. Automatic Live Sync for GitHub & Profile
  const GITHUB_USERNAME = 'BibhuShrestha';
  const CACHE_KEY = 'portfolio_github_cache';
  const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

  async function syncGitHubData() {
    try {
      // Check cache first to avoid GitHub API rate limits
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { timestamp, user, repos } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL_MS) {
            applyGitHubData(user, repos);
            return;
          }
        } catch (e) {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // Fetch user profile and public repos from GitHub
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: { 'Accept': 'application/vnd.github.v3+json' } }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, { headers: { 'Accept': 'application/vnd.github.v3+json' } })
      ]);

      if (userRes.ok && reposRes.ok) {
        const user = await userRes.json();
        const repos = await reposRes.json();

        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          user,
          repos
        }));

        applyGitHubData(user, repos);
      }
    } catch (err) {
      // Graceful fallback: Keep static rendered content intact
      console.info('Live sync using fallback static portfolio content.');
    }
  }

  function applyGitHubData(user, repos) {
    if (!user || !repos) return;

    // Update avatar if changed on GitHub
    const avatarEl = document.getElementById('heroAvatar');
    if (avatarEl && user.avatar_url) {
      avatarEl.src = user.avatar_url;
    }

    // Update bio if available on GitHub
    const bioEl = document.getElementById('heroBio');
    if (bioEl && user.bio && user.bio.trim().length > 0) {
      bioEl.textContent = user.bio;
    }

    // Update location if available
    const locationEl = document.getElementById('heroLocation');
    const avatarLocationEl = document.getElementById('avatarLocation');
    if (user.location) {
      if (locationEl) locationEl.textContent = user.location;
      if (avatarLocationEl) avatarLocationEl.textContent = user.location;
    }

    // Render live repositories
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && Array.isArray(repos) && repos.length > 0) {
      // Filter out forks or non-original repos if desired
      const validRepos = repos.filter(r => !r.fork && r.name !== 'bibhushrestha.github.io');
      const displayRepos = validRepos.length > 0 ? validRepos : repos;

      let html = '';
      displayRepos.forEach(repo => {
        const lang = repo.language || 'Java / Code';
        const stars = repo.stargazers_count || 0;
        const desc = repo.description || 'Public repository created and maintained on GitHub.';
        const starsBadge = stars > 0 ? `<span class="project-stars"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> ${stars} ${stars === 1 ? 'star' : 'stars'}</span>` : '';
        const demoLink = repo.homepage ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> Live Demo</a>` : '';

        const tags = (repo.topics && repo.topics.length > 0) ? repo.topics.slice(0, 4) : [lang];

        html += `
          <article class="project-card">
            <div class="project-card-header">
              <div class="project-type-tag">${escapeHtml(repo.visibility || 'Public Repo')}</div>
              ${starsBadge}
            </div>

            <h3 class="project-name">${escapeHtml(repo.name)}</h3>
            <p class="project-desc">${escapeHtml(desc)}</p>

            <div class="project-tech-stack">
              ${tags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            </div>

            <div class="project-actions">
              <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                View Repository
              </a>
              ${demoLink}
            </div>
          </article>
        `;
      });

      projectsGrid.innerHTML = html;
    }
  }

  // 9. Sync Profile Data from profile.json (if present)
  async function syncProfileData() {
    try {
      const res = await fetch('profile.json');
      if (res.ok) {
        const data = await res.json();
        if (data.title) {
          const titleEl = document.getElementById('heroTitle');
          if (titleEl) titleEl.textContent = data.title;
        }
        if (data.status) {
          const statusEl = document.getElementById('avatarStatus');
          if (statusEl) statusEl.textContent = data.status;
        }
        if (data.bio) {
          const bioEl = document.getElementById('heroBio');
          if (bioEl) bioEl.textContent = data.bio;
        }
      }
    } catch (e) {
      // Normal when browsing directly via file:// protocol
    }
  }

  // Initialize Auto-Sync
  syncGitHubData();
  syncProfileData();
});
