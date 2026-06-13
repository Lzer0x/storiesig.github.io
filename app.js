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

// Mock Database of Public Profiles
const mockDatabase = {
    nasa: {
        username: 'nasa',
        fullName: 'NASA',
        avatar: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=150&auto=format&fit=crop&q=80',
        posts: '3,842',
        followers: '97.2M',
        following: '82',
        bio: 'Exploring the secrets of the universe for the benefit of all. 🚀🌌🛰️ Discover more at nasa.gov',
        stories: [
            { id: 'nasa-s1', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80', time: '2 ชม. ที่แล้ว', type: 'image' },
            { id: 'nasa-s2', url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop&q=80', time: '5 ชม. ที่แล้ว', type: 'image' },
            { id: 'nasa-s3', url: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800&auto=format&fit=crop&q=80', time: '8 ชม. ที่แล้ว', type: 'image' }
        ],
        highlights: [
            {
                id: 'nasa-h1',
                title: 'Mars',
                cover: 'https://images.unsplash.com/photo-1612892483236-42d68a57623d?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'nasa-h1-s1', url: 'https://images.unsplash.com/photo-1612892483236-42d68a57623d?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' },
                    { id: 'nasa-h1-s2', url: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            },
            {
                id: 'nasa-h2',
                title: 'Webb Space',
                cover: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'nasa-h2-s1', url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' },
                    { id: 'nasa-h2-s2', url: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            },
            {
                id: 'nasa-h3',
                title: 'Moon Mission',
                cover: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'nasa-h3-s1', url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            }
        ]
    },
    natgeo: {
        username: 'natgeo',
        fullName: 'National Geographic',
        avatar: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=150&auto=format&fit=crop&q=80',
        posts: '28.9K',
        followers: '283M',
        following: '142',
        bio: 'Inspiring people to care about the planet. 🌍 Explore the world through our photographers\' eyes. linkin.bio/nationalgeographic',
        stories: [
            { id: 'ng-s1', url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80', time: '1 ชม. ที่แล้ว', type: 'image' },
            { id: 'ng-s2', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', time: '3 ชม. ที่แล้ว', type: 'image' },
            { id: 'ng-s3', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', time: '6 ชม. ที่แล้ว', type: 'image' }
        ],
        highlights: [
            {
                id: 'ng-h1',
                title: 'Wildlife',
                cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'ng-h1-s1', url: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' },
                    { id: 'ng-h1-s2', url: 'https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            },
            {
                id: 'ng-h2',
                title: 'Ocean Life',
                cover: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'ng-h2-s1', url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' },
                    { id: 'ng-h2-s2', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            }
        ]
    },
    cristiano: {
        username: 'cristiano',
        fullName: 'Cristiano Ronaldo',
        avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
        posts: '3,680',
        followers: '632M',
        following: '590',
        bio: '⚽ Footballer 🇵🇹 Captain of Portugal National Team & Al Nassr FC. Join my journey.',
        stories: [
            { id: 'cr-s1', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80', time: '45 นาทีที่แล้ว', type: 'image' },
            { id: 'cr-s2', url: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800&auto=format&fit=crop&q=80', time: '4 ชม. ที่แล้ว', type: 'image' }
        ],
        highlights: [
            {
                id: 'cr-h1',
                title: 'CR7 Goals',
                cover: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'cr-h1-s1', url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            },
            {
                id: 'cr-h2',
                title: 'Training',
                cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'cr-h2-s1', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            }
        ]
    },
    mrbeast: {
        username: 'mrbeast',
        fullName: 'MrBeast',
        avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
        posts: '782',
        followers: '56.8M',
        following: '310',
        bio: 'I want to make the world a better place before I die. Check out my new video! 👇 youtube.com/mrbeast',
        stories: [
            { id: 'mb-s1', url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f311?w=800&auto=format&fit=crop&q=80', time: '1 ชม. ที่แล้ว', type: 'image' },
            { id: 'mb-s2', url: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=800&auto=format&fit=crop&q=80', time: '6 ชม. ที่แล้ว', type: 'image' },
            { id: 'mb-s3', url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80', time: '9 ชม. ที่แล้ว', type: 'image' }
        ],
        highlights: [
            {
                id: 'mb-h1',
                title: 'Giveaways',
                cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'mb-h1-s1', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            },
            {
                id: 'mb-h2',
                title: 'Charity',
                cover: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'mb-h2-s1', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            }
        ]
    },
    lzer0x: {
        username: 'lzer0x',
        fullName: 'Lzer0x (Developer)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        posts: '42',
        followers: '1,337',
        following: '137',
        bio: 'Code Explorer & UI/UX Developer. Building beautiful frontends and interactive web apps. 💻🔥✨ lzer0x.github.io',
        stories: [
            { id: 'lz-s1', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80', time: '40 นาทีที่แล้ว', type: 'image' },
            { id: 'lz-s2', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80', time: '3 ชม. ที่แล้ว', type: 'image' }
        ],
        highlights: [
            {
                id: 'lz-h1',
                title: 'Projects',
                cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'lz-h1-s1', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' },
                    { id: 'lz-h1-s2', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            },
            {
                id: 'lz-h2',
                title: 'Setup',
                cover: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=150&auto=format&fit=crop&q=80',
                stories: [
                    { id: 'lz-h2-s1', url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&auto=format&fit=crop&q=80', time: 'Highlight', type: 'image' }
                ]
            }
        ]
    }
};

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
            // strip http URLs or @ symbols if pasted
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

// Function to simulate backend API search
function triggerSearch(username) {
    // Hide previous states
    profileCard.style.display = 'none';
    errorCard.style.display = 'none';
    
    // Show spinner
    btnSpinner.style.display = 'inline-block';
    btnSearch.setAttribute('disabled', 'true');
    loaderWrapper.style.display = 'flex';
    
    // Smooth scroll to loader
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
        // Hide spinners
        btnSpinner.style.display = 'none';
        btnSearch.removeAttribute('disabled');
        loaderWrapper.style.display = 'none';

        // Check search database
        const user = mockDatabase[username];
        if (user) {
            activeUser = user;
            renderProfile(user);
        } else {
            // Show private/not found
            errorCard.style.display = 'block';
        }
    }, 1500); // 1.5 seconds simulated delay
}

// Error action buttons listeners
document.querySelectorAll('.btn-demo-nasa').forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = 'nasa';
        btnClear.style.display = 'flex';
        btnPaste.style.display = 'none';
        triggerSearch('nasa');
    });
});

document.querySelectorAll('.btn-demo-natgeo').forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = 'natgeo';
        btnClear.style.display = 'flex';
        btnPaste.style.display = 'none';
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

    // Load recent stories in grid by default
    renderStoriesGrid(user.stories);

    // Render highlights
    renderHighlightsTrack(user.highlights);

    // Make tabs clickable
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
            card.innerHTML = `
                <img src="${story.url}" alt="Story preview" class="story-card-media">
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
            
            // Open modal when clicked (except the download button)
            card.addEventListener('click', (e) => {
                if (e.target.closest('.story-card-download')) {
                    e.stopPropagation();
                    const url = e.target.closest('.story-card-download').getAttribute('data-url');
                    window.open(url, '_blank');
                    return;
                }
                openStoryModal(stories, index);
            });
            
            storiesGrid.appendChild(card);
        });
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
        
        // Open highlight story playback on bubble click
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
    
    // Draw Highlights inside grid area (instead of story grid)
    storiesGrid.innerHTML = '';
    emptyStories.style.display = 'none';
    
    // Let's render a custom view showing all highlights
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
    
    // Modal Setup
    storyModalAvatar.src = activeUser.avatar;
    storyModalUsername.textContent = activeUser.username;
    
    // Build progress bar segments
    storyProgressContainer.innerHTML = '';
    activeStories.forEach(() => {
        const bar = document.createElement('div');
        bar.className = 'story-progress-bar';
        bar.innerHTML = '<div class="story-progress-fill"></div>';
        storyProgressContainer.appendChild(bar);
    });
    
    // Open Modal display
    storyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // stop page scrolling
    
    playStory(activeStoryIndex);
}

function playStory(index) {
    if (index < 0 || index >= activeStories.length) {
        closeStoryModal();
        return;
    }
    
    activeStoryIndex = index;
    const story = activeStories[index];
    
    // Render content
    storyModalTime.textContent = story.time;
    btnDownloadStory.href = story.url;
    
    storyMediaWrapper.innerHTML = `<img src="${story.url}" alt="Story content">`;
    
    // Reset progress bar elements
    const progressFills = storyProgressContainer.querySelectorAll('.story-progress-fill');
    progressFills.forEach((fill, i) => {
        if (i < index) {
            fill.style.width = '100%';
            fill.style.transition = 'none';
        } else if (i === index) {
            fill.style.width = '0%';
            fill.style.transition = 'none';
        } else {
            fill.style.width = '0%';
            fill.style.transition = 'none';
        }
    });

    // Reset Play/Pause Buttons
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    isPaused = false;
    
    // Start playback timer animation
    startProgressTimer(index);
}

function startProgressTimer(index) {
    clearTimeout(playbackTimer);
    
    const fill = storyProgressContainer.querySelectorAll('.story-progress-fill')[index];
    
    // Use requestAnimationFrame for smoother timing
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
            // Next story
            setTimeout(() => {
                playStory(activeStoryIndex + 1);
            }, 100);
        }
    }
    
    playbackTimer = requestAnimationFrame(animate);
}

// Pause playback
function pausePlayback() {
    if (isPaused) return;
    isPaused = true;
    clearTimeout(playbackTimer);
    
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    
    // Track elapsed time
    const elapsed = Date.now() - startTime;
    remainingTime = Math.max(progressDuration - elapsed, 0);
}

// Resume playback
function resumePlayback() {
    if (!isPaused) return;
    isPaused = false;
    
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
            setTimeout(() => {
                playStory(activeStoryIndex + 1);
            }, 100);
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

// Click Left or Right side of screen inside modal to navigate
storyMediaWrapper.addEventListener('click', (e) => {
    const width = storyMediaWrapper.clientWidth;
    const clickX = e.offsetX;
    
    if (clickX < width / 3) {
        // Clicked left 30%
        playStory(activeStoryIndex - 1);
    } else {
        // Clicked right 70%
        playStory(activeStoryIndex + 1);
    }
});

// Close Story Modal
function closeStoryModal() {
    clearTimeout(playbackTimer);
    storyModal.style.display = 'none';
    document.body.style.overflow = ''; // restore scrolling
}

btnCloseModal.addEventListener('click', closeStoryModal);
storyModalOverlay.addEventListener('click', closeStoryModal);

// Close on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyModal.style.display === 'flex') {
        closeStoryModal();
    } else if (e.key === 'ArrowRight' && storyModal.style.display === 'flex') {
        playStory(activeStoryIndex + 1);
    } else if (e.key === 'ArrowLeft' && storyModal.style.display === 'flex') {
        playStory(activeStoryIndex - 1);
    }
});

// Swipe support for Mobile Story Viewer
let touchStartX = 0;
let touchEndX = 0;

storyModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pausePlayback(); // pause while holding
}, { passive: true });

storyModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    
    // Swipe calculation
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
        // Swiped left -> next
        playStory(activeStoryIndex + 1);
    } else if (touchEndX - touchStartX > threshold) {
        // Swiped right -> prev
        playStory(activeStoryIndex - 1);
    } else {
        // Just clicked / let go -> resume
        resumePlayback();
    }
}, { passive: true });


// FAQ Accordion Toggle Logic
faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    
    trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other panels
        faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-panel').style.maxHeight = null;
        });
        
        if (!isActive) {
            item.classList.add('active');
            // Dynamically set height to scrollHeight for slide transition
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
});
