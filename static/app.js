function sendMessage(){
    const input = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");

    let userText = input.value.trim();
    if(userText ==="")return;

    //display user message
    chatbox.innerHTML += `<p><b>You:</b>${userText}<p>`;
    input.value="";
    chatbox.scrollTop = chatbox.scrollHeight ;
    // AI Response
    let botReply = getBotReply(userText);

    setTimeout(()=>{
        chatbox.innerHTML += `<p><b>PrepPilot AI : </b>${botReply}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    },600);
}

// Rule-Based AI reply
function getBotReply(message){
    message = message.toLowerCase();
    if(message.includes("1") || message.includes("first")){
        return "Great! As a 1st year Student , You have plenty of time work on your skills and explore many opitons . Your main focus should be Basics , Communication , Coding fundamentals and domain exploration . Now tell me your goal - Placement , Masters , Startup or skill learning ?";
    }
    if(message.includes("2") || message.includes("second")){
        return "Amazing ! 2nd Year is the Right time to focus on Problem-Solving i.e DSA (Data Structures and Algorithms) , Development and start building small projects . What domain are you Intrested In? Web Development, ML(Machine Learning) , App Development , Game Development or something else?";
    }
    if(message.includes("3") || message.includes("third")){
        return "3rd Year is crucial ! Start Internships , DSA seriosly , CS Core Subjects and Company-Specific prep . Tell me Your Dream Company?";
    }
    if(message.includes("4") || message.includes("fourth")){
        return "Final Year is all about Placement readuness - Mock Interviews , resume , projects , and DSA optimization. Which company are you targeting?";
    }
    if (message.includes("google")) {
        return "Google requires strong DSA, problem-solving, system design basics, and consistent practice. I can create a custom Google roadmap if you want!";
    }

    if (message.includes("microsoft")) {
        return "Microsoft focuses on DSA + problem solving + project clarity. Want a Microsoft-focused study roadmap?";
    }

    if (message.includes("web")) {
        return "Web Development Roadmap:\n1. HTML/CSS\n2. JavaScript\n3. React\n4. Backend (Node/Express)\n5. Database (Mongo/MySQL)\n6. Projects.\nDo you want a week-wise plan?";
    }

    if (message.includes("dsa")) {
        return "DSA Roadmap:\n• Step 1: Arrays & Strings\n• Step 2: LinkedList\n• Step 3: Recursion\n• Step 4: Trees\n• Step 5: Graphs\nI can generate a custom DSA plan. Tell me your timeline (1 month / 3 months / 6 months)?";
    }

    if (message.includes("yes")) {
        return "Perfect! Tell me your current year + your goal + time available per day.";
    }

    return "I'm here to guide you 😊 Tell me: Which year are you in and what is your goal?";
}
    

    
