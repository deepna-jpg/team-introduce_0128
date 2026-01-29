/* [Merged Script]
    - Features: Dynamic Team Cards (Member C), Header Info (Member B/Develop)
    - Data: Combined Members + Team Info
*/

// [Data] 팀원 데이터 (최신화된 C 작업물)
const members = [
    {
        id: 1,
        name: "나연",
        role: "기획 · 구조 설계",
        summary: "서비스의 목적과 사용자를 정의하고, 팀이 흔들리지 않도록 기준을 만듭니다.",
        detail: "<strong>역할:</strong> 서비스 기획 / 요구사항 정의<br><strong>담당업무:</strong> 사용자 목적 정리, 기능 범위 결정, 문서화<br><strong>특화역량:</strong> 문제정의, 정보 구조화, 의사결정 기준 수립",
        img: "https://placehold.co/150x150/2c3e50/white?text=KCS"
    },
    {
        id: 2,
        name: "지현",
        role: "UX/UI Designer",
        summary: "UI/UX 디자인",
        detail: "정보가 가장 잘 보이도록 화면의 흐름과 위계를 설계합니다.",
        img: "https://placehold.co/150x150/e74c3c/white?text=LYH"
    },
    {
        id: 3,
        name: "아윤",
        role: "Frontend Developer",
        summary: "코드로 가치를 만듭니다",
        detail: "확장 가능하고 버그 없는 코드를 지향합니다.",
        img: "https://placehold.co/150x150/f1c40f/white?text=PJS"
    }
];

// [Data] 팀 정보 (Develop 브랜치 내용 반영)
const teamInfo = {
    name: "KPU Team Project", // 'KPU' from develop, slightly enhanced
    description: "기획·디자인·개발이 분리되지 않고, 하나의 흐름으로 함께 작업합니다."
};

// [Config] 상수 정의
const DOM_ID = 'team-container';
const FLIP_CLASS = 'flipped';

// [Init] 초기화
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

    const htmlString = members.map(member => {
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
    console.log(`[System] ${members.length}명의 멤버 렌더링 완료.`);
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
