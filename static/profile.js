// ============================================================================
// PROFILE.JS — FINAL STABLE VERSION
// ============================================================================

// LocalStorage Keys
const KEY_PROFILE = "PrepPilot_Profile";
const KEY_PHOTO = "PrepPilot_Profile_Photo";
const KEY_ROADMAP = "PrepPilot_Roadmap";
const KEY_PROGRESS = "PrepPilot_Progress";

// Global skills array
let selectedSkills = [];

// ============================================================================
// DEFAULT AVATAR (LIKE GOOGLE) BASED ON FIRST LETTER OF NAME
// ============================================================================
function setDefaultAvatar(name = "P") {
    const avatar = document.getElementById("defaultAvatar");
    avatar.innerText = name && name.trim() !== "" 
        ? name.charAt(0).toUpperCase() 
        : "P";
}


// ============================================================================
// PHOTO UPLOAD — Replace default avatar
// ============================================================================
function uploadPhoto() {
    const file = document.getElementById("photoInput").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        localStorage.setItem(KEY_PHOTO, reader.result);

        document.getElementById("defaultAvatar").classList.add("hidden");

        const img = document.getElementById("profilePhoto");
        img.classList.remove("hidden");
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

// ============================================================================
// SKILLS — Add from dropdown
// ============================================================================
function addSkillFromDropdown() {
    const sel = document.getElementById("skillSelect");
    if (sel.value && !selectedSkills.includes(sel.value)) {
        selectedSkills.push(sel.value);
        renderSkills();
        saveProfile(false);
    }
    sel.value = "";
}

// ============================================================================
// SKILLS — Add custom skill
// ============================================================================
function addCustomSkill() {
    const input = document.getElementById("customSkill");
    let skill = input.value.trim();
    if (skill && !selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
        renderSkills();
        saveProfile(false);
    }
    input.value = "";
}

// ============================================================================
// SKILLS — Remove skill
// ============================================================================
function removeSkill(index) {
    selectedSkills.splice(index, 1);
    renderSkills();
    saveProfile(false);
}

// ============================================================================
// SKILLS — Render in UI
// ============================================================================
function renderSkills() {
    const box = document.getElementById("skillsBox");
    box.innerHTML = "";

    selectedSkills.forEach((sk, i) => {
        box.innerHTML += `
            <span class="skill-tag">
                ${sk}
                <span class="remove-skill" onclick="removeSkill(${i})">×</span>
            </span>
        `;
    });
}

// ============================================================================
// ROADMAP — Render
// ============================================================================
function renderRoadmap() {
    const box = document.getElementById("roadmapBox");
    const roadmap = localStorage.getItem(KEY_ROADMAP);

    if (!roadmap) {
        box.innerHTML = `
            <p>No roadmap selected.</p>
        `;
        return;
    }

    box.innerHTML = `
        <strong>Your Roadmap</strong>
        <pre style="white-space:pre-wrap; margin-top:10px;">${roadmap}</pre>
    `;
}

// ============================================================================
// ROADMAP — Open modal
// ============================================================================
function openRoadmapGenerator() {
    document.getElementById("roadmapModal").classList.remove("hidden");
}

// ============================================================================
// ROADMAP — Close modal
// ============================================================================
function closeRoadmapModal() {
    document.getElementById("roadmapModal").classList.add("hidden");
}

// ============================================================================
// ROADMAP — Generate Roadmap template
// ============================================================================
function generateRoadmapFromProfile() {
    const year = document.getElementById("rmYear").value.trim();
    const goal = document.getElementById("rmGoal").value.trim();
    const hrs = document.getElementById("rmHours").value.trim();

    const roadmap = `
PrepPilot Personalized Roadmap
-------------------------------------------
🎯 Goal: ${goal}
📅 Year: ${year}
⏳ Study Time: ${hrs} hrs/day

Weeks 1–2:
• DSA Basics — Arrays, Strings
• Learn HTML + CSS basics
• Build discipline + routines

Weeks 3–4:
• LinkedList, Stack, Queue
• Begin a simple project
• Resume polishing

Weeks 5–6:
• Trees, Graphs, Recursion
• Second project + GitHub setup

Weeks 7–8:
• Mock interviews
• Internship applications

🔥 Tip: Stay consistent. Progress > Perfection.
`;

    localStorage.setItem(KEY_ROADMAP, roadmap);

    closeRoadmapModal();
    renderRoadmap();
    alert("Your roadmap has been generated!");
}

// ============================================================================
// ROADMAP — Clear
// ============================================================================
function clearRoadmap() {
    if (confirm("Remove your roadmap?")) {
        localStorage.removeItem(KEY_ROADMAP);
        renderRoadmap();
    }
}

// ============================================================================
// SAVE PROFILE (Name, College, Phone, Email, Skills)
// ============================================================================
function saveProfile(showAlert = true) {
    const data = {
        name: document.getElementById("name").value.trim(),
        college: document.getElementById("college").value.trim(),
        passingYear: document.getElementById("passingYear").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        skills: selectedSkills
    };

    localStorage.setItem(KEY_PROFILE, JSON.stringify(data));

    setDefaultAvatar(data.name);

    if (showAlert) alert("Profile saved successfully!");
}

// ============================================================================
// RESET PROFILE (but keep study planner data)
// ============================================================================
function resetProfile() {
    if (!confirm("Reset profile details?")) return;

    localStorage.removeItem(KEY_PROFILE);
    localStorage.removeItem(KEY_PHOTO);
    localStorage.removeItem(KEY_ROADMAP);

    selectedSkills = [];
    loadProfile();
}

// ============================================================================
// LOAD PROFILE (on page load)
// ============================================================================
function loadProfile() {
    const saved = JSON.parse(localStorage.getItem(KEY_PROFILE) || "{}");

    document.getElementById("name").value = saved.name || "";
    document.getElementById("college").value = saved.college || "";
    document.getElementById("passingYear").value = saved.passingYear || "";
    document.getElementById("phone").value = saved.phone || "";
    document.getElementById("email").value = saved.email || "";

    selectedSkills = saved.skills || [];
    renderSkills();

    setDefaultAvatar(saved.name);

    // Load photo if exists
    const photo = localStorage.getItem(KEY_PHOTO);
    if (photo) {
        document.getElementById("defaultAvatar").classList.add("hidden");
        const img = document.getElementById("profilePhoto");
        img.classList.remove("hidden");
        img.src = photo;
    }

    renderRoadmap();
    updateProgressCircle();
}

// ============================================================================
// PROGRESS CIRCLE — Animate
// ============================================================================
function updateProgressCircle() {
    const progressValue = Number(localStorage.getItem("prepProgress") || 0);
    const progressCircle = document.querySelector(".progress-circle .progress");
    const progressText = document.getElementById("profileProgressText");

    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (progressValue / 100) * circumference;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = offset;

    progressText.textContent = progressValue + "%";
}

// ============================================================================
// INITIALIZE
// ============================================================================
document.addEventListener("DOMContentLoaded", loadProfile);
