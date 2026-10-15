function externalLinks() { for(var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) { var b = c[a]; b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank") } } ; externalLinks(); 

// Toggle help
$(".btn-help").click(function() {
    $(".help").toggle("fast", function() {
        // Animation complete.
    });
});

// Popup functionality for course selection
$(document).ready(function() {
    const courseList = $("#courseList");
    const courseSection = $("#course-section");
    const statusSection = $("#status-section");
    const fillButton = $("#fillSelected");
    const selectAllBtn = $("#selectAll");
    
    statusSection.text("Loading courses...");
    
    // Get active tab and request course list
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const tab = tabs[0];
        if (!tab) {
            statusSection.text("No active tab found.");
            return;
        }
        
        chrome.tabs.sendMessage(tab.id, {action: "getCourses"}, function(response) {
            if (chrome.runtime.lastError) {
                statusSection.text("Open FLEX Course Feedback page and refresh, then try again.");
                console.log("Error:", chrome.runtime.lastError.message);
                return;
            }
            
            if (response && response.courses && response.courses.length > 0) {
                    courseSection.show();
                    statusSection.text("");
                    
                    response.courses.forEach(function(course, index) {
                        const item = $(`
                            <div class="course-item">
                                <input type="checkbox" id="course-${index}" data-index="${index}">
                                <label for="course-${index}">${course.name}</label>
                            </div>
                        `);
                        courseList.append(item);
                    });
                    
                    // Enable button when courses selected
                    courseList.on("change", "input[type=checkbox]", function() {
                        const checked = courseList.find("input:checked").length;
                        fillButton.prop("disabled", checked === 0);
                        fillButton.text(checked > 0 ? `Fill ${checked} Course(s)` : "Fill Selected Courses");
                    });
                    
                } else {
                    statusSection.text("No pending feedback found. Make sure you're on the FLEX Course Feedback page.");
                }
            });
    });
    
    // Select All toggle
    selectAllBtn.click(function() {
        const checkboxes = courseList.find("input[type=checkbox]");
        const allChecked = checkboxes.filter(":checked").length === checkboxes.length;
        checkboxes.prop("checked", !allChecked);
        selectAllBtn.text(allChecked ? "Select All" : "Deselect All");
        checkboxes.first().trigger("change");
    });
    
    // Fill selected courses
    fillButton.click(function() {
        const selectedIndices = [];
        courseList.find("input:checked").each(function() {
            selectedIndices.push(parseInt($(this).data("index")));
        });
        
        const rating = $("#ratingSelect").val();
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "fillCourses",
                indices: selectedIndices,
                rating: rating
            }, function(response) {
                if (response && response.success) {
                    statusSection.text("Filling feedback... Check the page.");
                    setTimeout(function() { window.close(); }, 1000);
                } else {
                    statusSection.text("Error: " + (response ? response.error : "Unknown error"));
                }
            });
        });
    });
});
