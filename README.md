# Flexer
Google Chrome Extension which allows One-Click Submission of FLEX Feedback for FAST-NUCES ( National University of Computer and Emerging Sciences )

### Usage
Open Developer's Console (Ctrl+Shift+I) and paste following code:

```
$('label:contains("Strongly Agree")').find('input').prop("checked",true);
$('label:contains("Yes")').find('input').prop("checked",true);
$('#submit').click();
```
