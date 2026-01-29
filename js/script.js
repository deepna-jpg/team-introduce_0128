// [Member C's Area]
// Data Structure & Logic

/**
 * Team Member Information Class
 */
class TeamMember {
    constructor(name, role, tasks, intro, skills, imagePath) {
        this.name = name;
        this.role = role;
        this.tasks = tasks; // string or array
        this.intro = intro;
        this.skills = skills;
        this.imagePath = imagePath;
    }
}

// [Data] 팀 정보
const teamInfo = {
    name: "KPU",
    description: "기획·디자인·개발이 분리되지 않고, 하나의 흐름으로 함께 작업합니다."
};

/**
 * Data Manager
 * Handles loading and providing team data
 */
const dataManager = {
    members: [
        new TeamMember(
            "나연",
            "기획 · 구조 설계",
            "사용자 목적 정리, 기능 범위 결정, 문서화",
            "서비스의 목적과 사용자를 정의하고, 팀이 흔들리지 않도록 기준을 만듭니다.",
            "문제정의, 정보 구조화, 의사결정 기준 수립",
            "images/nayeon.png"
        ),
        new TeamMember(
            "지현",
            "UI/UX 디자인",
            "와이어프레임, 화면 설계, 시각적 완성도",
            "정보가 가장 잘 보이도록 화면의 흐름과 위계를 설계합니다.",
            "가독성 중심 설계, 레이아웃 구성, 디자인 일관성",
            "images/jihyun.png"
        ),
        new TeamMember(
            "아윤",
            "프론트엔드 개발",
            "페이지 구현, 데이터 연동, 반응형 대응",
            "설계된 구조를 안정적으로 구현하고, 유지보수가 쉬운 코드로 정리합니다.",
            "컴포넌트 설계, 구조화된 코드, 배포 환경 구성",
            "images/ayoon.png"
        )
    ],

    getAllMembers() {
        return this.members;
    }
};

/**
 * UI Renderer
 * Handles DOM manipulation
 */
const renderer = {
    container: document.getElementById('teamGrid'),

    createCardElement(member) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Inner HTML structure for Flip Effect
        // Front: Image, Name, Role
        // Back: Tasks, Intro, Skills
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${member.imagePath}" alt="${member.name}" class="profile-img" onerror="this.src='https://placehold.co/150?text=No+Img'">
                    <h2>${member.name}</h2>
                    <p class="role">${member.role}</p>
                </div>
                <div class="card-back">
                    <h3>${member.name} 상세 정보</h3>
                    <p><strong>담당:</strong> ${member.tasks}</p>
                    <p><strong>소개:</strong> ${member.intro}</p>
                    <p><strong>역량:</strong> ${member.skills}</p>
                </div>
            </div>
        `;

        // Click Event for Flip
        cardDiv.addEventListener('click', () => {
            cardDiv.classList.toggle('is-flipped');
        });

        return cardDiv;
    },

    renderTeamInfo() {
        const headerTitle = document.querySelector('header h1');
        const headerQuote = document.querySelector('.team-quote');

        if (headerTitle) headerTitle.textContent = teamInfo.name;
        if (headerQuote) headerQuote.textContent = teamInfo.description;
    },

    renderAll() {
        const members = dataManager.getAllMembers();
        if (!this.container) {
            console.error("[Error] #teamGrid 요소를 찾을 수 없습니다.");
            return;
        }

        this.container.innerHTML = ''; // Clear existing content
        members.forEach(member => {
            const cardElement = this.createCardElement(member);
            this.container.appendChild(cardElement);
        });
        console.log(`[System] ${members.length}명의 멤버 렌더링 완료.`);
    }
};

/**
 * Theme Manager
 * Handles Light/Dark mode switching
 */
const themeManager = {
    toggleBtn: null,
    currentTheme: localStorage.getItem('theme') || 'light',

    init() {
        this.toggleBtn = document.getElementById('themeToggle');
        if (!this.toggleBtn) return;

        // Apply saved theme
        this.applyTheme(this.currentTheme);

        // Event listener
        this.toggleBtn.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        });
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update button text
        const modeText = this.toggleBtn.querySelector('.mode-text');
        if (modeText) {
            modeText.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
        }

        console.log(`[System] Theme switched to: ${theme}`);
    }
};

// Initialize on window load
window.addEventListener('DOMContentLoaded', () => {
    renderer.renderTeamInfo();
    renderer.renderAll();
    themeManager.init();
    console.log("Team Introduction Page Initialized");
});
