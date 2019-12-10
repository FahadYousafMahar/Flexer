$(document).ready(function(){	
	if(location.href.indexOf("CourseFeedback") >= 0 || location.href.indexOf("Student.html") >= 0 ){
	   if($("button[name=GiveFeedback]").length){
		if(localStorage.getItem('autoFlex')==null){
			swal("Would You Like To Use Flexer - FeedBack Submitter ?", {
			  buttons: {
				yes: {
				  text: "Yes",
				  value: "yes",
				},
				cancel: " No I'll fill manually! ",
			  },
			})
			.then((value) => {
			  
			  switch (value) {
				case "yes":
				  localStorage.setItem('autoFlex',true);
				  break;
				default:
				  localStorage.setItem('autoFlex',false);
				  break;
			  }
			});
		}
		if(localStorage.getItem('autoFlex')!=null && localStorage.getItem('autoFlex')=='true'){
			$("button[name=GiveFeedback]").each(function(e){
				this.click();
			})
		}
	  }
	}
	if(location.href.indexOf("FeedBackQuestions") >= 0 || location.href.indexOf("Student1") >= 0 ){
		if(localStorage.getItem('autoFlex')!=null && localStorage.getItem('autoFlex')=='true'){
			var title = $(".m-portlet__head-text").html().trim();
			swal("What Rating Would You Give To "+title+" ?", {
			  buttons: {
				5: {
				  text: "5 Star",
				  value: "5",
				},
				4: {
				  text: "4 Star",
				  value: "4",
				},
				3: {
				  text: "3 Star",
				  value: "3",
				},
				2: {
				  text: "2 Star",
				  value: "2",
				},
				1: {
				  text: "1 Star",
				  value: "1",
				},
				cancel: " Let me choose rating manually ! ",
			  },
			})
			.then((value) => {
			  
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
				default:
				  break;
			  }
			  if (value!=null){
				 $('label:contains("Yes")').find('input').prop("checked",true);
				 $('#submit').click();
			  }
			});
		}
	}	
});