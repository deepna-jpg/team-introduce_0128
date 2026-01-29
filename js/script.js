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
            "김팀장",
            "PM / Publishing",
            "전체 일정 관리, 구조 설계",
            "팀의 중심을 잡는 리더입니다.",
            "HTML/CSS, Communication",
            "https://via.placeholder.com/150"
        ),
        new TeamMember(
            "유디자이너",
            "UI/UX Design",
            "화면 설계, 디자인 시스템",
            "사용자 경험을 최우선으로 생각합니다.",
            "Figma, CSS Animation",
            "https://via.placeholder.com/150"
        ),
        new TeamMember(
            "박개발자",
            "Frontend Dev",
            "로직 구현, 데이터 바인딩",
            "효율적인 코드를 작성합니다.",
            "JavaScript, React",
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
            cardDiv.classList.toggle('is-flipped');
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
