/* [C 작업 산출물]
    1. 데이터 스키마 정의: name, role, summary, detail, tags, img
    2. 렌더링 위치: #team-container
    3. 토글 클래스: .flipped
*/

// [Step C-1] 데이터 정의 (배열/JSON 구조)
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
        role: "UI/UX 디자인",
        summary: "정보가 가장 잘 보이도록 화면의 흐름과 위계를 설계합니다.",
        detail: "<strong>역할:</strong> UI/UX 디자인<br><strong>담당업무:</strong> 와이어프레임, 화면 설계, 시각적 완성도 <br><strong>특화역량:</strong> 가독성 중심 설계, 레이아웃 구성, 디자인 일관성",
        img: "https://placehold.co/150x150/e74c3c/white?text=LYH"
    },
    {
        id: 3,
        name: "아윤",
        role: "프론트엔드 개발",
        summary: "설계된 구조를 안정적으로 구현하고, 유지보수가 쉬운 코드로 정리합니다.",
        detail: "<strong>역할:</strong> 프론트엔드 개발<br><strong>담당업무:</strong> 페이지 구현, 데이터 연동, 반응형 대응 <br><strong>특화역량:</strong> 컴포넌트 설계, 구조화된 코드, 배포 환경 구성",
        img: "https://placehold.co/150x150/f1c40f/white?text=PJS"
    }
];

// 상수 정의 (유지보수를 위해)
const DOM_ID = 'team-container';
const FLIP_CLASS = 'flipped';

// [Step C-2] 렌더링 함수
document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
    bindEvents();
});

function renderMembers() {
    const container = document.getElementById(DOM_ID);

    // 안전장치: 컨테이너가 없으면 중단
    if (!container) {
        console.error(`[Error] #${DOM_ID} 요소를 찾을 수 없습니다.`);
        return;
    }

    // HTML 생성 (map 사용)
    const htmlString = members.map(member => {

        // 이미지 없을 경우 기본 이미지 처리 (Step C-5)
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

// [Step C-3] 이벤트 바인딩 (이벤트 위임 방식)
function bindEvents() {
    const container = document.getElementById(DOM_ID);
    if (!container) return;
    container.addEventListener('click', (e) => {
        // 클릭된 요소의 조상 중 가장 가까운 .team-card 찾기
        const card = e.target.closest('.team-card');

        // .team-card 영역 밖을 클릭했으면 무시
        if (!card) return;

        // 토글 실행
        card.classList.toggle(FLIP_CLASS);
    });
}