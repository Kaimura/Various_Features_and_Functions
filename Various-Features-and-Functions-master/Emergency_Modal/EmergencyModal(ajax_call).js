window.addEventListener('load', function () {
//iplugin should only be activated when in need or every single ikea page is doing extensive json fetching to check if its url is tagged.

    var modal_Attributes = modaldata_JSON();
    var url = document.location.href.toLowerCase();

    for(var url_object in modal_Attributes) {
        if(url.indexOf(url_object.toLowerCase()) >= 0) {
            if(modal_Attributes[url_object].On == true) {
                if(dateNotExceeded(modal_Attributes[url_object].Startdate, modal_Attributes[url_object].Enddate) == true) {
                    createModal(url_object);
                    break;
                }
            }
        }
    }

    function createModal(nth_url) { //remove second parameter (,modal_Attributes) if using modaldata_JSON()

        //modal section
        var modalWindow = document.createElement("div"); //whole window
        modalWindow.setAttribute("id", "emergencyModal");

        var modalContent = document.createElement("div"); //div in middle of window
        modalContent.setAttribute("id", "modalContentBox");
                
        var modalClose = document.createElement("span"); //close icon
        modalClose.setAttribute("id", "emergencyClose");
        modalClose.innerText = 'X';

        var modalHeadline = document.createElement("h1");
        modalHeadline.setAttribute("id", "emergencyHeadline");
        modalHeadline.innerText = modal_Attributes[nth_url].Headline;

        var modalSubline = document.createElement("p");
        modalSubline.setAttribute("id", "emergencySubline");
        modalSubline.innerText = modal_Attributes[nth_url].Subline;

        var modalText = document.createElement("p");
        modalText.setAttribute("id", "emergencyText");
        modalText.innerText = modal_Attributes[nth_url].Text;

        var modalButton = document.createElement("button");
        modalButton.setAttribute("id", "emergencyButton");
        modalButton.innerText = modal_Attributes[nth_url].Button_Text;

        modalButton.onclick = function() {
            location.href = modal_Attributes[nth_url].Button_Link;
        };
        modalContent.appendChild(modalClose);
        modalContent.appendChild(modalHeadline);
        modalContent.appendChild(modalSubline);
        modalContent.appendChild(modalText);
        modalContent.appendChild(modalButton);
        modalWindow.appendChild(modalContent);

        modalClose.onmouseover = function () { modalClose.style.color = "grey"; };
        modalClose.onmouseout = function () { modalClose.style.color = "black"; };
        modalClose.onclick = function() {
            modalWindow.style.display = "none";
        };
        document.getElementById("allContent").appendChild(modalWindow);
    }

    function modaldata_JSON() {
        var xmlhttp = new XMLHttpRequest();
        var json_obj;
        var js_obj;
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json_obj = xmlhttp.responseText;
                js_obj = JSON.parse(json_obj);
            }
        };
        xmlhttp.open("GET", "https://ww8.%MYCOMPANY%.com/ext/iplugins/de_DE/data/emergency-modal/data.json", false);
        xmlhttp.send();
        return js_obj.Emergency_modal;
    }

    function dateNotExceeded(startDate, endDate) {
        let startDateArray = startDate.split("-");
        let endDateArray = endDate.split("-");

        startDate = new Date(startDateArray[0], startDateArray[1], startDateArray[2], startDateArray[3], startDateArray[4], startDateArray[5]); //YYYY,MM,DD,HH,MM,SS
        endDate = new Date(endDateArray[0], endDateArray[1], endDateArray[2], endDateArray[3], endDateArray[4], endDateArray[5]);
        let today = new Date();

        return (today >= startDate && today <= endDate);
    }

});

    /* NEW MORE EFFICIENT AND CLEAN SOLUTION THAT CAN'T BE USED AS LONG AS IE11 users are around...*/
/*    
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }

      function parseJson(response) {
        return response.json();
      }

      fetch('https://ww8.%MYCOMPANY%.com/ext/iplugins/de_DE/data/emergency-modal/data.json')
        .then(checkStatus)
        .then(parseJson)
        .then(function(data) {
            for(var url_object in data.Emergency_modal) {
                if(url.indexOf(url_object) >= 0) {
                    if(data.Emergency_modal[url_object].On == true) {
                        if(dateNotExceeded(data.Emergency_modal[url_object].Startdate, data.Emergency_modal[url_object].Enddate) == true) {
                            createModal(url_object, data.Emergency_modal);
                        }
                    }
                }
            }
        }).catch(function(error) {
          console.log('Request failed', error);
        });

    function dateNotExceeded(startDate, endDate) { //dates should be Strings in descending order (YYYY-MM-DD-HH-MM-SS)
        startDate = new Date(...startDate.split(/\D/g));
        endDate = new Date(...endDate.split(/\D/g));
        let today = new Date();
        return (today >= startDate && today <= endDate);
    }
*/
