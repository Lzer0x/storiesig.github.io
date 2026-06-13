// Theme Handler
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check existing theme in localStorage or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark-theme';
body.className = currentTheme;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    } else {
        body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    }
});

// State Variables
let activeUser = null;
let activeStories = []; // List of stories being viewed (recent stories or highlight stories)
let activeStoryIndex = 0; // Current story index in activeStories
let playbackTimer = null;
let progressDuration = 5000; // 5 seconds per story
let isPaused = false;
let startTime = 0;
let remainingTime = 5000;

// DOM Selectors
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const btnClear = document.getElementById('btn-clear');
const btnPaste = document.getElementById('btn-paste');
const btnSearch = document.getElementById('btn-search');
const btnSpinner = document.getElementById('btn-spinner');

const loaderWrapper = document.getElementById('loader-wrapper');
const errorCard = document.getElementById('error-card');
const profileCard = document.getElementById('profile-card');
const resultSection = document.getElementById('result-section');

// Profile DOM Selectors
const profileAvatar = document.getElementById('profile-avatar');
const profileUsername = document.getElementById('profile-username');
const profileFullname = document.getElementById('profile-fullname');
const statPosts = document.getElementById('stat-posts');
const statFollowers = document.getElementById('stat-followers');
const statFollowing = document.getElementById('stat-following');
const profileBio = document.getElementById('profile-bio');

// Tabs DOM Selectors
const tabStories = document.getElementById('tab-stories');
const tabHighlights = document.getElementById('tab-highlights');
const countStories = document.getElementById('count-stories');
const countHighlights = document.getElementById('count-highlights');

const highlightsContainer = document.getElementById('highlights-container');
const highlightsTrack = document.getElementById('highlights-track');
const storiesGridContainer = document.getElementById('stories-grid-container');
const storiesGrid = document.getElementById('stories-grid');
const emptyStories = document.getElementById('empty-stories');

// Modal DOM Selectors
const storyModal = document.getElementById('story-modal');
const storyModalOverlay = document.getElementById('story-modal-overlay');
const storyModalAvatar = document.getElementById('story-modal-avatar');
const storyModalUsername = document.getElementById('story-modal-username');
const storyModalTime = document.getElementById('story-modal-time');
const storyProgressContainer = document.getElementById('story-progress-container');
const storyMediaWrapper = document.getElementById('story-media-wrapper');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnStoryPrev = document.getElementById('btn-story-prev');
const btnStoryNext = document.getElementById('btn-story-next');
const btnDownloadStory = document.getElementById('btn-download-story');

const playIcon = btnPlayPause.querySelector('.play-icon');
const pauseIcon = btnPlayPause.querySelector('.pause-icon');

// FAQ Selection
const faqItems = document.querySelectorAll('.faq-item');

/* Initialize input states */
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim().length > 0) {
        btnClear.style.display = 'flex';
        btnPaste.style.display = 'none';
    } else {
        btnClear.style.display = 'none';
        btnPaste.style.display = 'flex';
    }
});

btnClear.addEventListener('click', () => {
    searchInput.value = '';
    btnClear.style.display = 'none';
    btnPaste.style.display = 'flex';
    searchInput.focus();
});

btnPaste.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            let username = text.trim();
            if (username.includes('instagram.com/')) {
                username = username.split('instagram.com/')[1].split('/')[0].split('?')[0];
            }
            if (username.startsWith('@')) {
                username = username.substring(1);
            }
            searchInput.value = username;
            btnClear.style.display = 'flex';
            btnPaste.style.display = 'none';
            searchInput.focus();
        }
    } catch (err) {
        alert('ไม่สามารถอ่านข้อมูลในคลิปบอร์ดได้ โปรดอนุญาตสิทธิ์การเข้าถึง');
    }
});

// Trending badges click listener
document.querySelectorAll('.trend-badge').forEach(badge => {
    badge.addEventListener('click', () => {
        const username = badge.getAttribute('data-username');
        searchInput.value = username;
        btnClear.style.display = 'flex';
        btnPaste.style.display = 'none';
        triggerSearch(username);
    });
});

// Search form submit listener
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = searchInput.value.trim().toLowerCase().replace('@', '');
    if (username) {
        triggerSearch(username);
    }
});

// ฟังก์ชันดึงข้อมูลจากระบบ Scraper จริงผ่าน API หลังบ้าน
async function triggerSearch(username) {
    // ซ่อนการแสดงผลเดิม
    profileCard.style.display = 'none';
    errorCard.style.display = 'none';
    
    // แสดงวงล้อโหลดข้อมูล (Loading States)
    btnSpinner.style.display = 'inline-block';
    btnSearch.setAttribute('disabled', 'true');
    loaderWrapper.style.display = 'flex';
    
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
        // แนะนำปรับเป็น URL Scraper / RapidAPI ตัวที่พี่ใช้บริการอยู่จริงด้านล่างนี้
        // ตัวอย่างนี้เป็นการเรียกโครงสร้าง REST API มาตรฐานสำหรับงาน Scrape สื่ออินสตาแกรม
        const response = await fetch(`https://api.storiesig-scraper.internal/v1/instagram/scout?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'X-RapidAPI-Key': 'YOUR_KEY' // หากเปลี่ยนไปต่อตรงกับค่าย RapidAPI
            }
        });

        if (!response.ok) {
            throw new Error('User not found or private');
        }

        const data = await response.json();
        
        // แปลงข้อมูลจาก API (Data Mapping) ให้อยู่ในรูปแบบที่ตัวเล่นหน้าเว็บรองรับ
        activeUser = {
            username: data.username,
            fullName: data.full_name || data.username,
            avatar: data.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            posts: data.posts_count?.toLocaleString() || '0',
            followers: data.followers_count?.toLocaleString() || '0',
            following: data.following_count?.toLocaleString() || '0',
            bio: data.biography || '',
            stories: data.stories?.map(s => ({
                id: s.id,
                url: s.media_url,
                time: s.time_ago || 'เมื่อไม่นานมานี้',
                type: s.media_type // 'image' หรือ 'video' เพื่อประมวลผลการเล่นจริง
            })) || [],
            highlights: data.highlights?.map(h => ({
                id: h.id,
                title: h.title,
                cover: h.cover_url,
                stories: h.stories?.map(hs => ({
                    id: hs.id,
                    url: hs.media_url,
                    time: 'ไฮไลท์',
                    type: hs.media_type
                })) || []
            })) || []
        };

        renderProfile(activeUser);

    } catch (error) {
        console.error("Scraping error:", error);
        // แสดง Error บัญชี Private หรือ ไม่พบผู้ใช้งานจริง
        errorCard.style.display = 'block';
    } finally {
        // ปิดสปินเนอร์และคืนสถานะปุ่มค้นหา
        btnSpinner.style.display = 'none';
        btnSearch.removeAttribute('disabled');
        loaderWrapper.style.display = 'none';
    }
}

// ลบฟังก์ชันปุ่มเดโม่ระบบจำลองออก และเปลี่ยนระบบปุ่มตัวเลือกให้ทำงานค้นหาจริงผ่านฟังก์ชันหลักแทน
document.querySelectorAll('.btn-demo-nasa').forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = 'nasa';
        triggerSearch('nasa');
    });
});

document.querySelectorAll('.btn-demo-natgeo').forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = 'natgeo';
        triggerSearch('natgeo');
    });
});

// Render Success Profile Card
function renderProfile(user) {
    profileAvatar.src = user.avatar;
    profileUsername.textContent = user.username;
    profileFullname.textContent = user.fullName;
    statPosts.textContent = user.posts;
    statFollowers.textContent = user.followers;
    statFollowing.textContent = user.following;
    profileBio.textContent = user.bio;

    countStories.textContent = user.stories.length;
    countHighlights.textContent = user.highlights.length;

    renderStoriesGrid(user.stories);
    renderHighlightsTrack(user.highlights);

    tabStories.className = 'profile-tab active';
    tabHighlights.className = 'profile-tab';
    
    highlightsContainer.style.display = 'none';
    storiesGridContainer.style.display = 'block';
    profileCard.style.display = 'block';
}

// Render Stories Grid
function renderStoriesGrid(stories) {
    storiesGrid.innerHTML = '';
    if (stories.length === 0) {
        emptyStories.style.display = 'flex';
        storiesGrid.style.display = 'none';
    } else {
        emptyStories.style.display = 'none';
        storiesGrid.style.display = 'grid';

        stories.forEach((story, index) => {
            const card = document.createElement('div');
            card.className = 'story-card';
            
            // ตรวจสอบประเภทสื่อว่าเป็นรูปหรือวิดีโอ เพื่อทำรูปพรีวิวให้ตรงเงื่อนไขจริง
            const mediaTag = story.type === 'video' 
                ? `<video src="${story.url}" class="story-card-media" muted playsinline></video>`
                : `<img src="${story.url}" alt="Story preview" class="story-card-media">`;

            card.innerHTML = `
                ${mediaTag}
                <div class="story-card-overlay">
                    <span class="story-card-time">${story.time}</span>
                    <div class="story-card-play">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </div>
                    <button class="story-card-download" data-url="${story.url}" type="button">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        ดาวน์โหลด
                    </button>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                if (e.target.closest('.story-card-download')) {
                    e.stopPropagation();
                    const url = e.target.closest('.story-card-download').getAttribute('data-url');
                    triggerDownload(url);
                    return;
                }
                openStoryModal(stories, index);
            });
            
            storiesGrid.appendChild(card);
        });
    }
}

// ฟังก์ชันตัวสตรีมส่งโหลดไฟล์ตรง แก้ไขบั๊กกรณี CORS Blocked ของทางฝั่งอินสตาแกรม
async function triggerDownload(url) {
    try {
        const res = await fetch(url);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `ig-story-${Date.now()}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
        window.open(url, '_blank');
    }
}

// Render Highlights list
function renderHighlightsTrack(highlights) {
    highlightsTrack.innerHTML = '';
    highlights.forEach((hl) => {
        const bubble = document.createElement('div');
        bubble.className = 'highlight-bubble';
        bubble.innerHTML = `
            <div class="highlight-avatar-wrapper">
                <img src="${hl.cover}" alt="${hl.title}" class="highlight-avatar">
            </div>
            <span class="highlight-title">${hl.title}</span>
        `;
        
        bubble.addEventListener('click', () => {
            openStoryModal(hl.stories, 0);
        });
        
        highlightsTrack.appendChild(bubble);
    });
}

// Tabs action listener
tabStories.addEventListener('click', () => {
    tabStories.className = 'profile-tab active';
    tabHighlights.className = 'profile-tab';
    highlightsContainer.style.display = 'none';
    storiesGridContainer.style.display = 'block';
    renderStoriesGrid(activeUser.stories);
});

tabHighlights.addEventListener('click', () => {
    tabHighlights.className = 'profile-tab active';
    tabStories.className = 'profile-tab';
    highlightsContainer.style.display = 'block';
    storiesGridContainer.style.display = 'block';
    
    storiesGrid.innerHTML = '';
    emptyStories.style.display = 'none';
    
    activeUser.highlights.forEach((hl) => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.innerHTML = `
            <img src="${hl.cover}" alt="Highlight cover" class="story-card-media">
            <div class="story-card-overlay">
                <span class="story-card-time">${hl.stories.length} สตอรี่</span>
                <div class="story-card-play" style="opacity: 1; transform: scale(1);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </div>
                <div style="font-weight: 700; color: #ffffff; text-align: center; margin-top: auto;">${hl.title}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            openStoryModal(hl.stories, 0);
        });
        storiesGrid.appendChild(card);
    });
});

// --- Playback Modal Logic ---
function openStoryModal(stories, index) {
    activeStories = stories;
    activeStoryIndex = index;
    isPaused = false;
    
    storyModalAvatar.src = activeUser.avatar;
    storyModalUsername.textContent = activeUser.username;
    
    storyProgressContainer.innerHTML = '';
    activeStories.forEach(() => {
        const bar = document.createElement('div');
        bar.className = 'story-progress-bar';
        bar.innerHTML = '<div class="story-progress-fill"></div>';
        storyProgressContainer.appendChild(bar);
    });
    
    storyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    playStory(activeStoryIndex);
}

function playStory(index) {
    if (index < 0 || index >= activeStories.length) {
        closeStoryModal();
        return;
    }
    
    activeStoryIndex = index;
    const story = activeStories[index];
    
    storyModalTime.textContent = story.time;
    
    // ปรับแก้ไขเพื่อรองรับวิดีโอ (ตรวจเช็ค Type และใส่ HTML Element ให้ถูกต้อง)
    if (story.type === 'video') {
        storyMediaWrapper.innerHTML = `<video id="story-video-player" src="${story.url}" autoplay playsinline style="width:100%; height:100%; object-fit:cover;"></video>`;
        progressDuration = 15000; // วิดีโอไอจีตั้งขอบเขตสแตนดาร์ดไว้ที่ 15 วินาที
        
        // ตรวจดึงความยาววิดีโอแท้จริงมาทำแถบอนิเมชั่นความก้าวหน้า
        const player = document.getElementById('story-video-player');
        player.addEventListener('loadedmetadata', () => {
            progressDuration = player.duration * 1000;
            startProgressTimer(index);
        });
        player.addEventListener('ended', () => {
            playStory(activeStoryIndex + 1);
        });
    } else {
        storyMediaWrapper.innerHTML = `<img src="${story.url}" alt="Story content">`;
        progressDuration = 5000; // รูปภาพค้างแสดงผล 5 วินาที
        startProgressTimer(index);
    }
    
    const progressFills = storyProgressContainer.querySelectorAll('.story-progress-fill');
    progressFills.forEach((fill, i) => {
        if (i < index) {
            fill.style.width = '100%';
            fill.style.transition = 'none';
        } else {
            fill.style.width = '0%';
            fill.style.transition = 'none';
        }
    });

    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    isPaused = false;
}

// ผูกฟังก์ชันปุ่มดาวน์โหลดหลักใน Modal เข้ากับฟังก์ชัน Fetch โหลดไฟล์เพื่อหลบเลี่ยง CORS
btnDownloadStory.addEventListener('click', (e) => {
    e.preventDefault();
    if(activeStories[activeStoryIndex]) {
        triggerDownload(activeStories[activeStoryIndex].url);
    }
});

function startProgressTimer(index) {
    clearTimeout(playbackTimer);
    const fill = storyProgressContainer.querySelectorAll('.story-progress-fill')[index];
    
    startTime = Date.now();
    remainingTime = progressDuration;
    
    function animate() {
        if (isPaused) return;
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / progressDuration) * 100, 100);
        
        fill.style.width = `${progress}%`;
        
        if (elapsed < progressDuration) {
            playbackTimer = requestAnimationFrame(animate);
        } else {
            // หากเป็นสื่อประเภทภาพ จะไหลไปสตอรี่ถัดไปตามอัตโนมัติ
            if (!document.getElementById('story-video-player')) {
                setTimeout(() => {
                    playStory(activeStoryIndex + 1);
                }, 100);
            }
        }
    }
    playbackTimer = requestAnimationFrame(animate);
}

function pausePlayback() {
    if (isPaused) return;
    isPaused = true;
    clearTimeout(playbackTimer);
    
    const player = document.getElementById('story-video-player');
    if (player) player.pause();
    
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    
    const elapsed = Date.now() - startTime;
    remainingTime = Math.max(progressDuration - elapsed, 0);
}

function resumePlayback() {
    if (!isPaused) return;
    isPaused = false;
    
    const player = document.getElementById('story-video-player');
    if (player) player.play();
    
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    
    startTime = Date.now() - (progressDuration - remainingTime);
    
    const index = activeStoryIndex;
    const fill = storyProgressContainer.querySelectorAll('.story-progress-fill')[index];
    
    function animate() {
        if (isPaused) return;
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / progressDuration) * 100, 100);
        
        fill.style.width = `${progress}%`;
        
        if (elapsed < progressDuration) {
            playbackTimer = requestAnimationFrame(animate);
        } else {
            if (!document.getElementById('story-video-player')) {
                setTimeout(() => {
                    playStory(activeStoryIndex + 1);
                }, 100);
            }
        }
    }
    playbackTimer = requestAnimationFrame(animate);
}

btnPlayPause.addEventListener('click', () => {
    if (isPaused) {
        resumePlayback();
    } else {
        pausePlayback();
    }
});

btnStoryPrev.addEventListener('click', () => {
    playStory(activeStoryIndex - 1);
});

btnStoryNext.addEventListener('click', () => {
    playStory(activeStoryIndex + 1);
});

storyMediaWrapper.addEventListener('click', (e) => {
    const width = storyMediaWrapper.clientWidth;
    const clickX = e.offsetX;
    
    if (clickX < width / 3) {
        playStory(activeStoryIndex - 1);
    } else {
        playStory(activeStoryIndex + 1);
    }
});

function closeStoryModal() {
    clearTimeout(playbackTimer);
    const player = document.getElementById('story-video-player');
    if (player) player.pause();
    storyModal.style.display = 'none';
    document.body.style.overflow = '';
}

btnCloseModal.addEventListener('click', closeStoryModal);
storyModalOverlay.addEventListener('click', closeStoryModal);

document.addEventListener('keydown', (e) => {
    if (storyModal.style.display === 'flex') {
        if (e.key === 'Escape') closeStoryModal();
        else if (e.key === 'ArrowRight') playStory(activeStoryIndex + 1);
        else if (e.key === 'ArrowLeft') playStory(activeStoryIndex - 1);
    }
});

// Swipe support for Mobile Story Viewer
let touchStartX = 0;
let touchEndX = 0;

storyModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pausePlayback();
}, { passive: true });

storyModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
        playStory(activeStoryIndex + 1);
    } else if (touchEndX - touchStartX > threshold) {
        playStory(activeStoryIndex - 1);
    } else {
        resumePlayback();
    }
}, { passive: true });

// FAQ Accordion Toggle Logic
faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    
    trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-panel').style.maxHeight = null;
        });
        
        if (!isActive) {
            item.classList.add('active');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
});
