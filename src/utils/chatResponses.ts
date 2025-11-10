// ✅ Import required Firebase Firestore modules
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase"; // Adjust path if needed

// 🏫 COLLEGE CONFIGURATION - Easily editable section
const COLLEGE_CONFIG = {
  name: "Mahendra Engineering College",
  location: "Salem-Tiruchengode Highway, Mahendirapuri, Mallasamudram, Namakkal (Dt)",
  phoneNumbers: ["04288288500", "04288288512", "04288288522"],
  website: "www.mahendra.info",
  workingHours: "9:20 AM to 4:30 PM",
  email: "info@mahendra.info", // You can add this if available
};

// 📚 COURSES LIST - Easily editable section
const COURSES = {
  engineering: [
    "Aeronautical Engineering",
    "Aerospace Engineering", 
    "Agricultural Engineering",
    "Artificial Intelligence and Data Science",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Cyber Security",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Food Technology",
    "Information Technology",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Pharmaceutical Technology"
  ],
  sciences: [
    "Chemistry",
    "English", 
    "Mathematics",
    "Physics"
  ],
  postgraduate: [
    "MBA",
    "MCA"
  ]
};

// 🎯 RESPONSE TEMPLATES - Easily editable section
const RESPONSES = {
  // 👋 Greetings
  greeting: `Hello! 👋 Welcome to ${COLLEGE_CONFIG.name}!\n\nI'm here to help you with:\n🎓 Admissions & Applications\n📚 Courses & Programs\n🏫 Campus Life & Facilities\n💼 Placements & Careers\n📞 Contact Information\n📍 Location & Directions\n\nWhat would you like to know?`,

  // 🎓 Admission Info
  admission: `Our admission process at ${COLLEGE_CONFIG.name}:\n\n📝 Application Process:\n1. Visit our website: ${COLLEGE_CONFIG.website}\n2. Fill out the online application form\n3. Submit required documents (10th, 12th marksheets, transfer certificate)\n4. Pay the application fee\n5. Wait for counseling and seat allocation\n\n📅 Important:\n• Apply before the deadline\n• Keep all documents ready\n• Contact admission cell for queries\n\nNeed help? Call: ${COLLEGE_CONFIG.phoneNumbers[0]}`,

  // 📚 Courses & Programs
  courses: `We offer diverse programs at ${COLLEGE_CONFIG.name}:\n\n🎓 UNDERGRADUATE ENGINEERING:\n${COURSES.engineering.map(course => `• ${course}`).join('\n')}\n\n🔬 SCIENCE & HUMANITIES:\n${COURSES.sciences.map(course => `• ${course}`).join('\n')}\n\n🎓 POSTGRADUATE PROGRAMS:\n${COURSES.postgraduate.map(course => `• ${course}`).join('\n')}\n\nVisit ${COLLEGE_CONFIG.website} for detailed curriculum and eligibility!`,

  // 🏫 Campus Life
  campus: `Campus life at ${COLLEGE_CONFIG.name} is vibrant and enriching!\n\n🏠 Facilities:\n• Modern hostels with Wi-Fi\n• 24/7 library access\n• Sports complex with gym\n• Multiple cafeterias\n• Medical center\n• Transportation services\n\n🎉 Activities:\n• Technical symposiums\n• Cultural festivals\n• Sports tournaments\n• Student clubs and chapters\n• Industry visits\n\nCollege timings: ${COLLEGE_CONFIG.workingHours}`,

  // 💼 Placement Info
  placement: `Our placement record at ${COLLEGE_CONFIG.name} is excellent!\n\n📊 Placement Highlights:\n• Strong industry connections\n• Regular campus drives\n• Internship opportunities\n• Career guidance sessions\n\n💼 Training & Development:\n• Resume building workshops\n• Mock interviews\n• Soft skills training\n• Technical skill enhancement\n\nFor placement queries, contact college administration.`,

  // 📞 Contact Info
  contact: `📞 Contact ${COLLEGE_CONFIG.name}:\n\n📍 Address:\n${COLLEGE_CONFIG.location}\n\n📱 Phone Numbers:\n${COLLEGE_CONFIG.phoneNumbers.map(phone => `• ${phone}`).join('\n')}\n\n🌐 Website: ${COLLEGE_CONFIG.website}\n\n🕒 College Hours:\n${COLLEGE_CONFIG.workingHours} (Monday - Friday)`,

  // 📍 Location Info
  location: `📍 ${COLLEGE_CONFIG.name} is located at:\n\n${COLLEGE_CONFIG.location}\n\n🚗 How to reach:\n• Situated on Salem-Tiruchengode Highway\n• Well-connected by road transport\n• Accessible from both Salem and Namakkal\n• College buses available from major points\n\nFor detailed directions, visit our website or contact us.`,

  // 🔍 Specific Course Info
  specificCourse: (courseName: string) => 
    `🎓 ${courseName} at ${COLLEGE_CONFIG.name}:\n\nThis program offers comprehensive education with:\n• Modern curriculum\n• Experienced faculty\n• Well-equipped laboratories\n• Industry-relevant projects\n• Placement opportunities\n\nFor detailed syllabus, fees, and admission process for ${courseName}, please visit our website: ${COLLEGE_CONFIG.website} or contact the administration.`,

  // 💰 Fees & Scholarships
  fees: `💰 Fee Structure & Financial Aid at ${COLLEGE_CONFIG.name}:\n\n📋 Fee Information:\n• Varies by program and category\n• Includes tuition, examination, and other fees\n• Hostel fees additional\n\n🎓 Scholarships Available:\n• Government scholarships\n• Merit-based scholarships\n• Sports scholarships\n• Management quotas\n\nFor exact fee structure and scholarship details, please contact the accounts office at: ${COLLEGE_CONFIG.phoneNumbers[0]}`,

  // 🙏 Thank You
  thankYou: `You're welcome! 😊\n\nIf you have any more questions about ${COLLEGE_CONFIG.name}, feel free to ask. We're here to help you make the best decision for your future!\n\nFor immediate assistance, call us at ${COLLEGE_CONFIG.phoneNumbers[0]} during college hours (${COLLEGE_CONFIG.workingHours}).\n\nHave a great day!`,

  // 🤖 Default Fallback
  default: `Thank you for your query! 🙂\n\nI can help you with information about ${COLLEGE_CONFIG.name}:\n• 🎓 Admission Process\n• 📚 Courses & Programs\n• 🏫 Campus Life\n• 💼 Placements & Careers\n• 📞 Contact Information\n• 📍 Location & Directions\n• 💰 Fees & Scholarships\n\nCould you please specify what you'd like to know more about?`
};

// ✅ Define async function to process user messages
export async function getAIResponse(userMessage: string): Promise<string> {
  const message = userMessage.toLowerCase().trim();
  let response = "";

  // 👋 Greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("good morning") || message.includes("good afternoon")) {
    response = RESPONSES.greeting;
  }

  // 🎓 Admission Info
  else if (message.includes("admission") || message.includes("apply") || message.includes("application") || message.includes("admit") || message.includes("enroll")) {
    response = RESPONSES.admission;
  }

  // 📚 Courses & Programs
  else if (message.includes("course") || message.includes("program") || message.includes("degree") || message.includes("department") || message.includes("branch") || message.includes("study")) {
    
    // Check for specific course queries
    const specificCourse = COURSES.engineering.concat(COURSES.sciences, COURSES.postgraduate)
      .find(course => message.includes(course.toLowerCase().replace(/ and /g, " ").replace(/ /g, "")));
    
    if (specificCourse) {
      response = RESPONSES.specificCourse(specificCourse);
    } else {
      response = RESPONSES.courses;
    }
  }

  // 🏫 Campus Life
  else if (message.includes("campus") || message.includes("life") || message.includes("hostel") || message.includes("facility") || message.includes("library") || message.includes("sport")) {
    response = RESPONSES.campus;
  }

  // 💼 Placement Info
  else if (message.includes("placement") || message.includes("job") || message.includes("career") || message.includes("recruitment") || message.includes("company") || message.includes("salary")) {
    response = RESPONSES.placement;
  }

  // 📞 Contact Info
  else if (message.includes("contact") || message.includes("phone") || message.includes("call") || message.includes("number") || message.includes("email")) {
    response = RESPONSES.contact;
  }

  // 📍 Location Info
  else if (message.includes("location") || message.includes("address") || message.includes("where") || message.includes("map") || message.includes("direction")) {
    response = RESPONSES.location;
  }

  // 💰 Fees & Scholarships
  else if (message.includes("fee") || message.includes("tuition") || message.includes("cost") || message.includes("scholarship") || message.includes("financial") || message.includes("payment")) {
    response = RESPONSES.fees;
  }

  // 🙏 Thank You
  else if (message.includes("thank") || message.includes("thanks") || message.includes("bye") || message.includes("goodbye")) {
    response = RESPONSES.thankYou;
  }

  // 🤖 Default Fallback
  else {
    response = RESPONSES.default;
  }

  // 📝 Save to Firestore
  try {
    await addDoc(collection(db, "userQueries"), {
      userMessage,
      response,
      timestamp: serverTimestamp(),
      college: COLLEGE_CONFIG.name,
      category: getCategoryFromMessage(message) // Optional: for analytics
    });
    console.log("✅ Query saved to Firestore successfully.");
  } catch (error) {
    console.error("❌ Error saving query:", error);
  }

  // Return AI-generated response
  return response;
}

// 🔧 Helper function to categorize messages for analytics
function getCategoryFromMessage(message: string): string {
  if (message.includes("admission")) return "admission";
  if (message.includes("course") || message.includes("program")) return "courses";
  if (message.includes("campus") || message.includes("hostel")) return "campus";
  if (message.includes("placement") || message.includes("job")) return "placement";
  if (message.includes("contact") || message.includes("phone")) return "contact";
  if (message.includes("location") || message.includes("address")) return "location";
  if (message.includes("fee") || message.includes("scholarship")) return "fees";
  if (message.includes("thank") || message.includes("hello")) return "general";
  return "other";
}

// 📋 Example usage prompts for testing:
/*
"Hi, I want information about admissions"
"What courses do you offer?"
"Tell me about Computer Science and Engineering"
"Where is the college located?"
"What are your contact details?"
"Tell me about campus facilities"
"How are the placements?"
"What is the fee structure?"
"Thank you for your help"
*/