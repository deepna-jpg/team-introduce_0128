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

/**
 * Data Manager
 * Handles loading and providing team data
 */
const dataManager = {
    // Dummy Data for visual testing
    members: [
        new TeamMember(
            "지현",
            "기획 · 구조 설계",
            "사용자 목적 정리, 기능 범위 결정, 문서화",
            "서비스의 목적과 사용자를 정의하고, 팀이 흔들리지 않도록 기준을 만듭니다.",
            "문제정의, 정보 구조화, 의사결정 기준 수립",
            "https://via.placeholder.com/150"
        ),
        new TeamMember(
            "나연",
            "UI/UX 디자인",
            "와이어프레임, 화면 설계, 시각적 완성도",
            "정보가 가장 잘 보이도록 화면의 흐름과 위계를 설계합니다.",
            "가독성 중심 설계, 레이아웃 구성, 디자인 일관성",
            "https://via.placeholder.com/150"
        ),
        new TeamMember(
            "아윤",
            "프론트엔드 개발",
            "페이지 구현, 데이터 연동, 반응형 대응",
            "설계된 구조를 안정적으로 구현하고, 유지보수가 쉬운 코드로 정리합니다.",
            "컴포넌트 설계, 구조화된 코드, 배포 환경 구성",
            "https://via.placeholder.com/150"
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
    container: document.getElementById('team-container'),

    createCardElement(member) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('team-card');

        // Inner HTML structure for Flip Effect
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${member.imagePath}" alt="${member.name}" style="width:100px; height:100px; border-radius:50%; margin-bottom:15px;">
                    <h2>${member.name}</h2>
                    <p>${member.role}</p>
                </div>
                <div class="card-back">
                    <h3>${member.name}</h3>
                    <p><strong>담당:</strong> ${member.tasks}</p>
                    <p><strong>소개:</strong> ${member.intro}</p>
                    <p><strong>역량:</strong> ${member.skills}</p>
                </div>
            </div>
        `;

        // Click Event for Flip
        cardDiv.addEventListener('click', () => {
            cardDiv.classList.toggle('flipped');
        });

        return cardDiv;
    },

    renderAll() {
        const members = dataManager.getAllMembers();
        if (!this.container) return; // Guard clause

        this.container.innerHTML = ''; // Clear existing content
        members.forEach(member => {
            const cardElement = this.createCardElement(member);
            this.container.appendChild(cardElement);
        });
    }
};

// Initialize on window load
window.addEventListener('DOMContentLoaded', () => {
    renderer.renderAll();
    console.log("Team Introduction Page Initialized");
});
