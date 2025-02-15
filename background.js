async function fetchRandomQuote() {
    try {
        console.log("Fetching quote...");
        
        // Using a CORS Proxy
        const response = await fetch("http://localhost:8080/https://zenquotes.io/api/random");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const parsedData = JSON.parse(data.contents); // Extract actual JSON
        
        return { quote: parsedData[0].q, author: parsedData[0].a };
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        return {
            quote: "The only limit to our realization of tomorrow is our doubts of today.",
            author: "Franklin D. Roosevelt",
        };
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchQuote") {
        fetchRandomQuote().then((quote) => {
            sendResponse(quote);
        });
        return true; // Required for async response
    }
});



// Initialize tasks in storage if not already present
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get("tasks", (data) => {
        if (!data.tasks) {
            chrome.storage.local.set(
                {
                    tasks: {
                        "urgent-important": [],
                        "not-urgent-important": [],
                        "urgent-not-important": [],
                        "not-urgent-not-important": [],
                    },
                },
                () => console.log("Initialized task storage.")
            );
        }
    });
});

// Function to clear tasks
function clearTasks(quadrant) {
    chrome.storage.local.get("tasks", (data) => {
        const tasks = data.tasks || {
            "urgent-important": [],
            "not-urgent-important": [],
            "urgent-not-important": [],
            "not-urgent-not-important": [],
        };

        if (quadrant) {
            tasks[quadrant] = [];
        } else {
            for (let key in tasks) {
                tasks[key] = [];
            }
        }

        chrome.storage.local.set({ tasks }, () => console.log("Tasks cleared successfully."));
    });
}

