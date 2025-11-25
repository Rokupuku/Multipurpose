// 1. 필요한 DOM 요소들을 선택합니다.
// ID 선택자: document.getElementById()
const mainHeading = document.getElementById('main-heading');
const dynamicText = document.getElementById('dynamic-text');
const profileImage = document.getElementById('profile-image');
const imageCaption = document.getElementById('image-caption');
const actionButton = document.getElementById('action-button');
const clickCountSpan = document.getElementById('click-count');
const progressBar = document.getElementById('progress-bar');
const skillList = document.getElementById('skill-list'); // 기술 목록 UL 요소

// 2. 변수와 데이터 타입을 사용하여 상태를 관리합니다.
let clickCounter = 0; // 클릭 횟수를 저장할 변수 (Number 타입)

// 동적 텍스트 및 이미지 소스를 위한 배열 (String 타입)
const headings = [
    "안녕하세요, 새로운 도전을 즐기는 김 충 개발자입니다!",
    "함께 만들어가는 웹 세상에 오신 것을 환영합니다!",
    "준비된 개발 역량을 펼쳐보세요!",
    "궁금한 점이 있다면 언제든지 문의하세요!"
];

const texts = [
    "웹 페이지와 상호작용하는 첫 걸음입니다. 버튼을 눌러 경험해보세요!",
    "이제 JavaScript의 마법을 경험할 시간입니다. 계속 클릭해주세요!",
    "김 충의 학습 여정을 통해 다양한 기술을 습득하고 있습니다.",
    "여러분의 피드백은 저에게 큰 힘이 됩니다. 계속 지켜봐 주세요!"
];

const imageUrls = [
    "https://via.placeholder.com/400x250?text=Developer+Profile", // 초기 이미지
    "https://via.placeholder.com/400x250/FFC107/FFFFFF?text=Learning+Web", // 학습 중
    "https://via.placeholder.com/400x250/28A745/FFFFFF?text=Project+Complete", // 프로젝트 완료
    "https://via.placeholder.com/400x250/DC3545/FFFFFF?text=Coding+Life" // 코딩 라이프
];

const imageCaptions = [
    "김 충 포트폴리오의 첫 인상입니다.",
    "열심히 학습하고 있는 모습입니다.",
    "새로운 프로젝트를 성공적으로 마쳤습니다!",
    "코딩과 함께하는 즐거운 일상입니다."
];

const newSkills = [ // 추가될 기술 스택 목록
    "JavaScript 기본 문법",
    "DOM 조작의 이해",
    "이벤트 처리",
    "조건문과 반복문",
    "클래스 추가/제거",
    "배열과 객체 활용",
    "비동기 처리(추후 학습)"
];

let currentSkillIndex = 0; // 추가할 기술의 인덱스

// 3. 이벤트 처리: 버튼 클릭 이벤트 리스너를 추가합니다.
// addEventListener() 메서드를 사용합니다.
actionButton.addEventListener('click', function() {
    // 3-1. 클릭 횟수 증가 및 업데이트
    clickCounter++;
    clickCountSpan.textContent = clickCounter; // textContent 속성으로 요소 내부 텍스트 변경

    // 3-2. 제목 및 본문 텍스트 변경 (조건문 및 배열 활용)
    // 나머지(%) 연산자를 사용하여 배열의 끝에 도달하면 처음으로 돌아갑니다.
    const currentHeadingIndex = (clickCounter - 1) % headings.length;
    mainHeading.textContent = headings[currentHeadingIndex];
    const currentTextIndex = (clickCounter - 1) % texts.length;
    dynamicText.textContent = texts[currentTextIndex];
    
    // 3-3. 이미지 변경 (src 속성 변경)
    const currentImageIndex = (clickCounter - 1) % imageUrls.length;
    profileImage.setAttribute('src', imageUrls[currentImageIndex]); // setAttribute()로 속성 값 변경
    imageCaption.textContent = imageCaptions[currentImageIndex];
    
    // 3-4. 요소의 스타일 및 클래스 동적 변경
    // `classList.toggle()`을 사용하여 CSS 클래스를 추가하거나 제거합니다.
    profileImage.classList.toggle('transformed-image'); // 클릭할 때마다 이미지를 변형/원상복귀
    
    // 3-5. 진행 바 업데이트 (스타일 속성 변경)
    // 0~100까지 클릭 횟수에 따라 진행률을 계산합니다. (최대 10회까지 100%)
    let progressPercentage = Math.min(100, clickCounter * 10);
    progressBar.style.width = `${progressPercentage}%`; // style 속성으로 CSS 스타일 변경
    progressBar.textContent = `${progressPercentage}%`; // 진행률 텍스트 표시
    
    // 3-6. 동적으로 새로운 목록 아이템 추가 (DOM 조작)
    if (currentSkillIndex < newSkills.length) {
        // 1. 새로운 <li> 요소를 생성합니다.
        const newListItem = document.createElement('li'); // createElement()로 요소 생성

        // 2. 새로운 <li> 요소에 텍스트 내용을 추가합니다.
        newListItem.textContent = newSkills[currentSkillIndex];
        
        // 3. <ul> 요소의 자식으로 새로운 <li> 요소를 추가합니다.
        skillList.appendChild(newListItem); // appendChild()로 자식 요소 추가
        currentSkillIndex++; // 다음 스킬을 위해 인덱스 증가
        
        // 스킬을 모두 추가하면 버튼 텍스트 변경
        if (currentSkillIndex === newSkills.length) {
            actionButton.textContent = "모든 학습 완료! 리셋하거나 다시 시작";
        }
    } else {
        // 모든 스킬이 추가된 후에는 리셋 기능 제공
        if (actionButton.textContent !== "모든 학습 완료! 리셋하거나 다시 시작") {
            actionButton.textContent = "모든 학습 완료!"; // 혹시 모를 경우를 대비
        } else {
            // 초기 상태로 리셋
            resetPage();
        }
    }
});

// 페이지를 초기 상태로 리셋하는 함수 (추가 기능)
function resetPage() {
    clickCounter = 0;
    currentSkillIndex = 0;
    clickCountSpan.textContent = clickCounter;
    progressBar.style.width = '0%';
    progressBar.textContent = '';
    mainHeading.textContent = headings[0];
    dynamicText.textContent = texts[0];
    profileImage.setAttribute('src', imageUrls[0]);
    imageCaption.textContent = imageCaptions[0];
    
    // skillList의 모든 자식 요소 제거
    while (skillList.firstChild) {
        skillList.removeChild(skillList.firstChild);
    }
    
    // 초기 스킬 목록 추가 (선택 사항, 여기서는 HTML에 이미 있으므로 생략)
    const initialSkills = ["HTML 기본 구조", "CSS 스타일링"];
    initialSkills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillList.appendChild(li);
    });
    
    profileImage.classList.remove('transformed-image'); // 변형 클래스 제거
    actionButton.textContent = "페이지 변화 시작!";
}

// 페이지 로드 시 초기 스킬 목록을 생성합니다. (만약 HTML에 없는 경우)
// 현재는 HTML에 이미 기본 목록이 있으므로 이 부분은 필요 없을 수 있습니다.
// 하지만 동적으로 생성하는 예시를 보여드리기 위해 남겨둡니다.
// window.onload = function() {
//     resetPage(); // 페이지 로드 시 초기 상태로
// }