let heading = "";
let prompt = "";
let jobSuggestionsDisplayContainer = document.getElementById("jobSuggestionsDisplayContainer");

// RapidAPI information for the new Jobs API
const RAPIDAPI_HOST = "jobs-api14.p.rapidapi.com";
const RAPIDAPI_KEY = "a60f66cb28msh4b849fd8e1cee7cp1d897ajsnac493ef04c31";

// Function to fetch job suggestions from the new Jobs API
async function fetchJobSuggestions(title, location) {
    const url = `https://${RAPIDAPI_HOST}/v2/list?query=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&autoTranslateLocation=false&remoteOnly=false&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor`;

    console.log("Fetching jobs from URL:", url); // Log the URL for debugging

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': RAPIDAPI_HOST,
            'x-rapidapi-key': RAPIDAPI_KEY
        }
    });

    // Log the response status and the raw response body
    console.log("Response status:", response.status); // Log status
    const responseBody = await response.json();
    console.log("Response body:", responseBody); // Log the response body

    if (!response.ok) {
        throw new Error('Failed to fetch job suggestions');
    }

    return responseBody.data || [];
}

// Function to render job suggestions in the display container
function renderJobSuggestions(jobs) {
    if (jobs.length === 0) {
        jobSuggestionsDisplayContainer.innerHTML = `<p>No job suggestions found.</p>`;
        return;
    }

    let jobListHtml = jobs.map(job => {
        return `
            <div class="job-item">
                <h3><a href="${job.job_link}" target="_blank">${job.title}</a></h3>
                <p><strong>Company:</strong> ${job.company_name}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Description:</strong> ${job.description || 'No description available.'}</p>
            </div>
        `;
    }).join("");

    jobSuggestionsDisplayContainer.innerHTML = `<h1 class="text-2xl font-bold text-blue-600">${heading}</h1><br>${jobListHtml}`;
}

// Main Search function to fetch and display job suggestions
async function Search(prompt, heading) {
    const skills_dsp = document.querySelectorAll(".skills-items .preview-item .preview-item-val");
    let title = "Web Developer";  // Default job title
    let location = "United States"; // Default location

    skills_dsp.forEach(element => {
        prompt += element.innerHTML + " ";
    });

    prompt += "jobs suggestions with reference links";

    // Call the fetchJobSuggestions function
    try {
        const jobs = await fetchJobSuggestions(title, location);
        renderJobSuggestions(jobs);
    } catch (error) {
        console.error("Error fetching job suggestions:", error);
        jobSuggestionsDisplayContainer.innerHTML = `<p>Error fetching job suggestions. Please try again later.</p>`;
    }
}

// Event listener for Job Suggestion button
document.getElementById("jobSuggestionButton").addEventListener("click", () => {
    let skills_dsp = document.querySelectorAll(".skills-items .preview-item .preview-item-val");
    heading = "Job Suggestions :-";
    prompt = "";

    skills_dsp.forEach(element => {
        prompt += element.innerHTML + " ";
    });

    prompt += "jobs suggestions with reference links";

    Search(prompt, heading);
    console.log(prompt);
});

// Event listener for Roadmap Suggestion button
document.getElementById("roadmapSuggestionButton").addEventListener("click", () => {
    let skills_dsp = document.querySelectorAll(".skills-items .preview-item .preview-item-val");
    heading = "RoadMap with how you can enhance your skills :-";
    prompt = "";

    skills_dsp.forEach(element => {
        prompt += element.innerHTML + " ";
    });

    prompt += "Advanced roadmap with these skills";

    Search(prompt, heading);
    console.log(prompt);
});
