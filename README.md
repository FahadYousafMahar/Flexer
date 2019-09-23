# Flexer
One-Click Submission of FLEX Feedback for FAST-NUCES ( National University of Computer and Emerging Sciences )

### Usage
1) Open Flex Feedback Page where Radio buttons are located.
2) Open Developer's Console (Ctrl+Shift+I) and paste following code:

```
$('label:contains("Strongly Agree")').find('input').prop("checked",true);
$('label:contains("Yes")').find('input').prop("checked",true);
$('#submit').click();
```

### To-Do
Turn it into Extension.

Add options for All Ratings.

Add Single-click option for submitting all feedbacks from any URL of Flex.
