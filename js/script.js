/* [Merged Script]
    - Features: Dynamic Team Cards (Member C), Header Info (Member B/Develop)
    - Data: Combined Members + Team Info
*/

// [Class] 팀원 정보 구조 확인
class TeamMember {
    constructor(name, role, work, summary, detail, img) {
        this.id = name; // Simple ID using name
        this.name = name;
        this.role = role;
        this.work = work;
        this.summary = summary;
        this.detail = detail;
        this.img = img;
    }
}

// [Data] 팀 정보 (Develop 브랜치 내용 반영)
const teamInfo = {
    name: "KPU Team Project", // 'KPU' from develop, slightly enhanced
    description: "기획·디자인·개발이 분리되지 않고, 하나의 흐름으로 함께 작업합니다."
};

// [Config] 상수 정의
const DOM_ID = 'teamGrid';
const FLIP_CLASS = 'flipped';

/**
 * Data Manager
 * Handles loading and providing team data
 */
const dataManager = {
    // Dummy Data for visual testing
    teamInfo: {
        name: "KPU",
        description: "기획·디자인·개발이 분리되지 않고, 하나의 흐름으로 함께 작업합니다."
    },
    members: [
        new TeamMember(
            "나연",
            "기획 · 구조 설계",
            "사용자 목적 정리, 기능 범위 결정, 문서화",
            "서비스의 목적과 사용자를 정의하고, 팀이 흔들리지 않도록 기준을 만듭니다.",
            "문제정의, 정보 구조화, 의사결정 기준 수립",
            "images/1.png"
        ),
        new TeamMember(
            "지현",
            "UI/UX 디자인",
            "와이어프레임, 화면 설계, 시각적 완성도",
            "정보가 가장 잘 보이도록 화면의 흐름과 위계를 설계합니다.",
            "가독성 중심 설계, 레이아웃 구성, 디자인 일관성",
            "images/2.png"
        ),
        new TeamMember(
            "아윤",
            "프론트엔드 개발",
            "페이지 구현, 데이터 연동, 반응형 대응",
            "설계된 구조를 안정적으로 구현하고, 유지보수가 쉬운 코드로 정리합니다.",
            "컴포넌트 설계, 구조화된 코드, 배포 환경 구성",
            "images/3.png"
        )
    ]
};

// [Step C-2] 렌더링 함수
document.addEventListener('DOMContentLoaded', () => {
    renderTeamInfo(); // Header Info
    renderMembers();  // Cards
    bindEvents();     // Interactions
});

// [Func] 헤더 정보 렌더링 (Develop 기능 통합)
function renderTeamInfo() {
    const headerTitle = document.querySelector('header h1');
    const headerQuote = document.querySelector('.team-quote');

    if (headerTitle) headerTitle.textContent = teamInfo.name;
    if (headerQuote) headerQuote.textContent = teamInfo.description;
}

// [Func] 팀원 카드 렌더링
function renderMembers() {
    const container = document.getElementById(DOM_ID);

    if (!container) {
        console.error(`[Error] #${DOM_ID} 요소를 찾을 수 없습니다.`);
        return;
    }

    const htmlString = dataManager.members.map(member => {
        const imgSrc = member.img ? member.img : 'images/default_profile.png';

        return `
            <div class="team-card" data-id="${member.id}">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${imgSrc}" alt="${member.name}" style="width:100px; height:100px; border-radius:50%; margin-bottom:15px;" onerror="this.src='https://placehold.co/150?text=No+Img'">
                        <h2>${member.name}</h2>
                        <span class="role">${member.role}</span>
                        <p class="summary">"${member.summary}"</p>
                    </div>

                    <div class="card-back">
                        <h3>Detail Info</h3>
                        <p class="detail">${member.detail}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = htmlString;
    console.log(`[System] ${dataManager.members.length}명의 멤버 렌더링 완료.`);
}

// [Func] 이벤트 바인딩
function bindEvents() {
    const container = document.getElementById(DOM_ID);
    if (!container) return;
    container.addEventListener('click', (e) => {
        const card = e.target.closest('.team-card');
        if (!card) return;
        card.classList.toggle(FLIP_CLASS);
    });
}
