
// GENERAL
    // DROPDOWN - btnConfigPost
      function dropdownBtnConfigPost() {
        document.querySelector(".dropdownBtnConfigPost .dropdown-content").classList.toggle("showBtnConfigPost");

      }

      // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtnConfigPost')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('showBtnConfigPost')) {
              openDropdown.classList.remove('showBtnConfigPost');
            }
          }
        }
      }
