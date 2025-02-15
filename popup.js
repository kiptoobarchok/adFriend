// Function to switch tabs
function openTab(tabName) {
    // Hide all tab content
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the "active" class from all tab buttons
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab and add the "active" class to the button
    const currentTab = document.getElementById(tabName);
    if (currentTab) {
        currentTab.style.display = "block";
    } else {
        console.error(`Tab content with ID "${tabName}" not found.`);
    }

    const activeTab = document.getElementById(tabName.toLowerCase() + "-tab");
    if (activeTab) {
        activeTab.classList.add("active");
    } else {
        console.error(`No tab button found for tabName: ${tabName}`);
    }

    // If the Quote tab is opened, fetch a new quote and update tasks
    if (tabName === "Quote") {
        fetchQuote();
        updateTopTasks();
    }
}

// Function to fetch a random quote from background.js
function fetchQuote() {
    chrome.runtime.sendMessage({ action: "fetchQuote" }, (response) => {
        if (response && response.quote) {
            document.getElementById("quote").textContent = `"${response.quote}"`;
            document.getElementById("author").textContent = `– ${response.author}`;
        } else {
            console.error("Failed to fetch quote.");
        }
    });
}

// Initialize the popup when loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchQuote(); // Fetch a quote when the popup opens
});

// Button to fetch a new quote
document.getElementById("new-quote").addEventListener("click", fetchQuote);



// Function to update the top 3 tasks in the Urgent & Important quadrant
function updateTopTasks() {
    chrome.storage.local.get("tasks", (data) => {
        const tasks = data.tasks || { "urgent-important": [] };
        const topTasksList = document.getElementById("top-tasks-list");
        if (topTasksList) {
            topTasksList.innerHTML = tasks["urgent-important"]
                .slice(0, 3)
                .map((task) => `<li>${task}</li>`)
                .join("");
        }
    });
}

// Function to render all tasks in the Eisenhower Matrix
function renderTasks() {
    chrome.storage.local.get("tasks", (data) => {
        // Ensure tasks exist, or set default structure
        const tasks = data.tasks ?? {
            "urgent-important": [],
            "not-urgent-important": [],
            "urgent-not-important": [],
            "not-urgent-not-important": [],
        };

        console.log("Tasks retrieved:", tasks); // Debugging: Log tasks

        const quadrants = [
            "urgent-important",
            "not-urgent-important",
            "urgent-not-important",
            "not-urgent-not-important",
        ];

        quadrants.forEach((quadrant) => {
            const list = document.getElementById(`${quadrant}-tasks`);
            if (list) {
                // Ensure the quadrant array exists, fallback to an empty array if not
                const quadrantTasks = tasks[quadrant] ?? [];
                list.innerHTML = quadrantTasks.map((task) => `<li>${task}</li>`).join("");
            } else {
                console.error(`Element with ID '${quadrant}-tasks' not found.`);
            }
        });
    });
}

// Function to add a new task
function addTask(taskText, quadrant) {
    chrome.storage.local.get("tasks", (data) => {
        // Ensure tasks exist or set default structure
        const tasks = data.tasks ?? {
            "urgent-important": [],
            "not-urgent-important": [],
            "urgent-not-important": [],
            "not-urgent-not-important": [],
        };

        // Ensure the specific quadrant array exists
        if (!tasks[quadrant]) {
            console.warn(`Quadrant "${quadrant}" was undefined. Initializing it as an empty array.`);
            tasks[quadrant] = [];
        }

        // Push the new task
        tasks[quadrant].push(taskText);

        // Save updated tasks back to storage
        chrome.storage.local.set({ tasks }, () => {
            console.log(`Task added to "${quadrant}":`, taskText);
            renderTasks(); // Refresh the task list
            updateTopTasks(); // Refresh the top tasks
        });
    });
}

// Function to clear tasks in a specific quadrant or all quadrants
function clearTasks(quadrant = null) {
    chrome.storage.local.get("tasks", (data) => {
        let tasks = data.tasks || {
            "urgent-important": [],
            "not-urgent-important": [],
            "urgent-not-important": [],
            "not-urgent-not-important": [],
        };

        if (quadrant) {
            // Clear only the specified quadrant
            tasks[quadrant] = [];
            console.log(`Cleared tasks in quadrant: ${quadrant}`);
        } else {
            // Clear all quadrants
            for (let key in tasks) {
                tasks[key] = [];
            }
            console.log("Cleared all tasks.");
        }

        chrome.storage.local.set({ tasks }, () => {
            console.log("Tasks updated in storage.");
            renderTasks(); // Refresh task list after clearing
            updateTopTasks(); // Update top urgent tasks
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const fetchQuoteButton = document.getElementById("fetch-quote");

    function updateQuote() {
        chrome.runtime.sendMessage({ action: "fetchQuote" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error fetching quote:", chrome.runtime.lastError);
                return;
            }
            quoteText.textContent = `"${response.quote}"`;
            quoteAuthor.textContent = `- ${response.author}`;
        });
    }

    fetchQuoteButton.addEventListener("click", updateQuote);
    updateQuote(); // Load quote on popup open
});


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear-all-btn").addEventListener("click", () => clearTasks());
    document.getElementById("clear-urgent-important").addEventListener("click", () => clearTasks("urgent-important"));
    document.getElementById("clear-not-urgent-important").addEventListener("click", () => clearTasks("not-urgent-important"));
    document.getElementById("clear-urgent-not-important").addEventListener("click", () => clearTasks("urgent-not-important"));
    document.getElementById("clear-not-urgent-not-important").addEventListener("click", () => clearTasks("not-urgent-not-important"));
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("quote-tab").addEventListener("click", () => openTab("Quote"));
    document.getElementById("eisenhower-tab").addEventListener("click", () => openTab("Eisenhower"));

    openTab("Quote");
    fetchQuote();
    updateTopTasks();
    renderTasks();

    const taskForm = document.getElementById("task-form");
    if (taskForm) {
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const taskText = document.getElementById("task-text").value;
            const quadrant = document.getElementById("task-quadrant").value;
            if (taskText && quadrant) {
                addTask(taskText, quadrant);
                taskForm.reset();
            }
        });
    }

    document.querySelectorAll(".clear-quadrant").forEach(button => {
        button.addEventListener("click", (e) => {
            const quadrant = e.target.dataset.quadrant;
            chrome.runtime.sendMessage({ action: "clearTasks", quadrant }, () => {
                renderTasks();
                updateTopTasks();
            });
        });
    });

    document.getElementById("clear-all-tasks").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "clearTasks" }, () => {
            renderTasks();
            updateTopTasks();
        });
    });
});

chrome.runtime.sendMessage({ action: "fetchQuote" }, (response) => {
    if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
    }
    if (response && response.quote) {
        document.getElementById("quote").textContent = response.quote;
        document.getElementById("author").textContent = `– ${response.author}`;
    } else {
        console.error("Failed to get quote from background script.");
    }
});
