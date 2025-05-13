const memberList = document.getElementById("memberList");
const leaderSelect = document.getElementById("leaderSelect");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalInput = document.getElementById("modalInput");
const modalConfirm = document.getElementById("modalConfirm");
const modalCancel = document.getElementById("modalCancel");
const closeBtn = document.querySelector(".close");

let currentAction = null;

function showModal(title, callback) {
    modalTitle.textContent = title;
    modalInput.value = "";
    modal.style.display = "block";
    currentAction = callback;
}

function hideModal() {
    modal.style.display = "none";
    currentAction = null;
}

// 모달 이벤트 리스너
modalConfirm.addEventListener("click", () => {
    if (currentAction && modalInput.value.trim()) {
        currentAction(modalInput.value.trim());
    }
    hideModal();
});

modalCancel.addEventListener("click", hideModal);
closeBtn.addEventListener("click", hideModal);

// 모달 외부 클릭시 닫기
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

function updateLeaderOptions() {
    const names = Array.from(memberList.querySelectorAll(".avatar"))
        .map(el => el.dataset.name);
    leaderSelect.innerHTML = "";
    names.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        leaderSelect.appendChild(option);
    });
}

document.getElementById("addMember").addEventListener("click", () => {
    showModal("추가할 인원 이름을 입력하세요", (name) => {
        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.dataset.name = name;
        avatar.innerHTML = `
            <img src="../assets/images/user.png" alt=""> ${name}
            <button class="remove-member">×</button>
        `;
        memberList.appendChild(avatar);
        updateLeaderOptions();
    });
});

memberList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-member")) {
        e.target.closest(".avatar").remove();
        updateLeaderOptions();
    }
});

document.getElementById("addCategory").addEventListener("click", () => {
    showModal("분류명을 입력하세요", (name) => {
        const color = document.getElementById("categoryColor").value || "#888";
        const tag = document.createElement("span");
        tag.className = "tag custom";
        tag.style.backgroundColor = color;
        tag.innerHTML = `${name} <span class="remove-tag">×</span>`;
        document.getElementById("categoryList").appendChild(tag);
    });
});

document.getElementById("categoryList").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-tag")) {
        e.target.closest(".tag").remove();
    }
});

document.getElementById("groupImage").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const preview = document.getElementById("imagePreview");

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="미리보기">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = "JPG / PNG 형식만 업로드 가능합니다";
    }
});

document.getElementById("groupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("그룹이 생성되었습니다!");
});

// 초기 대표자 목록 설정
updateLeaderOptions();