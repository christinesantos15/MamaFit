// Workout data from Coach Mark's Program
const day1 = ["Warm-up: Banded Squats (10 reps x 2 sets)", "Warm-up: Crawldowns (10 reps x 2 sets)", "1. Goblet Squats (10 reps x 3 sets)", "2. Romanian Deadlift (10 reps x 3 sets)", "3. Lunges (10 reps x 3 sets)", "4. Frog Pumps (10 reps x 3 sets)", "5. Hip Raised Band Abductions (10 reps x 3 sets)"];
const day2 = ["Warm-up: Shoulder Taps (10 reps x 2 sets)", "Warm-up: Crawldowns (10 reps x 2 sets)", "1. Dumbbell Shoulder Press (10 reps x 3 sets)", "2. Dumbbell Rows (10 reps x 3 sets)", "3. Floor Press (10 reps x 3 sets)", "4. Overhead Pullovers (10 reps x 3 sets)", "5. Renegade Rows (10 reps x 3 sets)"];
const day3 = ["Warm-up: Band Side Walks (20 reps/side x 2 sets)", "Warm-up: Plank (60 secs x 2 sets)", "1. Crunch (10 reps x 3 sets)", "2. Leg Raises (10 reps x 3 sets)", "3. Glute Bridge (10 reps x 3 sets)", "4. Hammer Curls (10 reps x 3 sets)", "5. Kick Backs (10 reps x 3 sets)"];
const cardio = ["Starter: 40 min walk / 10,000 steps", "Mid Level: 50 min walk / 11,000 steps", "Advance: 60 min walk / 12,000 steps"];

let current = [];
let index = 0;
let repsDone = 0;
let currentSets = 0;
let isLiftingDay = false;

// Initialize Streak on Load
window.onload = () => {
    updateStreakDisplay();
};

function updateStreakDisplay() {
    const streak = localStorage.getItem("mamaFitStreak") || 0;
    const lastDate = localStorage.getItem("lastWorkoutDate");
    const today = new Date().toDateString();
    
    let status = "Ready for today's burn! 🔥";
    if (lastDate === today) {
        status = "Today's workout: Done! ✅";
    }

    document.getElementById("streakCounter").innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <span style="font-size: 24px;">🔥 Streak: <strong>${streak} Days</strong></span><br>
            <small>${status}</small>
        </div>
    `;
}

function saveStreak() {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("lastWorkoutDate");
    let streak = parseInt(localStorage.getItem("mamaFitStreak") || 0);

    if (lastDate !== today) {
        // If yesterday was the last workout, increment. If longer ago, reset to 1.
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1;
        }

        localStorage.setItem("mamaFitStreak", streak);
        localStorage.setItem("lastWorkoutDate", today);
    }
}

function showDay1() { startWorkout(day1, true); }
function showDay2() { startWorkout(day2, true); }
function showDay3() { startWorkout(day3, true); }
function showCardio() { startWorkout(cardio, false); }

function startWorkout(day, lifting) {
  current = day;
  index = 0;
  repsDone = 0;
  currentSets = 0;
  isLiftingDay = lifting;
  document.getElementById("streakCounter").style.display = "none"; // Hide streak during workout
  showExercise();
}

function showExercise() {
  const exercise = current[index];
  const output = document.getElementById("output");

  if (isLiftingDay) {
    const isWarmup = exercise.toLowerCase().includes("warm-up");
    const maxSets = isWarmup ? 2 : 3; 
    const targetReps = 10;

    output.innerHTML = `
      <div class="card">
        <h2>${exercise}</h2>
        <p>Set: <strong>${currentSets + 1} / ${maxSets}</strong> | Reps: <strong>${repsDone} / ${targetReps}</strong></p>
        <button onclick="countRep()">Count Rep (+1)</button>
        <br>
        <button onclick="next()" style="background:#757575; margin-top:20px;">Skip Exercise</button>
      </div>
    `;
  } else {
    output.innerHTML = `
      <div class="card">
        <h2>${exercise}</h2>
        <button onclick="next()">Goal Met ✅</button>
      </div>
    `;
  }
}

function countRep() {
  repsDone++;
  const isWarmup = current[index].toLowerCase().includes("warm-up");
  const maxSets = isWarmup ? 2 : 3;

  if (repsDone >= 10) {
    repsDone = 0;
    currentSets++;
    if (currentSets >= maxSets) {
      currentSets = 0;
      next();
      return;
    }
  }
  showExercise();
}

function next() {
  index++;
  repsDone = 0;
  currentSets = 0;

  if (index < current.length) {
    showExercise();
  } else {
    saveStreak(); // Save progress here!
    document.getElementById("output").innerHTML = `
      <div class="card">
        <h2>Great job, Mom! 💙</h2>
        <p>Streak Updated!</p>
        <button onclick="location.reload()">Back Home</button>
      </div>
    `;
  }
  if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(reg => console.log("MamaFit App Ready!"))
      .catch(err => console.log("PWA error", err));
  });
}
}