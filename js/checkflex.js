$(document).ready(function(){
	// Store feedback buttons for popup interaction
	window.flexerCourses = [];
	
	if(location.href.indexOf("CourseFeedback") >= 0 || location.href.indexOf("Student.html") >= 0 ){
		// Collect all courses with pending feedback
		$("button[name=GiveFeedback]").each(function(index){
			const button = $(this);
			// Try to find course name from the row/card containing this button
			const row = button.closest('tr, .card, .m-portlet');
			let courseName = row.find('td:first, .card-title, .m-portlet__head-text').first().text().trim();
			if (!courseName) {
				courseName = "Course " + (index + 1);
			}
			window.flexerCourses.push({
				name: courseName,
				button: this
			});
		});
		
		// Legacy auto-fill behavior (if user previously opted in)
		if($("button[name=GiveFeedback]").length){
			if(localStorage.getItem('autoFlex')==null){
				swal("Would You Like To Use Flexer - FeedBack Submitter ?", {
				  buttons: {
					yes: {
					  text: "Yes (Use Popup)",
					  value: "yes",
					},
					cancel: " No I'll fill manually! ",
				  },
				})
				.then((value) => {
				  switch (value) {
					case "yes":
					  localStorage.setItem('autoFlex',true);
					  swal("Great! Click the Flexer extension icon to select courses.");
					  break;
					default:
					  localStorage.setItem('autoFlex',false);
					  break;
				  }
				});
			}
		}
	}
	
	if(location.href.indexOf("FeedBackQuestions") >= 0 || location.href.indexOf("Student1") >= 0 ){
		// Check if we have a preset rating from popup
		const presetRating = localStorage.getItem('flexerPresetRating');
		
		if(presetRating) {
			// Use preset rating and auto-submit
			applyRating(presetRating);
			localStorage.removeItem('flexerPresetRating');
			$('label:contains("Yes")').find('input').prop("checked",true);
			setTimeout(function() {
				$('#submit').click();
			}, 500);
		} else if(localStorage.getItem('autoFlex')!=null && localStorage.getItem('autoFlex')=='true'){
			var title = $(".m-portlet__head-text").html().trim();
			swal("What Rating Would You Give To "+title+" ?", {
			  buttons: {
				5: { text: "5 Star", value: "5" },
				4: { text: "4 Star", value: "4" },
				3: { text: "3 Star", value: "3" },
				2: { text: "2 Star", value: "2" },
				1: { text: "1 Star", value: "1" },
				cancel: " Let me choose rating manually ! ",
			  },
			})
			.then((value) => {
			  if (value) {
				applyRating(value);
				$('label:contains("Yes")').find('input').prop("checked",true);
				$('#submit').click();
			  }
			});
		}
	}
	
	function applyRating(value) {
		switch (value) {
			case "5":
				$('label:contains("Strongly Agree")').find('input').prop("checked",true);
				break;
			case "4":
				$('label:contains("Agree")').find('input').prop("checked",true);
				break;
			case "3":
				$('label:contains("Uncertain")').find('input').prop("checked",true);
				break;
			case "2":
				$('label:contains("Dissatisfied")').find('input').prop("checked",true);
				break;
			case "1":
				$('label:contains("Strongly Disagree")').find('input').prop("checked",true);
				break;
		}
	}
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "getCourses") {
		const courses = [];
		$("button[name=GiveFeedback]").each(function(index){
			const button = $(this);
			const row = button.closest('tr, .card, .m-portlet, div').first();
			let courseName = row.find('td:first, .card-title, h5, span').first().text().trim();
			if (!courseName || courseName.length > 100) {
				courseName = "Course " + (index + 1);
			}
			courses.push({ name: courseName, index: index });
		});
		sendResponse({ courses: courses });
	}
	
	if (request.action === "fillCourses") {
		try {
			// Store the rating for when feedback page opens
			localStorage.setItem('flexerPresetRating', request.rating);
			
			// Click only the selected course buttons
			const buttons = $("button[name=GiveFeedback]");
			request.indices.forEach(function(index) {
				if (buttons[index]) {
					buttons[index].click();
				}
			});
			
			sendResponse({ success: true });
		} catch (e) {
			sendResponse({ success: false, error: e.message });
		}
	}
	
	return true; // Keep message channel open for async response
});